const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const db = require('../db');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET /imageData - adat lekérdezés
router.get('/imageData', async (req, res) => {
  const query = 'SELECT * FROM images';

  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    console.error('Hiba a lekérdezés során:', err);
    res.status(500).json({ error: 'Adatbázis hiba' });
  }
});

module.exports = router;