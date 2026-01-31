# Setup Guide - Expense Tracker

Panduan lengkap untuk setup proyek Expense Tracker di komputer lokal Anda.

## 📋 Prerequisites

Pastikan komputer Anda sudah terinstal:

1. **Node.js** (versi 16 atau lebih baru)
   - Download dari: https://nodejs.org/
   - Verifikasi instalasi: `node --version`

2. **npm** (biasanya otomatis terinstal dengan Node.js)
   - Verifikasi instalasi: `npm --version`

3. **PostgreSQL** (versi 12 atau lebih baru)
   - **Windows**: Download dari https://www.postgresql.org/download/windows/
   - **macOS**: `brew install postgresql` atau download dari website
   - **Linux**: `sudo apt-get install postgresql postgresql-contrib`
   - Verifikasi instalasi: `psql --version`

4. **Git**
   - Download dari: https://git-scm.com/
   - Verifikasi instalasi: `git --version`

5. **Code Editor** (pilih salah satu)
   - VS Code (recommended): https://code.visualstudio.com/
   - Sublime Text, Atom, atau editor favorit Anda

## 🔧 Setup Repository

### 1. Clone Repository

```bash
# Clone repository ke komputer lokal
git clone <URL_REPOSITORY>

# Masuk ke folder project
cd qodr-expense-tracker-collaboration-project
```

### 2. Verifikasi Struktur Folder

Pastikan struktur folder seperti ini:
```
qodr-expense-tracker-collaboration-project/
├── backend/
├── frontend/
├── prd/
└── README.md
```

## 🔙 Setup Backend

### Step 1: Masuk ke Folder Backend

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

Perintah ini akan menginstal semua library yang dibutuhkan yang terdaftar di `package.json`.

**Dependencies yang akan terinstal:**
- `express` - Framework untuk membuat server
- `cors` - Untuk mengizinkan request dari frontend
- `dotenv` - Untuk mengelola environment variables
- `pg` - PostgreSQL client untuk Node.js
- `nodemon` - Untuk auto-restart server saat development

### Step 3: Setup PostgreSQL Database

#### 3.1. Start PostgreSQL Service

```bash
# Windows (jika tidak auto-start)
# Buka Services → PostgreSQL → Start

# macOS
brew services start postgresql

# Linux
sudo service postgresql start
```

#### 3.2. Buat Database Baru

```bash
# Masuk ke PostgreSQL console
psql -U postgres

# Di dalam psql console, buat database
CREATE DATABASE expense_tracker;

# Verifikasi database dibuat
\l

# Keluar dari psql
\q
```

**Catatan**: Password default PostgreSQL biasanya adalah `postgres`. Jika diminta password saat login, gunakan password yang Anda set saat instalasi.

#### 3.3. Buat Tabel Expenses

Buat file `backend/database/schema.sql` dengan isi:

```sql
-- Buat tabel expenses
CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  deskripsi VARCHAR(200) NOT NULL,
  jumlah INTEGER NOT NULL CHECK (jumlah > 0),
  kategori VARCHAR(50) NOT NULL,
  tanggal DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Buat tabel categories (optional)
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data kategori default
INSERT INTO categories (nama) VALUES
  ('Makanan & Minuman'),
  ('Transportasi'),
  ('Belanja'),
  ('Tagihan'),
  ('Hiburan'),
  ('Kesehatan'),
  ('Lain-lain')
ON CONFLICT (nama) DO NOTHING;

-- Buat indexes untuk performa
CREATE INDEX IF NOT EXISTS idx_expenses_kategori ON expenses(kategori);
CREATE INDEX IF NOT EXISTS idx_expenses_tanggal ON expenses(tanggal);
CREATE INDEX IF NOT EXISTS idx_expenses_created_at ON expenses(created_at);
```

Jalankan file schema:
```bash
# Dari folder backend
psql -U postgres -d expense_tracker -f database/schema.sql
```

### Step 4: Konfigurasi Environment Variables

Buat file `.env` di folder backend:

```bash
# Buat file .env
touch .env
```

Isi file `.env`:
```
# Server
PORT=3000
NODE_ENV=development

# Database
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_tracker
```

**PENTING**: Ganti `DB_PASSWORD` dengan password PostgreSQL Anda!

### Step 5: Verifikasi Koneksi Database

Buat file test koneksi `backend/database/testConnection.js`:

```javascript
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully!');
    console.log('Current time from DB:', result.rows[0].now);
    await pool.end();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

testConnection();
```

Test koneksi:
```bash
node database/testConnection.js
```

### Step 6: Jalankan Backend Server

```bash
# Untuk development (dengan auto-reload)
npm run dev

# Atau untuk production
npm start
```

Server akan berjalan di: `http://localhost:3000`

### Step 7: Test Backend

Buka browser atau gunakan Postman/Thunder Client:
```
http://localhost:3000/api/expenses
```

Anda akan melihat response JSON dari server (bisa kosong jika belum ada data).

## 🎨 Setup Frontend

### Step 1: Buka Terminal Baru

**PENTING**: Jangan matikan terminal backend! Buka terminal baru.

