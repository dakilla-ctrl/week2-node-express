require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Bonus: custom middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Serve static HTML at /
app.use(express.static(path.join(__dirname, 'public')));

app.post('/user', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  res.send(`Hello, ${name}!`);
});

app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

app.get('/', (req, res) => {
  res.send('My Week 2 API!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
