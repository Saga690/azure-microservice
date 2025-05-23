import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
dotenv.config();

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true
  }
});

connection.connect(err => {
  if (err) {
    console.error('❌ Error connecting to DB:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to Azure MySQL');
});

app.get('/appointments', (req, res) => {
  connection.query('SELECT * FROM appointment', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Patient Service running at http://localhost:${port}`);
});