```bash
# Dari root folder project
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

**Dependencies yang akan terinstal:**
- `vite` - Build tool yang cepat
- Development dependencies untuk Vite

### Step 3: Verifikasi Struktur Frontend

Struktur folder frontend:
```
frontend/
├── index.html
├── src/
│   ├── main.js
│   ├── style.css
│   ├── api/
│   │   └── expenseApi.js
│   ├── components/
│   │   ├── ExpenseForm.js
│   │   ├── ExpenseList.js
│   │   └── Dashboard.js
│   └── utils/
│       └── helpers.js
├── package.json
└── vite.config.js
```

### Step 4: Jalankan Frontend Development Server

```bash
npm run dev
```

Frontend akan berjalan di: `http://localhost:5173`

### Step 5: Buka di Browser

Buka browser dan akses:
```
http://localhost:5173
```

Anda akan melihat aplikasi Expense Tracker!

## ✅ Verifikasi Setup Berhasil

### Checklist:
- [ ] PostgreSQL service berjalan
- [ ] Database `expense_tracker` sudah dibuat
- [ ] Tabel `expenses` dan `categories` sudah dibuat
- [ ] Test koneksi database berhasil
- [ ] Backend berjalan di `http://localhost:3000`
- [ ] Frontend berjalan di `http://localhost:5173`
- [ ] Tidak ada error di terminal
- [ ] Browser menampilkan aplikasi
- [ ] Console browser tidak ada error (tekan F12)

### Test Koneksi Frontend-Backend-Database:
1. Buka aplikasi di browser
2. Coba tambah pengeluaran baru
3. Periksa apakah data muncul di list
4. Verifikasi data tersimpan di database:
```bash
psql -U postgres -d expense_tracker -c "SELECT * FROM expenses;"
```

## 🐛 Troubleshooting

### Problem: "Port already in use"

**Solusi 1: Ganti Port**
```bash
# Backend - edit file .env
PORT=3001

# Frontend - tambahkan flag --port
npm run dev -- --port 5174
```

**Solusi 2: Kill Process yang Menggunakan Port**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### Problem: "Cannot find module"

**Solusi:**
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
```

### Problem: "CORS Error"

**Solusi:**
Pastikan backend sudah menggunakan CORS middleware:
```javascript
// backend/server.js
const cors = require('cors');
app.use(cors());
```

### Problem: "npm: command not found"

**Solusi:**
- Install ulang Node.js dari nodejs.org
- Restart terminal/komputer
- Verifikasi PATH environment variable

### Problem: Frontend tidak bisa connect ke Backend

**Solusi:**
1. Pastikan backend berjalan
2. Cek URL API di frontend (harus http://localhost:3000)
3. Cek console browser untuk error details
4. Pastikan CORS sudah diaktifkan di backend

### Problem: "FATAL: database does not exist"

**Solusi:**
```bash
# Buat database
psql -U postgres -c "CREATE DATABASE expense_tracker;"
```

### Problem: "FATAL: password authentication failed"

**Solusi:**
1. Cek password PostgreSQL Anda
2. Update file `.env` dengan password yang benar
3. Atau reset password PostgreSQL:
```bash
# Linux/macOS
sudo -u postgres psql
ALTER USER postgres PASSWORD 'new_password';
```

### Problem: "relation expenses does not exist"

**Solusi:**
```bash
# Jalankan ulang schema
psql -U postgres -d expense_tracker -f database/schema.sql
```

### Problem: "Connection refused" atau "ECONNREFUSED"

**Solusi:**
1. Pastikan PostgreSQL service berjalan
2. Cek port PostgreSQL (default: 5432)
3. Restart PostgreSQL service

## 📝 Perintah-Perintah Penting

### PostgreSQL
```bash
# Start/Stop service
sudo service postgresql start    # Linux
brew services start postgresql   # macOS

# Akses database
psql -U postgres -d expense_tracker

# Di dalam psql:
\l                    # List databases
\dt                   # List tables
\d expenses           # Describe table
SELECT * FROM expenses;  # Query data
\q                    # Quit
```

### Backend
```bash
npm install          # Install dependencies
npm run dev          # Run development server with nodemon
npm start            # Run production server
node database/testConnection.js  # Test database connection
```

### Frontend
```bash
npm install          # Install dependencies
npm run dev          # Run development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Git
```bash
git status           # Cek status perubahan
git pull origin main # Update dari remote
git add .            # Stage semua perubahan
git commit -m "..."  # Commit perubahan
git push origin <branch-name>  # Push ke remote
```

## 🎓 Tips untuk Pemula

1. **Selalu jalankan PostgreSQL, backend, dan frontend bersamaan** di terminal terpisah
2. **Jangan edit file di node_modules** - file ini auto-generated
3. **Backup database secara berkala** saat development
4. **Commit sering** dengan message yang jelas
5. **Pull dari main branch sebelum mulai coding** untuk mendapat update terbaru
6. **Jika stuck, cek console browser** (F12) untuk error messages
7. **Gunakan GUI tools** seperti pgAdmin atau DBeaver untuk melihat data (optional)
8. **Tanya tim** jika mengalami masalah - kolaborasi adalah kunci!

## 📚 Resources Tambahan

- [npm Documentation](https://docs.npmjs.com/)
- [Vite Getting Started](https://vitejs.dev/guide/)
- [Express.js Guide](https://expressjs.com/en/starter/installing.html)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [node-postgres Documentation](https://node-postgres.com/)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

---

**Selamat!** Setup Anda sudah selesai. Lanjut ke [KOLABORASI.md](./KOLABORASI.md) untuk mempelajari cara bekerja dalam tim.
