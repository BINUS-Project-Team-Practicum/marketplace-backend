// Database hanya menyimpan path relatif, misalnya /static/products/foo.jpg.
// URL lengkapnya disusun di sini, saat request datang.
//
// Alasannya: host yang benar berbeda-beda tergantung siapa yang memanggil —
// localhost:5000 dari browser di komputer sendiri, IP LAN dari HP yang
// menjalankan Expo, dan domain publik setelah deploy. Kalau host ikut disimpan
// di database, setiap environment harus seed ulang dan datanya jadi salah
// begitu alamatnya berubah.

// Path yang sudah lengkap dibiarkan apa adanya.
const isAbsolute = (value) => /^(https?:)?\/\//i.test(value) || value.startsWith('data:');

// Urutan penentuan host:
// 1. ASSET_BASE_URL kalau di-set — dipakai saat gambar dilayani CDN atau
//    domain terpisah dari API.
// 2. Host dari request itu sendiri. Di belakang reverse proxy, nilai ini
//    mengikuti header X-Forwarded-* karena server.js memasang trust proxy.
const baseUrlFor = (req) => {
  const configured = process.env.ASSET_BASE_URL;
  if (configured) return configured.replace(/\/+$/, '');
  return `${req.protocol}://${req.get('host')}`;
};

const toAbsolute = (value, base) => {
  if (typeof value !== 'string' || value.length === 0) return value;
  if (isAbsolute(value)) return value;
  return `${base}${value.startsWith('/') ? '' : '/'}${value}`;
};

// Menerima satu produk atau array produk. Mongoose document diubah dulu jadi
// object biasa supaya aman dimodifikasi tanpa menyentuh data di database.
const withAssetUrls = (payload, req) => {
  const base = baseUrlFor(req);

  const mapOne = (product) => {
    if (!product) return product;
    const plain = typeof product.toObject === 'function' ? product.toObject() : { ...product };
    if (Array.isArray(plain.images)) {
      plain.images = plain.images.map((image) => toAbsolute(image, base));
    }
    return plain;
  };

  return Array.isArray(payload) ? payload.map(mapOne) : mapOne(payload);
};

module.exports = { withAssetUrls };
