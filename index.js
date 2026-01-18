const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Postgres connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Create users table once
async function initDB() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role VARCHAR(20) DEFAULT 'STAFF',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log("Users table ready");
}

initDB();

app.get("/", (req, res) => {
  res.send("PM Brothers Hospital API Running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
