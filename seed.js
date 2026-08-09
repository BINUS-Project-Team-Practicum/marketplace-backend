require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [

  {
    name: 'Air Max Pro Runner',
    storeName: 'NikeOfficial',
    description: 'Sepatu lari premium dengan teknologi bantalan udara untuk kenyamanan maksimal saat berlari jarak jauh.',
    specs: { Berat: '280g', Bahan: 'Mesh & Sintetis', Ukuran: '38-44' },
    price: 129.99, originalPrice: 189.99, discountPercent: 31,
    images: ['https://example.com/products/airmax-1.jpg'],
    category: 'Sports',
    variants: { colors: ['Black', 'White', 'Red'] },
    stock: 45, soldCount: 1240, rating: 4.8, reviewCount: 2341
  },
  {
    name: 'Wireless Noise-Cancelling Headphones',
    storeName: 'SoundHub - Official Store',
    description: 'Headphone wireless dengan fitur noise-cancelling aktif, cocok untuk perjalanan maupun kerja.',
    specs: { Baterai: '30 jam', Bluetooth: '5.2', Berat: '250g' },
    price: 199, originalPrice: 299, discountPercent: 33,
    images: ['https://example.com/products/headphones-1.jpg'],
    category: 'Electronics',
    variants: { colors: ['Midnight Black', 'Silver', 'Navy Blue'] },
    stock: 60, soldCount: 8900, rating: 4.7, reviewCount: 5621
  },
  {
    name: 'Smartwatch Fitness Tracker',
    storeName: 'TechGear',
    description: 'Smartwatch dengan fitur pelacak detak jantung, tidur, dan olahraga, tahan air hingga 50 meter.',
    specs: { Layar: '1.4 inch AMOLED', Baterai: '7 hari', 'Water Resistant': '50m' },
    price: 89.99, originalPrice: 129.99, discountPercent: 31,
    images: ['https://example.com/products/smartwatch-1.jpg'],
    category: 'Electronics',
    variants: { colors: ['Black', 'Blue'] },
    stock: 75, soldCount: 3200, rating: 4.5, reviewCount: 1890
  },
  {
    name: 'Portable Bluetooth Speaker',
    storeName: 'SoundHub - Official Store',
    description: 'Speaker portable dengan suara jernih dan bass kuat, tahan air IPX7 untuk aktivitas outdoor.',
    specs: { Daya: '20W', Baterai: '12 jam', Konektivitas: 'Bluetooth 5.0' },
    price: 45, originalPrice: 65, discountPercent: 31,
    images: ['https://example.com/products/speaker-1.jpg'],
    category: 'Electronics',
    variants: { colors: ['Black', 'Red', 'Teal'] },
    stock: 90, soldCount: 4500, rating: 4.6, reviewCount: 2103
  },

  {
    name: 'Minimalist Watch Collection',
    storeName: 'LuxTime',
    description: 'Jam tangan minimalis dengan desain elegan, cocok untuk gaya kasual maupun formal.',
    specs: { Material: 'Stainless Steel', 'Water Resistant': '30m' },
    price: 249, originalPrice: 320, discountPercent: 22,
    images: ['https://example.com/products/watch-1.jpg'],
    category: 'Fashion',
    variants: { colors: ['Silver', 'Gold', 'Black'] },
    stock: 30, soldCount: 543, rating: 4.9, reviewCount: 876
  },
  {
    name: 'Leather Crossbody Bag',
    storeName: 'StyleCraft',
    description: 'Tas selempang kulit asli dengan desain quilted, elegan dan tahan lama.',
    specs: { Material: 'Genuine Leather', Dimensi: '20x15x8 cm' },
    price: 89, originalPrice: 120, discountPercent: 26,
    images: ['https://example.com/products/bag-1.jpg'],
    category: 'Fashion',
    variants: { colors: ['Black', 'Brown'] },
    stock: 20, soldCount: 2100, rating: 4.6, reviewCount: 1203
  },
  {
    name: 'Classic Denim Jacket',
    storeName: 'UrbanWear',
    description: 'Jaket denim klasik unisex, cocok dipadukan dengan berbagai outfit kasual.',
    specs: { Material: '100% Cotton Denim', Fit: 'Regular' },
    price: 55, originalPrice: 80, discountPercent: 31,
    images: ['https://example.com/products/jacket-1.jpg'],
    category: 'Fashion',
    variants: { colors: ['Light Blue', 'Dark Blue'] },
    stock: 40, soldCount: 980, rating: 4.4, reviewCount: 512
  },

  {
    name: 'Ceramic Plant Pot Set',
    storeName: 'HomeGreen',
    description: 'Set pot tanaman keramik minimalis, cocok untuk dekorasi indoor maupun outdoor.',
    specs: { Isi: '3 pcs', Material: 'Ceramic' },
    price: 25, originalPrice: 35, discountPercent: 29,
    images: ['https://example.com/products/pot-1.jpg'],
    category: 'Home',
    variants: { colors: ['White', 'Terracotta'] },
    stock: 55, soldCount: 670, rating: 4.7, reviewCount: 289
  },
  {
    name: 'Aromatherapy Diffuser',
    storeName: 'HomeGreen',
    description: 'Diffuser aroma terapi dengan lampu LED warna-warni, cocok untuk relaksasi di rumah.',
    specs: { Kapasitas: '300ml', Mode: 'Continuous & Intermittent' },
    price: 32, originalPrice: 45, discountPercent: 29,
    images: ['https://example.com/products/diffuser-1.jpg'],
    category: 'Home',
    variants: { colors: ['White', 'Wood'] },
    stock: 48, soldCount: 1560, rating: 4.5, reviewCount: 743
  },

  {
    name: 'Vitamin C Serum',
    storeName: 'GlowLab',
    description: 'Serum vitamin C untuk mencerahkan kulit dan mengurangi tanda penuaan dini.',
    specs: { Volume: '30ml', 'Skin Type': 'All Skin Types' },
    price: 18, originalPrice: 25, discountPercent: 28,
    images: ['https://example.com/products/serum-1.jpg'],
    category: 'Beauty',
    variants: { colors: [] },
    stock: 100, soldCount: 5400, rating: 4.6, reviewCount: 3021
  },
  {
    name: 'Matte Lipstick Set',
    storeName: 'GlowLab',
    description: 'Set lipstik matte tahan lama dengan 4 pilihan warna trending.',
    specs: { Isi: '4 pcs', Finish: 'Matte' },
    price: 22, originalPrice: 30, discountPercent: 27,
    images: ['https://example.com/products/lipstick-1.jpg'],
    category: 'Beauty',
    variants: { colors: ['Nude', 'Red', 'Pink', 'Berry'] },
    stock: 65, soldCount: 2890, rating: 4.5, reviewCount: 1456
  },

  {
    name: 'The Art of Minimalism',
    storeName: 'BookNest',
    description: 'Buku panduan hidup minimalis untuk gaya hidup yang lebih sederhana dan bermakna.',
    specs: { Halaman: '256', Bahasa: 'Indonesia' },
    price: 12, originalPrice: 18, discountPercent: 33,
    images: ['https://example.com/products/book-1.jpg'],
    category: 'Books',
    variants: { colors: [] },
    stock: 35, soldCount: 890, rating: 4.7, reviewCount: 412
  },

  {
    name: 'Organic Green Tea Set',
    storeName: 'PureLeaf',
    description: 'Teh hijau organik premium dalam kemasan kantong teh, kaya antioksidan.',
    specs: { Isi: '50 kantong teh', Origin: 'Jepang' },
    price: 15, originalPrice: 20, discountPercent: 25,
    images: ['https://example.com/products/tea-1.jpg'],
    category: 'Food',
    variants: { colors: [] },
    stock: 80, soldCount: 3400, rating: 4.6, reviewCount: 1678
  },

  {
    name: 'Wooden Building Blocks',
    storeName: 'KidsPlay',
    description: 'Mainan edukasi balok kayu untuk melatih motorik dan kreativitas anak.',
    specs: { Isi: '100 pcs', 'Usia Rekomendasi': '3+ tahun' },
    price: 28, originalPrice: 40, discountPercent: 30,
    images: ['https://example.com/products/blocks-1.jpg'],
    category: 'Toys',
    variants: { colors: [] },
    stock: 42, soldCount: 1230, rating: 4.8, reviewCount: 645
  }
];