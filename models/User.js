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

// Hook async tidak menerima next. Sejak Mongoose 7, argumen pertama untuk hook
// async berisi options dari save(), bukan fungsi next, sehingga memanggil
// next() menghasilkan error "next is not a function" dan register gagal.
// Selesainya hook async ditandai oleh promise-nya sendiri, jadi cukup return.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);