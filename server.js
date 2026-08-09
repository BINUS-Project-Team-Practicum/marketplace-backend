require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Gambar produk disajikan dari folder assets/, terpisah dari assets frontend.
// assets/products/foo.jpg  ->  http://localhost:5000/static/products/foo.jpg
app.use('/static', express.static(path.join(__dirname, 'assets')));

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => res.send('API Marketplace Berjalan!'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));