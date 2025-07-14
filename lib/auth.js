import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from './db';

const JWT_SECRET = '1222233'; // 🔐 Hardcoded JWT secret

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateJWT(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function authenticateAdmin(username, password) {
  try {
    console.log('Attempting to authenticate admin:', { username });

    // Check database connection
    try {
      await db.execute('SELECT 1');
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return { success: false, message: 'Database connection error' };
    }

    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE username = ? OR email = ?',
      [username, username]
    );

    console.log('Query result:', { found: rows.length > 0 });

    if (rows.length === 0) {
      return { success: false, message: 'Invalid credentials' };
    }

    const admin = rows[0];
    console.log('Found admin:', { id: admin.id, username: admin.username });

    // Check if account is locked
    if (admin.locked_until && new Date() < new Date(admin.locked_until)) {
      return { success: false, message: 'Account temporarily locked. Try again later.' };
    }

    const isValidPassword = await verifyPassword(password, admin.password);
    console.log('Password validation:', { isValid: isValidPassword });

    if (!isValidPassword) {
      // Increment failed attempts
      const newFailedAttempts = admin.failed_attempts + 1;
      let lockUntil = null;

      // Lock account after 5 failed attempts for 15 minutes
      if (newFailedAttempts >= 5) {
        lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }

      await db.execute(
        'UPDATE admins SET failed_attempts = ?, locked_until = ? WHERE id = ?',
        [newFailedAttempts, lockUntil, admin.id]
      );

      return { success: false, message: 'Invalid credentials' };
    }

    // Reset failed attempts and update last login
    await db.execute(
      'UPDATE admins SET failed_attempts = 0, locked_until = NULL, last_login = NOW() WHERE id = ?',
      [admin.id]
    );

    const token = generateJWT({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role
    });

    return {
      success: true,
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, message: 'Authentication failed' };
  }
}
