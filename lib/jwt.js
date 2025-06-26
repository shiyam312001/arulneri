import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ABSHS';

export function verifyJWT(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
