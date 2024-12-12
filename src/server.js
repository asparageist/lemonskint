const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


const db = new sqlite3.Database('./devlog.db', (err) => {
  if (err) {
    console.error('Database error: ', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

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

const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden - Invalid API Key' });
  }
};

app.get('/posts', (req, res) => {
  db.all('SELECT * FROM posts', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

app.post('/posts', (req, res) => {
  const { title, excerpt, content, imageUrl, timestamp } = req.body;
  const sql = `INSERT INTO posts (title, excerpt, content, imageUrl, timestamp) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [title, excerpt, content, imageUrl, timestamp], function (err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json({ id: this.lastID, title, excerpt, content, imageUrl, timestamp });
    }
  });
});

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

console.log('Loaded API Key:', process.env.API_KEY);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
