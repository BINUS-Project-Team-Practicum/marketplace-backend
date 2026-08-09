# marketplace-backend

REST API untuk aplikasi marketplace BINUS Specialized Platform Development. Dipakai bersama dua frontend: `fe-ecommerce-web-app` (React + Vite) dan `fe-ecommerce-mobile-app` (Expo / React Native).

Stack: Express 5, Mongoose 9, MongoDB Atlas, JWT untuk autentikasi.

## Yang perlu disiapkan sebelum menjalankan

Salah satu saja:

- **Docker Desktop** — cara paling cepat, tidak perlu pasang Node.js.
- **Node.js 20** — kalau mau jalan langsung tanpa container.

Database memakai **MongoDB Atlas** (MongoDB yang di-host di cloud), jadi tidak ada container database di sini. Connection string-nya diambil dari file `.env`.

## Menyiapkan file .env

File `.env` tidak ikut masuk git. Salin dulu dari contohnya:

```bash
cp .env.example .env
```

Lalu isi tiga variable berikut:

| Variable | Isi |
|---|---|
| `PORT` | Port Express di dalam container. Default `5000`. |
| `MONGO_URI` | Connection string MongoDB Atlas, lengkap dengan nama database. |
| `JWT_SECRET` | String acak yang panjang, dipakai menandatangani token login. |

Untuk membuat `JWT_SECRET` acak:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

## Menjalankan dengan Docker

### Mode development — kode berubah, server restart sendiri

Mode ini memakai `nodemon`. Folder project di-mount ke dalam container, jadi setiap file yang kamu simpan langsung membuat server restart tanpa perlu build ulang.

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

### Mode production — image final, jalan sebagai user non-root

```bash
docker compose up --build
```

Keduanya menyajikan API di `http://localhost:5000`. Cek dengan membuka alamat itu di browser — kalau muncul teks `API Marketplace Berjalan!`, berarti server hidup.

Untuk menghentikan:

```bash
docker compose down
```

## Menjalankan tanpa Docker

```bash
npm install
npm run dev
```

## Mengisi database dengan data contoh

Script `seed.js` mengisi collection produk dengan data awal. Jalankan sekali saja setelah database kosong tersambung.

Dengan Docker, ketika container sedang hidup:

```bash
docker compose exec api npm run seed
```

Tanpa Docker:

```bash
npm run seed
```

## Daftar endpoint

Semua endpoint diawali `/api`.

### Produk — `/api/products`

| Method | Path | Keterangan |
|---|---|---|
| `GET` | `/api/products` | Ambil semua produk. |
| `GET` | `/api/products/categories` | Ambil daftar kategori yang ada. |
| `GET` | `/api/products/:id` | Ambil satu produk berdasarkan id. |
| `POST` | `/api/products` | Tambah produk baru. |
| `PUT` | `/api/products/:id` | Ubah seluruh data satu produk. |
| `PATCH` | `/api/products/:id/stock` | Ubah stok saja. |
| `DELETE` | `/api/products/:id` | Hapus produk. |

Field wajib saat `POST` dan `PUT`: `name`, `storeName`, `description`, `price`, `category`, `stock`, dan `images` (array, minimal satu isi).

### User — `/api/users`

| Method | Path | Keterangan |
|---|---|---|
| `POST` | `/api/users/register` | Daftar akun baru. |
| `POST` | `/api/users/login` | Login, mengembalikan JWT. |
| `GET` | `/api/users/me` | Data user yang sedang login. Butuh token. |

Register butuh `firstName`, `lastName`, `email`, `phone`, dan `password` minimal 8 karakter. Login memakai `identifier` — bisa diisi email atau nomor telepon — beserta `password`.

Endpoint `/api/users/me` membaca token dari header:

```
Authorization: Bearer <token>
```

## Struktur folder

```
config/       koneksi MongoDB
controllers/  logika tiap endpoint
middleware/   pengecekan JWT dan hasil validasi input
models/       schema Mongoose untuk Product dan User
routes/       pemetaan URL ke controller
seed.js       pengisi data contoh
server.js     titik masuk aplikasi
```

## Kalau ada masalah

**`MongoDB connection error` lalu container langsung berhenti.** `MONGO_URI` salah, atau IP kamu belum terdaftar di Atlas. Buka Atlas → Network Access, lalu tambahkan IP kamu.

**`http://localhost:5000` tidak bisa dibuka padahal container hidup.** Cek apakah port 5000 sudah dipakai program lain: `docker compose ps` untuk melihat status, `docker compose logs api` untuk melihat error-nya.

**Perubahan kode tidak terbaca di mode development.** Pastikan menjalankan perintah yang memakai kedua file compose, bukan `docker compose up` saja.
