const mysql = require('mysql2/promise');

async function setupProgramTables() {
  let connection;
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
  user: process.env.DB_USER || 'sql12786903',
  password: process.env.DB_PASSWORD || 'hZRw3Z3l7Q',
  database: process.env.DB_NAME || 'sql12786903',
    });

    // Create programs table
    console.log('Creating programs table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS programs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        location VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Programs table created');

    // Create program_images table
    console.log('Creating program_images table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS program_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        program_id INT NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        image_order INT DEFAULT 0,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Program images table created');

    // Create uploads directory
    const fs = require('fs');
    const path = require('path');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('✅ Uploads directory created');
    }

  } catch (error) {
    console.error('Error setting up tables:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit();
  }
}

setupProgramTables(); 