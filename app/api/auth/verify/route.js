import { verifyJWT } from '../../../../lib/auth';
import db from '../../../../lib/db';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = verifyJWT(token);

    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Verify admin still exists in database
    const [rows] = await db.execute(
      'SELECT id, username, email, role FROM admins WHERE id = ?',
      [decoded.id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: rows[0]
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}