// routes/appointments.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/appointments", (req, res) => {
  pool.query("SELECT * FROM appointment", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default router;
