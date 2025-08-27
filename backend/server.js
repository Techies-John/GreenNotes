const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "mysql",
  user: 'app_user',
  password: 'app_pass',
  database: 'app_db',
});

app.get("/", (req, res) => {
  res.send("Welcome to the Dockerized Node App!");
});

app.get("/api/get-notes", (req, res) => {
  pool.query("SELECT * FROM notes", (err, results) => {
    if (err) {
      console.error("Error fetching notes:", err); // full error object
      return res.status(500).send("Database error");
    }

    res.json(results);
  });
})

app.get("/api/get-note/:id", (req, res) => {
  const noteId = req.params.id;

  pool.query("SELECT * FROM notes WHERE id = ?", [noteId], (err, results) => {
    if (err) {
      console.error("Error fetching note:", err.message);
      return res.status(500).send("Database error");
    }
    if (results.length === 0) {
      return res.status(404).send("Note not found!");
    }

    res.json(results[0]);
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

    res.send("Note added successfully!");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.put("/api/put-note/:id", (req, res) => {
  const { note_title, description } = req.body;
  const id = req.params.id;

  const query = "UPDATE notes SET note_title = ?, description = ? WHERE id = ?";
  pool.query(query, [note_title, description, id], (err, result) => {
    if (err) {
      console.error("Update error:", err.message);
      return res.status(500).send("Database update failed");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Note not found");
    }

    res.send("Note updated");
  });
});

app.delete("/api/delete-note/:id", (req, res) => {
  const id = req.params.id;

  const query = "DELETE FROM notes WHERE id = ?";
  pool.query(query, [id], (err, result) => {
    if (err) {
      console.error("Delete error: ", err.message);

      return res.status(500).send("Database delete failed");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Note not found");
    }

    res.send("Note deleted");
  });
});
