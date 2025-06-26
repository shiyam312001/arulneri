const { NextResponse } = require('next/server');
const { verifyJWT } = require('@/lib/auth');
const pool = require('@/lib/db');
const { writeFile } = require('fs/promises');
const { join } = require('path');
const { cookies } = require('next/headers');

// GET /api/admin/programs
export async function GET() {
  try {
    console.log('Starting GET /api/admin/programs request...');
    
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      console.log('No token found in cookies');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Verifying JWT token...');
    const decoded = verifyJWT(token);
    if (!decoded) {
      console.log('Invalid token');
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    console.log('Token verified, fetching programs from database...');
    
    // Get programs with a limit of 8
    const [programs] = await pool.query(`
      SELECT * FROM programs 
      ORDER BY created_at DESC
      LIMIT 8
    `);
    console.log('Programs fetched successfully:', programs.length);

    // Get images only for the fetched programs
    const programIds = programs.map(p => p.id);
    const [images] = await pool.query(`
      SELECT * FROM program_images 
      WHERE program_id IN (?)
      ORDER BY program_id, COALESCE(image_order, id)
    `, [programIds.length ? programIds : [0]]);

    // Combine programs with their images
    const formattedPrograms = programs.map(program => ({
      ...program,
      images: images.filter(img => img.program_id === program.id)
    }));

    console.log('Sending response with formatted programs');
    return NextResponse.json({ programs: formattedPrograms });
  } catch (error) {
    console.error('Error in GET /api/admin/programs:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error', 
      details: error.message,
      programs: [] 
    }, { status: 500 });
  }
}

// POST /api/admin/programs
export async function POST(request) {
  let connection;
  try {
    console.log('Starting program creation...');
    
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      console.log('No token found in cookies');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
      console.log('Invalid token');
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    console.log('Token verified, processing form data...');
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const location = formData.get('location');
    const images = formData.getAll('images');
    const primaryImageIndex = parseInt(formData.get('primaryImageIndex') || '0');

    console.log('Form data received:', { 
      title, 
      description, 
      location, 
      imageCount: images.length,
      primaryImageIndex
    });

    // Start a transaction
    connection = await pool.getConnection();
    console.log('Database connection established');
    
    await connection.beginTransaction();
    console.log('Transaction started');

    try {
      // Insert program
      console.log('Inserting program into database...');
      const [result] = await connection.query(
        'INSERT INTO programs (title, description, location) VALUES (?, ?, ?)',
        [title, description, location]
      );
      const programId = result.insertId;
      console.log('Program inserted with ID:', programId);

      // Handle image uploads
      if (images.length > 0) {
        console.log('Processing images...');
        const uploadPromises = images.map(async (image, index) => {
          try {
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // Create unique filename
            const filename = `${Date.now()}-${image.name}`;
            const path = join(process.cwd(), 'public', 'uploads', filename);
            
            console.log('Saving image:', { filename, path });
            // Save file
            await writeFile(path, buffer);
            
            // Insert image record
            console.log('Inserting image record into database...');
            await connection.query(
              'INSERT INTO program_images (program_id, image_path, is_primary) VALUES (?, ?, ?)',
              [programId, `/uploads/${filename}`, index === primaryImageIndex]
            );
            console.log('Image record inserted successfully');
          } catch (error) {
            console.error('Error processing image:', error);
            throw error;
          }
        });

        await Promise.all(uploadPromises);
        console.log('All images processed successfully');
      }

      await connection.commit();
      console.log('Transaction committed successfully');
      return NextResponse.json({ message: 'Program created successfully', id: programId });
    } catch (error) {
      console.error('Error during transaction:', error);
      await connection.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error.message 
    }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
      console.log('Database connection released');
    }
  }
} 