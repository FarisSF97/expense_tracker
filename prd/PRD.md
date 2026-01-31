# Product Requirements Document (PRD)

# Expense Tracker - Proyek Kolaborasi Tim

## 📋 Ringkasan Proyek

**Expense Tracker** adalah aplikasi web untuk mencatat dan mengelola pengeluaran pribadi. Proyek ini dirancang khusus sebagai **proyek kolaborasi tim** untuk 5+ developer yang sedang belajar web development dan praktik kolaborasi menggunakan Git/GitHub.

## 🎯 Tujuan Pembelajaran

Melalui proyek ini, peserta akan belajar:

1. **Kolaborasi Tim**: Bekerja bersama dalam satu repository menggunakan Git workflow
2. **Full-Stack Development**: Membangun aplikasi lengkap dari backend hingga frontend
3. **REST API**: Membuat dan mengonsumsi API
4. **Modern Development**: Menggunakan tools modern seperti Vite, npm, dan Express.js
5. **Best Practices**: Koding yang bersih, code review, dan komunikasi tim

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM/Query Builder**: node-postgres (pg)
- **Migration Tool**: node-pg-migrate (optional)
- **Port**: 3000

### Frontend

- **Build Tool**: Vite
- **Framework**: Vanilla JavaScript (No framework)
- **Styling**: CSS3
- **Port**: 5173

### Version Control

- **Git** & **GitHub**
- Pull Request workflow
- Branch protection

## ✨ Fitur Utama

### 1. CRUD Pengeluaran

- **Create**: Tambah pengeluaran baru
- **Read**: Lihat daftar semua pengeluaran
- **Update**: Edit pengeluaran yang sudah ada
- **Delete**: Hapus pengeluaran

### 2. Kategori Pengeluaran

- Makanan & Minuman
- Transportasi
- Belanja
- Tagihan
- Hiburan
- Kesehatan
- Lain-lain

### 3. Filter & Pencarian

- Filter berdasarkan kategori
- Filter berdasarkan tanggal
- Filter berdasarkan bulan
- Pencarian berdasarkan deskripsi

### 4. Statistik & Laporan

- Total pengeluaran keseluruhan
- Total per kategori
- Total per bulan
- Visualisasi sederhana (optional: chart)

## 📊 Data Model

### Database Schema

#### Tabel: expenses

```sql
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  deskripsi VARCHAR(200) NOT NULL,
  jumlah INTEGER NOT NULL CHECK (jumlah > 0),
  kategori VARCHAR(50) NOT NULL,
  tanggal DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index untuk performa query
CREATE INDEX idx_expenses_kategori ON expenses(kategori);
CREATE INDEX idx_expenses_tanggal ON expenses(tanggal);
CREATE INDEX idx_expenses_created_at ON expenses(created_at);
```

#### Tabel: categories (Optional - untuk validasi)

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Data kategori default
INSERT INTO categories (nama) VALUES
  ('Makanan & Minuman'),
  ('Transportasi'),
  ('Belanja'),
  ('Tagihan'),
  ('Hiburan'),
  ('Kesehatan'),
  ('Lain-lain');
```

### Expense Object (JSON Response)

```javascript
{
  "id": 1,
  "deskripsi": "Makan siang",
  "jumlah": 50000,
  "kategori": "Makanan & Minuman",
  "tanggal": "2025-11-22",
  "created_at": "2025-11-22T10:30:00Z",
  "updated_at": "2025-11-22T10:30:00Z"
}
```

## 👥 Target Users

1. **Mahasiswa/Pelajar**: Yang ingin belajar web development dan kolaborasi
2. **Developer Pemula**: Yang ingin memahami full-stack development
3. **Tim Pembelajaran**: Yang ingin praktik Git workflow dalam tim

## 🎨 UI/UX Requirements

### Prinsip Desain

- **Simple & Clean**: Interface yang mudah dipahami
- **Responsive**: Dapat diakses di mobile dan desktop
- **User-Friendly**: Flow yang intuitif untuk pemula
- **Consistent**: Konsisten dalam penggunaan warna dan layout

### Halaman Utama

1. **Dashboard**

   - Ringkasan total pengeluaran
   - Chart/grafik sederhana (optional)
   - Quick stats per kategori

2. **Daftar Pengeluaran**

   - Tabel/list pengeluaran
   - Filter dan pencarian
   - Action buttons (Edit, Delete)

3. **Form Tambah/Edit**
   - Input deskripsi
   - Input jumlah
   - Dropdown kategori
   - Date picker
   - Button Submit/Cancel

## 🚀 Success Criteria

Proyek dianggap sukses jika:

1. ✅ Semua fitur CRUD berfungsi dengan baik
2. ✅ API backend dapat diakses dan memberikan response yang benar
3. ✅ Frontend dapat berkomunikasi dengan backend
4. ✅ Minimal 5 anggota tim berkontribusi melalui Pull Request
5. ✅ Code direview sebelum di-merge ke main branch
6. ✅ Aplikasi dapat dijalankan di local environment
7. ✅ Dokumentasi lengkap dan jelas

## 📈 Non-Functional Requirements

### Performance

- Response time API < 1 detik
- Page load time < 3 detik

### Code Quality

- Kode mudah dibaca dan di-maintain
- Mengikuti naming convention yang konsisten
- Memiliki error handling yang baik
- Komentar di bagian yang kompleks

### Collaboration

- Setiap fitur dikerjakan di branch terpisah
- Minimal 1 reviewer setiap Pull Request
- Commit message yang jelas dan deskriptif
- Komunikasi aktif antar anggota tim

## 🔮 Future Enhancements (Optional)

Fitur yang bisa ditambahkan di masa depan:

- Authentication & Multi-user
- Export data ke CSV/PDF
- Budget planning & alerts
- Recurring expenses
- Dark mode
- Mobile app (PWA)

## 📚 Referensi & Resources

- [Express.js Documentation](https://expressjs.com/)
- [Vite Documentation](https://vitejs.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres Documentation](https://node-postgres.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)

---

**Catatan**: Proyek ini dirancang untuk pembelajaran. Fokus pada proses kolaborasi dan pemahaman konsep, bukan hanya hasil akhir.
