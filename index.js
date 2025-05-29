import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

const app = express();
const port = 3000;


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true
  }
});

//Test connection by getting a single connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to DB:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to Azure MySQL');
    connection.release(); // Release the connection back to the pool
  }
});




app.get('/health', (req, res) => res.send('OK'));


app.get('/appointments', (req, res) => {
  pool.query('SELECT * FROM appointment', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Patient Service running at http://localhost:${port}`);
});
