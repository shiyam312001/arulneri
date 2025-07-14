const mysql = require('mysql2/promise');

async function setupTables() {
  let connection;
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
         host: process.env.DB_HOST || 'mysql-327eb5fc-shiyam-69d6.e.aivencloud.com',
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'AVNS_ASlanWgqbkNXB5oAqDe',
  database: process.env.DB_NAME || 'defaultdb',
    });

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

    console.log('Creating program_images table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS program_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        program_id INT NOT NULL,
        image_path VARCHAR(255) NOT NULL,
        is_primary BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
      )
    `);
    console.log('✅ Program images table created');

    // Create uploads directory if it doesn't exist
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

setupTables(); 