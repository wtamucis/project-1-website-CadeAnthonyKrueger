import express from "express";
import Database from "better-sqlite3";

const router = express.Router();
const db = new Database("./db/app.db");

// -------------------- GET ALL BRIEFS --------------------
router.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM briefs ORDER BY id DESC").all();
  res.json(rows);
});

// -------------------- CREATE A BRIEF --------------------
router.post("/", (req, res) => {
  const { name, date_modified, modified_by } = req.body;

  const stmt = db.prepare(`
    INSERT INTO briefs (name, date_modified, modified_by)
    VALUES (?, ?, ?)
  `);

  const result = stmt.run(name, date_modified, modified_by);

  res.json({ id: result.lastInsertRowid, success: true });
});

// -------------------- DELETE A BRIEF --------------------
router.delete("/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM briefs WHERE id = ?");
  stmt.run(req.params.id);
  res.json({ success: true });
});

export default router;
