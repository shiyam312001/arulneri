import bcrypt from 'bcryptjs';
import db from '../lib/db';

async function testAuth() {
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
      console.log('❌ Admins table does not exist!');
    } else {
      console.log('✅ Admins table exists');
    }

    // Check admin user
    console.log('\nChecking admin user...');
    const [admins] = await db.execute('SELECT * FROM admins WHERE username = ?', ['admin']);
    if (admins.length === 0) {
      console.log('❌ Admin user not found!');
    } else {
      const admin = admins[0];
      console.log('✅ Admin user found:', {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      });

      // Test password
      console.log('\nTesting password...');
      const testPassword = 'admin123';
      const isValid = await bcrypt.compare(testPassword, admin.password);
      console.log(isValid ? '✅ Password is valid' : '❌ Password is invalid');
    }

    // Check environment variables
    console.log('\nChecking environment variables...');
    const requiredVars = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
      console.log('❌ Missing environment variables:', missingVars);
    } else {
      console.log('✅ All required environment variables are set');
    }

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    process.exit();
  }
}

testAuth(); 