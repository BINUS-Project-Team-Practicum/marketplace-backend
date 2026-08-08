const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Nama produk wajib diisi'], trim: true },
  storeName: { type: String, required: [true, 'Nama toko wajib diisi'], trim: true },
  description: { type: String, required: [true, 'Deskripsi wajib diisi'] },
  price: { type: Number, required: [true, 'Harga wajib diisi'], min: [0, 'Harga tidak boleh negatif'] },
  images: { type: [String], required: true },
  category: { type: String, required: [true, 'Kategori wajib diisi'] },
  stock: { type: Number, required: true, min: [0, 'Stok tidak boleh negatif'], default: 0 },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);