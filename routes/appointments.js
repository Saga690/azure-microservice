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

router.patch('/appointments/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (!fields.length) return res.status(400).json({ error: "No fields to update" });

  const sql = `UPDATE appointment SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE AptNum = ?`;

  pool.query(sql, [...values, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Appointment updated", affectedRows: result.affectedRows });
  });
});


export default router;
