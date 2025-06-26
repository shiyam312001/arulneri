const bcrypt = require('bcryptjs');
const db = require('../lib/db');

async function resetManagerPassword() {
  try {
    const username = 'manager';
    const newPassword = 'Manager123!';
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const [users] = await db.execute('SELECT * FROM admins WHERE username = ?', [username]);
    if (users.length === 0) {
      console.log(`User '${username}' not found!`);
      return;
    }
    const user = users[0];
    await db.execute('UPDATE admins SET password = ?, failed_attempts = 0, locked_until = NULL WHERE id = ?', [hashedPassword, user.id]);
    console.log(`✅ Password for '${username}' reset to: ${newPassword}`);
  } catch (error) {
    console.error('Failed to reset password:', error);
  } finally {
    process.exit();
  }
}

resetManagerPassword(); 