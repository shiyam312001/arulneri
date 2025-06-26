import { authenticateAdmin } from '../../../../lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    console.log('Login request received');
    
    const body = await request.json();
    console.log('Request body:', { username: body.username, password: body.password });

    const { username, password } = body;

    if (!username || !password) {
      console.log('Missing credentials');
      return NextResponse.json(
        { message: 'Username and password required' },
        { status: 400 }
      );
    }

    console.log('Calling authenticateAdmin with:', { username });
    const result = await authenticateAdmin(username, password);
    console.log('Authentication result:', { 
      success: result.success, 
      message: result.message,
      hasToken: !!result.token,
      hasAdmin: !!result.admin
    });

    if (result.success) {
      const response = NextResponse.json({
        success: true,
        admin: result.admin
      });

      // Set HTTP-only cookie
      response.cookies.set('admin_token', result.token, {
        httpOnly: true,
        path: '/',
        maxAge: 86400,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });

      console.log('Login successful, returning response with cookie');
      return response;
    } else {
      console.log('Login failed:', result.message);
      return NextResponse.json(
        { message: result.message },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 