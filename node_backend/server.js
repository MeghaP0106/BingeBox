const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing JSON bodies

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '01062005',
  database: 'bingebox'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as ID ' + db.threadId);
});

// ROOT route
app.get('/', (req, res) => {
  res.send('Welcome to the Node backend!');
});

// 1️⃣ GET all content
app.get('/content', (req, res) => {
  db.query('SELECT * FROM content', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 2️⃣ GET content by ID
app.get('/content/:id', (req, res) => {
  const contentID = req.params.id;
  db.query('SELECT * FROM content WHERE Content_ID = ?', [contentID], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Content not found' });
    res.json(results[0]);
  });
});

// 3️⃣ POST (insert) new content
app.post('/content', (req, res) => {
  const newContent = req.body;
  const query = `
    INSERT INTO content (Content_ID, Title, Type, Description, Release_year, Duration, Seasons, Rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    newContent.Content_ID,
    newContent.Title,
    newContent.Type,
    newContent.Description,
    newContent.Release_year,
    newContent.Duration,
    newContent.Seasons,
    newContent.Rating
  ];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Content added successfully' });
  });
});

// 4️⃣ PUT (update) content by ID
app.put('/content/:id', (req, res) => {
  const contentID = req.params.id;
  const updatedContent = req.body;
  const query = `
    UPDATE content SET Title = ?, Type = ?, Description = ?, Release_year = ?, Duration = ?, Seasons = ?, Rating = ?
    WHERE Content_ID = ?
  `;
  const values = [
    updatedContent.Title,
    updatedContent.Type,
    updatedContent.Description,
    updatedContent.Release_year,
    updatedContent.Duration,
    updatedContent.Seasons,
    updatedContent.Rating,
    contentID
  ];

  db.query(query, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Content not found' });
    res.json({ message: 'Content updated successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
