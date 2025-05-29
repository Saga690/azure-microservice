// db.js
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true,
  },
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to DB:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to Azure MySQL');
    connection.release(); // Release the connection back to the pool
  }
});

export default pool;
