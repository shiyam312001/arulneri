import bcrypt from 'bcryptjs';
import db from '../lib/db';

async function setupAdmin() {
  try {
    // Test database connection
    const connection = await db.getConnection();
    console.log('Database connection successful');
    connection.release();

    // Check if admins table exists
    const [tables] = await db.execute('SHOW TABLES LIKE "admins"');
    if (tables.length === 0) {
      console.log('Creating admins table...');
      await db.execute(`
        CREATE TABLE admins (
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
    }

    // Check if admin user exists
    const [admins] = await db.execute('SELECT * FROM admins WHERE username = ?', ['admin']);
    
    if (admins.length === 0) {
      console.log('Creating admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await db.execute(
        'INSERT INTO admins (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@example.com', hashedPassword, 'super_admin']
      );
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Verify admin user
    const [admin] = await db.execute('SELECT * FROM admins WHERE username = ?', ['admin']);
    console.log('Admin user details:', {
      id: admin[0].id,
      username: admin[0].username,
      email: admin[0].email,
      role: admin[0].role
    });

  } catch (error) {
    console.error('Setup failed:', error);
  } finally {
    process.exit();
  }
}

setupAdmin(); 