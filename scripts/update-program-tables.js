const mysql = require('mysql2/promise');

async function updateTables() {
  let connection;
  try {
    console.log('Connecting to database...');
    connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'mysql-327eb5fc-shiyam-69d6.e.aivencloud.com',
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'AVNS_ASlanWgqbkNXB5oAqDe',
  database: process.env.DB_NAME || 'defaultdb',
    });

    console.log('✅ Database connection successful');

    // Add image_order column if it doesn't exist
    console.log('\nChecking program_images table structure...');
    const [columns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM information_schema.columns 
      WHERE table_schema = ? 
      AND table_name = 'program_images' 
      AND column_name = 'image_order'
    `, [process.env.DB_NAME || 'arulner']);

    if (columns.length === 0) {
      console.log('Adding image_order column...');
      await connection.query(`
        ALTER TABLE program_images 
        ADD COLUMN image_order INT DEFAULT 0 AFTER image_path
      `);
      console.log('✅ Added image_order column');
    } else {
      console.log('✅ image_order column already exists');
    }

    // Update existing records to set image_order based on id
    console.log('\nUpdating existing records...');
    await connection.query(`
      UPDATE program_images 
      SET image_order = id 
      WHERE image_order = 0
    `);
    console.log('✅ Updated existing records');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit();
  }
}

updateTables(); 