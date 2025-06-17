const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
  res.send("Welcome to the Dockerized Node App!");
});

app.get("/api/get-note", (req, res) => {
  pool.query("SELECT * FROM notes", (err, results) => {
    if (err) {
      console.error("Error fetching notes:", err.message);
      return res.status(500).send("Database error");
    }

    res.json(results);
  });
});

app.post("/api/add-note", (req, res) => {
  const { noteName, noteDescription } = req.body;

  const query = "INSERT INTO notes (note_title, description) VALUES (?, ?)";
  pool.query(query, [noteName, noteDescription], (err, result) => {
    if (err) {
      console.error("Error inserting note:", err.message);
      return res.status(500).send("Database error");
    }

    res.send("Note added successfully 💚!");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
