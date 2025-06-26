import bcrypt from 'bcryptjs';
import db from '../lib/db';

async function updatePassword() {
  try {
    // Test database connection
    console.log('Testing database connection...');
    const connection = await db.getConnection();
    console.log('Database connection successful');
    connection.release();

    // Get admin user
    console.log('\nGetting admin user...');
    const [admins] = await db.execute('SELECT * FROM admins WHERE username = ?', ['admin']);
    
    if (admins.length === 0) {
      console.log('❌ Admin user not found!');
      return;
    }

    const admin = admins[0];
    console.log('Found admin:', {
      id: admin.id,
      username: admin.username,
      email: admin.email
    });

    // Generate new password hash
    const newPassword = 'Admin123!'; // Using the password you provided
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password
    console.log('\nUpdating password...');
    await db.execute(
      'UPDATE admins SET password = ? WHERE id = ?',
      [hashedPassword, admin.id]
    );

    console.log('✅ Password updated successfully');
    console.log('New password:', newPassword);

  } catch (error) {
    console.error('Update failed:', error);
  } finally {
    process.exit();
  }
}

updatePassword(); 