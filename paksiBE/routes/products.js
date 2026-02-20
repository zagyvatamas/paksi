const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Hiba a lekérdezés során:', err);
      return res.status(500).json({ error: 'Adatbázis hiba' });
    }
    
    res.json(results);
  });
});

module.exports = router;