// routes/usergroup.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/usergroup", (req, res) => {
  pool.query("SELECT * FROM usergroup", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.patch("/usergroup/:id", (req, res) => {
  const userGroupNum = req.params.id;
  const { Description, UserGroupNumCEMT } = req.body;
  const updates = [];
  const values = [];
  if (Description !== undefined) {
    updates.push("Description = ?");
    values.push(Description);
  }
  if (UserGroupNumCEMT !== undefined) {
    updates.push("UserGroupNumCEMT = ?");
    values.push(UserGroupNumCEMT);
  }
  if (updates.length === 0) {
    return res.status(400).json({ error: "No fields to update" });
  }
  values.push(userGroupNum);
  const sql = `UPDATE usergroup SET ${updates.join(", ")} WHERE UserGroupNum = ?`;
  pool.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "✅ User group updated successfully" });
  });
});

export default router;
