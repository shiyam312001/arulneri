import db from '../lib/db';

async function setupPrograms() {
  try {
    // Test database connection
    console.log('Testing database connection...');
    const connection = await db.getConnection();
    console.log('Database connection successful');
    connection.release();

    // Create programs table
    console.log('\nCreating programs table...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS programs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create program_images table for multiple images
    console.log('\nCreating program_images table...');
    await db.execute(`
      CREATE TABLE IF NOT EXISTS program_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        program_id INT NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Database tables created successfully');

  } catch (error) {
    console.error('Setup failed:', error);
  } finally {
    process.exit();
  }
}

setupPrograms(); 