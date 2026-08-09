require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Air Max Pro Runner',
    storeName: 'NikeOfficial',
    description: 'Sepatu lari premium dengan teknologi bantalan udara untuk kenyamanan maksimal saat berlari jarak jauh.',
    specs: { Berat: '280g', Bahan: 'Mesh & Sintetis', Ukuran: '38-44' },
    price: 129.99,
    originalPrice: 189.99,
    discountPercent: 31,
    images: ['https://example.com/products/airmax-1.jpg'],
    category: 'Sports',
    variants: { colors: ['Black', 'White', 'Red'] },
    stock: 45,
    soldCount: 1240,
    rating: 4.8,
    reviewCount: 2341
  },
  {
    name: 'Minimalist Watch Collection',
    storeName: 'LuxTime',
    description: 'Jam tangan minimalis dengan desain elegan, cocok untuk gaya kasual maupun formal.',
    specs: { Material: 'Stainless Steel', 'Water Resistant': '30m' },
    price: 249,
    originalPrice: 320,
    discountPercent: 22,
    images: ['https://example.com/products/watch-1.jpg'],
    category: 'Fashion',
    variants: { colors: ['Silver', 'Gold', 'Black'] },
    stock: 30,
    soldCount: 543,
    rating: 4.9,
    reviewCount: 876
  },
  {
    name: 'Wireless Noise-Cancelling Headphones',
    storeName: 'SoundHub - Official Store',
    description: 'Headphone wireless dengan fitur noise-cancelling aktif, cocok untuk perjalanan maupun kerja.',
    specs: { Baterai: '30 jam', Bluetooth: '5.2', Berat: '250g' },
    price: 199,
    originalPrice: 299,
    discountPercent: 33,
    images: ['https://example.com/products/headphones-1.jpg'],
    category: 'Electronics',
    variants: { colors: ['Midnight Black', 'Silver', 'Navy Blue'] },
    stock: 60,
    soldCount: 8900,
    rating: 4.7,
    reviewCount: 5621
  },
  {
    name: 'Leather Crossbody Bag',
    storeName: 'StyleCraft',
    description: 'Tas selempang kulit asli dengan desain quilted, elegan dan tahan lama.',
    specs: { Material: 'Genuine Leather', Dimensi: '20x15x8 cm' },
    price: 89,
    originalPrice: 120,
    discountPercent: 26,
    images: ['https://example.com/products/bag-1.jpg'],
    category: 'Fashion',
    variants: { colors: ['Black', 'Brown'] },
    stock: 20,
    soldCount: 2100,
    rating: 4.6,
    reviewCount: 1203
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Product.deleteMany({});
    console.log('Data produk lama dihapus');

    await Product.insertMany(products);
    console.log(`${products.length} produk berhasil ditambahkan`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding gagal:', err.message);
    process.exit(1);
  }
};

seedDB();