const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const existing = await User.findOne({ $or: [{ email }, { phone }] });
    if (existing) return res.status(400).json({ success: false, message: 'Email atau nomor telepon sudah terdaftar' });

    const user = await User.create({ firstName, lastName, email, phone, password });
    const token = generateToken(user._id);

    res.status(201).json({ success: true, data: { id: user._id, email: user.email }, token });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Email/No HP atau password salah' });
    }

    const token = generateToken(user._id);
    res.json({ success: true, data: { id: user._id, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};