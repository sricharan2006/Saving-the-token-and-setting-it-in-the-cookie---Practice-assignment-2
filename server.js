const express = require('express');
const { encrypt } = require('./script'); // ✅ Import your function
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const SECRET_KEY = 'mySecretKey123';

// ✅ Login Route
app.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const payload = { username };
  const token = encrypt(payload, SECRET_KEY); // ✅ Using your function

  res.json({ token });
});

// ✅ Protected Route
app.get('/dashboard', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({
      message: 'Welcome to your dashboard!',
      user: decoded
    });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
