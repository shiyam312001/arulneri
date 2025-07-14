const mysql = require('mysql2/promise');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'mysql-327eb5fc-shiyam-69d6.e.aivencloud.com',
  user: process.env.DB_USER || 'avnadmin',
  password: process.env.DB_PASSWORD || 'AVNS_ASlanWgqbkNXB5oAqDe',
  database: process.env.DB_NAME || 'defaultdb',
  port: process.env.DB_PORT || 11616,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: test connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error(err);
  }
})();

module.exports = pool;
