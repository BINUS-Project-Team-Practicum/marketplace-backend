const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const protect = require('../middleware/auth');
const { registerUser, loginUser, getMe } = require('../controllers/userController');

const router = express.Router();

const registerValidation = [
  body('firstName').notEmpty().withMessage('Nama depan wajib diisi'),
  body('lastName').notEmpty().withMessage('Nama belakang wajib diisi'),
  body('email').isEmail().withMessage('Format email tidak valid'),
  body('phone').notEmpty().withMessage('Nomor telepon wajib diisi'),
  body('password').isLength({ min: 8 }).withMessage('Password minimal 8 karakter')
];

const loginValidation = [
  body('identifier').notEmpty().withMessage('Email atau nomor telepon wajib diisi'),
  body('password').notEmpty().withMessage('Password wajib diisi')
];

router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);
router.get('/me', protect, getMe);

module.exports = router;