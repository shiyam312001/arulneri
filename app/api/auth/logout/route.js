export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    res.setHeader('Set-Cookie', [
      'admin_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
    ]);
  
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  }