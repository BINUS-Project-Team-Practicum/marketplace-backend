const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Nama depan wajib diisi'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Nama belakang wajib diisi'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email wajib diisi'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Format email tidak valid']
  },
  phone: {
    type: String,
    required: [true, 'Nomor telepon wajib diisi'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password wajib diisi'],
    minlength: [8, 'Password minimal 8 karakter']
  }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);