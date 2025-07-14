const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function fixAdmin() {
  let connection;
  try {
    // Create connection with the same configuration as the app
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'mysql-327eb5fc-shiyam-69d6.e.aivencloud.com',
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'AVNS_ASlanWgqbkNXB5oAqDe',
  database: process.env.DB_NAME || 'defaultdb',
    });

    console.log('Connected to MySQL server');

    // Create admins table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'super_admin') DEFAULT 'admin',
        failed_attempts INT DEFAULT 0,
        locked_until DATETIME DEFAULT NULL,
        last_login DATETIME DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Admins table created or already exists');

    // Check if admin user exists
    const [admins] = await connection.query('SELECT * FROM admins WHERE username = ?', ['admin']);
    
    const password = 'Admin123!';
    const hashedPassword = await bcrypt.hash(password, 12);

    if (admins.length === 0) {
      // Create admin user
      await connection.query(
        'INSERT INTO admins (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@example.com', hashedPassword, 'super_admin']
      );
      console.log('✅ Admin user created');
    } else {
      // Update admin password
      await connection.query(
        'UPDATE admins SET password = ?, failed_attempts = 0, locked_until = NULL WHERE username = ?',
        [hashedPassword, 'admin']
      );
      console.log('✅ Admin password updated');
    }

    // Verify the admin user
    const [verifyAdmin] = await connection.query('SELECT * FROM admins WHERE username = ?', ['admin']);
    console.log('Admin user details:', {
      id: verifyAdmin[0].id,
      username: verifyAdmin[0].username,
      email: verifyAdmin[0].email,
      role: verifyAdmin[0].role
    });

    // Test password hash
    const testPassword = 'Admin123!';
    const isValid = await bcrypt.compare(testPassword, verifyAdmin[0].password);
    console.log('Password verification test:', isValid ? '✅ Success' : '❌ Failed');

    console.log('\nLogin credentials:');
    console.log('Username: admin');
    console.log('Password: Admin123!');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
    process.exit();
  }
}

fixAdmin(); 