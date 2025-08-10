import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import pool from '@/lib/db';
import { verifyJWT } from '@/lib/jwt'; // or wherever you handle JWT

// GET /api/contacts
export async function GET(request) {
  let connection;
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    connection = await pool.getConnection();
    const [contacts] = await connection.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// POST /api/contacts
export async function POST(request) {
  let connection;
  try {
    const { fullName, district, mobile, message } = await request.json();

    if (!fullName || !district || !mobile) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO contacts (full_name, district, mobile, message) VALUES (?, ?, ?, ?)',
      [fullName, district, mobile, message]
    );

    return NextResponse.json({
      message: 'Contact form submitted successfully',
      contactId: result.insertId
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
