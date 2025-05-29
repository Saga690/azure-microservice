// routes/schedule.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/schedule", (req, res) => {
  pool.query("SELECT * FROM schedule", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default router;
