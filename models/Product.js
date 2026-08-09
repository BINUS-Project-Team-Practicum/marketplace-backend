const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nama produk wajib diisi'],
    trim: true
  },
  storeName: {
    type: String,
    required: [true, 'Nama toko wajib diisi'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Deskripsi wajib diisi']
  },
  specs: {
    type: Map,
    of: String,
    default: {}
  },
  price: {
    type: Number,
    required: [true, 'Harga wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Harga asli tidak boleh negatif']
  },
  discountPercent: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  images: {
    type: [String],
    validate: {
      validator: (arr) => arr.length > 0,
      message: 'Minimal 1 gambar produk'
    }
  },
  category: {
    type: String,
    required: [true, 'Kategori wajib diisi']
  },
  variants: {
    colors: [String]
  },
  stock: {
    type: Number,
    required: true,
    min: [0, 'Stok tidak boleh negatif'],
    default: 0
  },
  soldCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);