import bcrypt from 'bcryptjs';
import db from '../app/lib/db';

async function verifyAdmin() {
  try {
    // Test database connection
    console.log('Testing database connection...');
    const connection = await db.getConnection();
    console.log('Database connection successful');
    connection.release();

    // Check if admins table exists
    console.log('\nChecking admins table...');
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
      console.log('✅ Admins table created');
    } else {
      console.log('✅ Admins table exists');
    }

    // Check if admin user exists
    console.log('\nChecking admin user...');
    const [admins] = await db.execute('SELECT * FROM admins WHERE username = ?', ['admin']);
    
    if (admins.length === 0) {
      console.log('Creating admin user...');
      const password = 'Admin123!';
      const hashedPassword = await bcrypt.hash(password, 12);
      
      await db.execute(
        'INSERT INTO admins (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@example.com', hashedPassword, 'super_admin']
      );
      console.log('✅ Admin user created');
      console.log('Username: admin');
      console.log('Password:', password);
    } else {
      console.log('✅ Admin user exists');
      const admin = admins[0];
      console.log('Admin details:', {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      });

      // Update password to ensure it's correct
      console.log('\nUpdating admin password...');
      const password = 'Admin123!';
      const hashedPassword = await bcrypt.hash(password, 12);
      
      await db.execute(
        'UPDATE admins SET password = ?, failed_attempts = 0, locked_until = NULL WHERE id = ?',
        [hashedPassword, admin.id]
      );
      console.log('✅ Admin password updated');
      console.log('Username: admin');
      console.log('Password:', password);
    }

  } catch (error) {
    console.error('Verification failed:', error);
  } finally {
    process.exit();
  }
}

verifyAdmin(); 