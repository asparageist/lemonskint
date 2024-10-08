const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

// Set up the database connection
const db = new sqlite3.Database('./devlog.db', (err) => {
  if (err) {
    console.error('Database error: ', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create posts table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  excerpt TEXT,
  content TEXT,
  imageUrl TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`
);

// Fetch all posts
app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Add a new post
app.post('/posts', (req, res) => {
  const { title, excerpt, content, imageUrl, timestamp } = req.body;
  console.log('Received POST request with body:', req.body);

  const sql = `INSERT INTO posts (title, excerpt, content, imageUrl, timestamp) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [title, excerpt, content, imageUrl, timestamp], function (err) {
    if (err) {
      console.error('Error inserting post into database:', err.message);
      res.status(500).send(err.message);
    } else {
      console.log('Post successfully added to database with ID:', this.lastID);
      res.json({ id: this.lastID, title, excerpt, content, imageUrl, timestamp });
    }
  });
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM posts WHERE id = ?`, [id], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ message: `Post with ID ${id} deleted` });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
