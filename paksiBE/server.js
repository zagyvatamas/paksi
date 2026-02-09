const path = require('path');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/images');
const categoryRoutes = require('./routes/category');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true 
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/', categoryRoutes);

app.listen(3000, () => {
  console.log('Szerver fut a 3000-es porton');
});

