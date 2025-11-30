import express from "express";
import cors from "cors";
import fs from "fs";
import Database from "better-sqlite3";
import briefsRouter from "./routes/briefs.js";

const app = express();
app.use(cors());
app.use(express.json());

// ---------- Ensure DB exists ----------
const dbPath = "./db/app.db";
if (!fs.existsSync(dbPath)) {
  console.log("Creating SQLite database...");
  const initDb = new Database(dbPath);
  const schema = fs.readFileSync("./db/schema.sql", "utf8");
  initDb.exec(schema);
  if (fs.existsSync("./db/seed.sql")) {
    const seed = fs.readFileSync("./db/seed.sql", "utf8");
    initDb.exec(seed);
  }
  initDb.close();
}

// ---------- Routes ----------
app.use("/api/shift_briefs_data", briefsRouter);

// ---------- Start Server ----------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
});
