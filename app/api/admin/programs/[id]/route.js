const { NextResponse } = require('next/server');
const { verifyJWT } = require('@/lib/auth');
const pool = require('@/lib/db');
const { writeFile, unlink } = require('fs/promises');
const { join } = require('path');
const { cookies } = require('next/headers');

// GET /api/admin/programs/[id]
export async function GET(request, { params }) {
  let connection;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { id } = params;
    connection = await pool.getConnection();

    try {
      // Get program details
      const [programs] = await connection.query(
        'SELECT * FROM programs WHERE id = ?',
        [id]
      );

      if (programs.length === 0) {
        return NextResponse.json({ error: 'Program not found' }, { status: 404 });
      }

      const program = programs[0];

      // Get all images for the program
      const [images] = await connection.query(
        'SELECT * FROM program_images WHERE program_id = ? ORDER BY image_order, id',
        [id]
      );

      // Get primary image
      const [primaryImage] = await connection.query(
        `SELECT pi.*
        FROM program_images pi
        INNER JOIN (
            SELECT program_id, MIN(id) AS min_id
            FROM program_images
            WHERE is_primary = 1
            GROUP BY program_id
        ) grouped_pi ON pi.id = grouped_pi.min_id
        WHERE pi.program_id = ?`,
        [id]
      );

      // Combine program with its images and primary image
      const programWithImages = {
        ...program,
        images,
        primaryImage: primaryImage[0] || null
      };

      return NextResponse.json({ program: programWithImages });
    } catch (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error fetching program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// PUT /api/admin/programs/[id]
export async function PUT(request, { params }) {
  let connection;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { id } = params;
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const location = formData.get('location');
    const images = formData.getAll('images');
    const primaryImageIndex = parseInt(formData.get('primaryImageIndex') || '0');
    const existingImages = JSON.parse(formData.get('existingImages') || '[]');

    connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Update program details
      await connection.query(
        'UPDATE programs SET title = ?, description = ?, location = ? WHERE id = ?',
        [title, description, location, id]
      );

      // Get current images from database
      const [currentImages] = await connection.query(
        'SELECT id, image_path FROM program_images WHERE program_id = ?',
        [id]
      );

      // Find images to delete (images that exist in database but not in existingImages)
      const imagesToDelete = currentImages.filter(
        currentImage => !existingImages.some(
          existingImage => existingImage.id === currentImage.id
        )
      );

      // Delete removed images from database and filesystem
      for (const imageToDelete of imagesToDelete) {
        // Delete from database
        await connection.query(
          'DELETE FROM program_images WHERE id = ?',
          [imageToDelete.id]
        );

        // Delete file from filesystem
        const imagePath = join(process.cwd(), 'public', imageToDelete.image_path);
        try {
          await unlink(imagePath);
        } catch (error) {
          console.error('Error deleting image file:', error);
        }
      }

      // Update remaining images
      if (existingImages.length > 0) {
        // Update primary image status
        await connection.query(
          'UPDATE program_images SET is_primary = FALSE WHERE program_id = ?',
          [id]
        );

        // Update image order and primary status
        for (let i = 0; i < existingImages.length; i++) {
          await connection.query(
            'UPDATE program_images SET image_order = ?, is_primary = ? WHERE id = ?',
            [i, i === primaryImageIndex, existingImages[i].id]
          );
        }
      }

      // Handle new images
      if (images.length > 0) {
        const startOrder = existingImages.length;
        const uploadPromises = images.map(async (image, index) => {
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          
          const filename = `${Date.now()}-${image.name}`;
          const path = join(process.cwd(), 'public', 'uploads', filename);
          
          await writeFile(path, buffer);
          
          await connection.query(
            'INSERT INTO program_images (program_id, image_path, image_order, is_primary) VALUES (?, ?, ?, ?)',
            [id, `/uploads/${filename}`, startOrder + index, startOrder + index === primaryImageIndex]
          );
        });

        await Promise.all(uploadPromises);
      }

      await connection.commit();
      return NextResponse.json({ message: 'Program updated successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// DELETE /api/admin/programs/[id]
export async function DELETE(request, { params }) {
  let connection;
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { id } = params;
    connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Get program images before deletion
      const [images] = await connection.query(
        'SELECT image_path FROM program_images WHERE program_id = ?',
        [id]
      );

      // Delete program (this will cascade delete images due to foreign key)
      await connection.query('DELETE FROM programs WHERE id = ?', [id]);

      // Delete image files
      for (const image of images) {
        const imagePath = join(process.cwd(), 'public', image.image_path);
        try {
          await unlink(imagePath);
        } catch (error) {
          console.error('Error deleting image file:', error);
        }
      }

      await connection.commit();
      return NextResponse.json({ message: 'Program deleted successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
} 