const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  updateStock
} = require('../controllers/productController');

const router = express.Router();

const productValidation = [
  body('name').notEmpty().withMessage('Nama produk wajib diisi'),
  body('storeName').notEmpty().withMessage('Nama toko wajib diisi'),
  body('description').notEmpty().withMessage('Deskripsi wajib diisi'),
  body('price').isFloat({ min: 0 }).withMessage('Harga harus angka dan tidak boleh negatif'),
  body('category').notEmpty().withMessage('Kategori wajib diisi'),
  body('stock').isInt({ min: 0 }).withMessage('Stok harus angka dan tidak boleh negatif'),
  body('images').isArray({ min: 1 }).withMessage('Minimal 1 gambar produk')
];

router.get('/categories', getCategories);

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', productValidation, validate, createProduct);
router.put('/:id', productValidation, validate, updateProduct);
router.patch('/:id/stock', updateStock);
router.delete('/:id', deleteProduct);

module.exports = router;