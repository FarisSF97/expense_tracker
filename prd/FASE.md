# Pembagian Fase Proyek - Expense Tracker

Proyek dibagi menjadi 7 fase yang dapat dikerjakan secara paralel atau sequential. Setiap fase memiliki task yang jelas dan deliverables yang terukur.

## 📊 Overview Fase

```
Fase 1: Project Setup (Backend)         ──┐
Fase 2: Project Setup (Frontend)        ──┤ Paralel
                                          ├─ Foundation
Fase 3: CRUD API Backend                ──┤
Fase 4: UI Components & List Frontend   ──┘

Fase 5: Categories & Filtering          ──┐ Paralel
Fase 6: Dashboard & Statistics          ──┘

Fase 7: Integration & Polish            ─── Final
```

---

## 🏗️ FASE 1: Backend Project Setup & Database

**👤 Assigned to**: Backend Developer 1
**⏱️ Estimasi**: Task sedang
**🔗 Dependencies**: None

### Objectives
Setup struktur backend, konfigurasi Express.js server, dan PostgreSQL database.

### Tasks
- [ ] Install Express.js, CORS, pg, dan dependencies lainnya
- [ ] Buat struktur folder backend
- [ ] Setup PostgreSQL database `expense_tracker`
- [ ] Buat schema database (tables, indexes)
- [ ] Setup `server.js` dengan basic Express app
- [ ] Konfigurasi database connection pool
- [ ] Konfigurasi CORS untuk accept request dari frontend
- [ ] Setup environment variables (PORT, DB credentials)
- [ ] Buat test koneksi database
- [ ] Test server dapat berjalan di `localhost:3000`

### Deliverables
```
backend/
├── server.js           # Express server setup
├── package.json        # Dependencies (express, cors, pg, dotenv)
├── .env               # Environment variables (DB credentials)
├── .env.example       # Template untuk .env
├── .gitignore         # Git ignore file
├── database/
│   ├── schema.sql     # Database schema
│   ├── pool.js        # Database connection pool
│   └── testConnection.js  # Test database connection
└── routes/
    └── index.js       # Route placeholder
```

### Acceptance Criteria
- ✅ PostgreSQL database `expense_tracker` sudah dibuat
- ✅ Tabel `expenses` dan `categories` sudah dibuat
- ✅ Database connection pool berhasil terkonfigurasi
- ✅ Test koneksi database berhasil
- ✅ Server berjalan tanpa error
- ✅ CORS enabled
- ✅ Response "Server is running" saat akses root `/`
- ✅ Environment variables berfungsi dengan baik

### Code Example

#### database/pool.js
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

// Test connection on startup
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

module.exports = pool;
```

#### server.js
```javascript
const express = require('express');
const cors = require('cors');
const pool = require('./database/pool');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API is running' });
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### database/schema.sql
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

-- Buat tabel categories
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

-- Buat indexes
CREATE INDEX IF NOT EXISTS idx_expenses_kategori ON expenses(kategori);
CREATE INDEX IF NOT EXISTS idx_expenses_tanggal ON expenses(tanggal);
CREATE INDEX IF NOT EXISTS idx_expenses_created_at ON expenses(created_at);
```

---

## 🎨 FASE 2: Frontend Project Setup

**👤 Assigned to**: Frontend Developer 1
**⏱️ Estimasi**: Task kecil
**🔗 Dependencies**: None (dapat paralel dengan Fase 1)

### Objectives
Setup struktur frontend menggunakan Vite dan buat layout dasar.

### Tasks
- [ ] Install Vite dan setup project
- [ ] Buat struktur folder frontend
- [ ] Setup `index.html` dan `main.js`
- [ ] Buat `style.css` dengan basic styling
- [ ] Setup API config untuk connect ke backend
- [ ] Buat layout dasar (header, main, footer)
- [ ] Test development server berjalan di `localhost:5173`

### Deliverables
```
frontend/
├── index.html         # Main HTML
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
└── src/
    ├── main.js        # Entry point
    ├── style.css      # Global styles
    ├── config/
    │   └── api.js     # API configuration
    └── components/
        └── Layout.js  # Basic layout
```

### Acceptance Criteria
- ✅ Vite dev server berjalan tanpa error
- ✅ HTML menampilkan layout dasar
- ✅ CSS styling applied
- ✅ API config mengarah ke `http://localhost:3000`

### Code Example
```javascript
// src/config/api.js
export const API_BASE_URL = 'http://localhost:3000/api';

export const apiCall = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};
```

---

## 🔌 FASE 3: CRUD API Backend

**👤 Assigned to**: Backend Developer 2
**⏱️ Estimasi**: Task sedang
**🔗 Dependencies**: Fase 1 (Backend Setup)

### Objectives
Implementasi semua CRUD endpoints untuk expense management.

### Tasks
- [ ] Buat route file `/routes/expenses.js`
- [ ] Implementasi GET `/api/expenses` - Get all expenses (dengan SQL query)
- [ ] Implementasi GET `/api/expenses/:id` - Get single expense
- [ ] Implementasi POST `/api/expenses` - Create expense
- [ ] Implementasi PUT `/api/expenses/:id` - Update expense
- [ ] Implementasi DELETE `/api/expenses/:id` - Delete expense
- [ ] Buat controller dengan PostgreSQL queries
- [ ] Buat model/query functions di `models/expenseModel.js`
- [ ] Tambahkan validation untuk input data
- [ ] Error handling untuk setiap endpoint (termasuk DB errors)
- [ ] Implementasi auto-update `updated_at` timestamp

### Deliverables
```
backend/
├── routes/
│   └── expenses.js           # Expense routes
├── controllers/
│   └── expenseController.js  # Business logic
├── models/
│   └── expenseModel.js       # Database queries
└── middleware/
    └── validation.js         # Input validation
```

### API Endpoints Specification
Lihat detail di [API.md](./API.md)

### Acceptance Criteria
- ✅ Semua CRUD endpoints berfungsi
- ✅ Data tersimpan di PostgreSQL database
- ✅ SQL queries efisien dan aman (gunakan parameterized queries)
- ✅ Validation untuk required fields
- ✅ Error handling dengan status code yang benar
- ✅ Response format konsisten
- ✅ Timestamp created_at dan updated_at otomatis terkelola

### Code Example

#### models/expenseModel.js
```javascript
const pool = require('../database/pool');

// Get all expenses
exports.getAllExpenses = async (filters = {}) => {
  let query = 'SELECT * FROM expenses WHERE 1=1';
  const params = [];
  let paramCount = 1;

  if (filters.kategori) {
    query += ` AND kategori = $${paramCount}`;
    params.push(filters.kategori);
    paramCount++;
  }

  if (filters.month) {
    query += ` AND TO_CHAR(tanggal, 'YYYY-MM') = $${paramCount}`;
    params.push(filters.month);
    paramCount++;
  }

  query += ' ORDER BY tanggal DESC';

  const result = await pool.query(query, params);
  return result.rows;
};

// Get expense by ID
exports.getExpenseById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM expenses WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Create expense
exports.createExpense = async (expenseData) => {
  const { deskripsi, jumlah, kategori, tanggal } = expenseData;
  const result = await pool.query(
    `INSERT INTO expenses (deskripsi, jumlah, kategori, tanggal)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [deskripsi, jumlah, kategori, tanggal]
  );
  return result.rows[0];
};

// Update expense
exports.updateExpense = async (id, expenseData) => {
  const { deskripsi, jumlah, kategori, tanggal } = expenseData;
  const result = await pool.query(
    `UPDATE expenses
     SET deskripsi = COALESCE($1, deskripsi),
         jumlah = COALESCE($2, jumlah),
         kategori = COALESCE($3, kategori),
         tanggal = COALESCE($4, tanggal),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $5
     RETURNING *`,
    [deskripsi, jumlah, kategori, tanggal, id]
  );
  return result.rows[0];
};

// Delete expense
exports.deleteExpense = async (id) => {
  const result = await pool.query(
    'DELETE FROM expenses WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0];
};
```

### Testing
```bash
# Test dengan curl atau Postman
GET    http://localhost:3000/api/expenses
POST   http://localhost:3000/api/expenses
PUT    http://localhost:3000/api/expenses/1
DELETE http://localhost:3000/api/expenses/1

# Test dengan psql
psql -U postgres -d expense_tracker -c "SELECT * FROM expenses;"
```

---

## 📝 FASE 4: Expense List & Form UI

**👤 Assigned to**: Frontend Developer 2
**⏱️ Estimasi**: Task sedang
**🔗 Dependencies**: Fase 2 (Frontend Setup), Fase 3 (API ready - untuk testing)

### Objectives
Buat UI untuk menampilkan list expenses dan form input.

### Tasks
- [ ] Buat component `ExpenseList.js`
- [ ] Buat component `ExpenseForm.js`
- [ ] Buat component `ExpenseItem.js`
- [ ] Implementasi fetch data dari API
- [ ] Implementasi form submit (create expense)
- [ ] Implementasi delete expense
- [ ] Implementasi edit expense
- [ ] Styling untuk list dan form
- [ ] Responsive design

### Deliverables
```
frontend/src/
├── components/
│   ├── ExpenseList.js    # List component
│   ├── ExpenseForm.js    # Form component
│   └── ExpenseItem.js    # Single item component
├── api/
│   └── expenseApi.js     # API calls
└── styles/
    └── expense.css       # Component styles
```

### Acceptance Criteria
- ✅ List menampilkan semua expenses dari API
- ✅ Form dapat menambah expense baru
- ✅ Button delete berfungsi
- ✅ Edit expense berfungsi
- ✅ UI responsive di mobile
- ✅ Loading state saat fetch data
- ✅ Error handling dan error message

### Code Example
```javascript
// src/components/ExpenseForm.js
export class ExpenseForm {
  constructor(onSubmit) {
    this.onSubmit = onSubmit;
  }

  render() {
    return `
      <form id="expense-form" class="expense-form">
        <input type="text" name="deskripsi" placeholder="Deskripsi" required>
        <input type="number" name="jumlah" placeholder="Jumlah" required>
        <select name="kategori" required>
          <option value="">Pilih Kategori</option>
          <option value="Makanan & Minuman">Makanan & Minuman</option>
          <option value="Transportasi">Transportasi</option>
          <!-- more options -->
        </select>
        <input type="date" name="tanggal" required>
        <button type="submit">Tambah Expense</button>
      </form>
    `;
  }
}
```

---

## 🏷️ FASE 5: Categories & Filtering

**👤 Assigned to**: Full-Stack Developer 1
**⏱️ Estimasi**: Task sedang
**🔗 Dependencies**: Fase 3 & 4 (CRUD ready)

### Objectives
Implementasi filtering berdasarkan kategori dan tanggal.

### Tasks

#### Backend
- [ ] Tambahkan query parameters ke GET `/api/expenses`
  - Filter by kategori: `?kategori=Makanan`
  - Filter by date range: `?startDate=2025-01-01&endDate=2025-01-31`
  - Filter by month: `?month=2025-01`
- [ ] Implementasi filtering logic di controller
- [ ] Test filtering dengan berbagai kombinasi

#### Frontend
- [ ] Buat component `FilterBar.js`
- [ ] Implementasi filter dropdown untuk kategori
- [ ] Implementasi date range picker
- [ ] Implementasi filter by month
- [ ] Update ExpenseList untuk handle filtered data
- [ ] Clear filter button

### Deliverables
```
backend/
└── controllers/
    └── expenseController.js  # Updated dengan filtering

frontend/src/
└── components/
    └── FilterBar.js          # Filter UI
```

### Acceptance Criteria
- ✅ Filter by kategori berfungsi
- ✅ Filter by date range berfungsi
- ✅ Filter by month berfungsi
- ✅ Multiple filters dapat dikombinasi
- ✅ Clear filter menampilkan semua data
- ✅ UI menunjukkan filter yang aktif

### API Example
```
GET /api/expenses?kategori=Makanan&month=2025-11
Response: [expenses filtered by kategori and month]
```

---

## 📊 FASE 6: Dashboard & Statistics

**👤 Assigned to**: Full-Stack Developer 2
**⏱️ Estimasi**: Task sedang
**🔗 Dependencies**: Fase 3 & 4 (CRUD ready)

### Objectives
Buat dashboard dengan statistik dan summary pengeluaran.

### Tasks

#### Backend
- [ ] Buat endpoint GET `/api/expenses/stats`
  - Total keseluruhan
  - Total per kategori
  - Total per bulan
- [ ] Implementasi calculation logic
- [ ] Response format yang mudah digunakan di frontend

#### Frontend
- [ ] Buat component `Dashboard.js`
- [ ] Buat component `StatCard.js` (untuk display stats)
- [ ] Buat component `CategoryBreakdown.js`
- [ ] Fetch dan display total keseluruhan
- [ ] Display breakdown per kategori
- [ ] Display trend per bulan (optional: simple chart)
- [ ] Styling dashboard

### Deliverables
```
backend/
└── routes/
    └── expenses.js           # Added stats endpoint

frontend/src/
└── components/
    ├── Dashboard.js          # Main dashboard
    ├── StatCard.js           # Stat display card
    └── CategoryBreakdown.js  # Category summary
```

### Acceptance Criteria
- ✅ Dashboard menampilkan total keseluruhan
- ✅ Breakdown per kategori dengan persentase
- ✅ Summary per bulan (current month)
- ✅ Data update otomatis setelah add/edit/delete
- ✅ Visual yang menarik dan informatif

### API Response Example
```json
{
  "total": 5000000,
  "byCategory": {
    "Makanan & Minuman": 2000000,
    "Transportasi": 1500000,
    "Lain-lain": 1500000
  },
  "byMonth": {
    "2025-11": 5000000,
    "2025-10": 4500000
  }
}
```

---

## ✨ FASE 7: Integration & Polish

**👤 Assigned to**: All team members
**⏱️ Estimasi**: Task kecil-sedang
**🔗 Dependencies**: Semua fase sebelumnya

### Objectives
Integration testing, bug fixing, dan polish aplikasi.

### Tasks
- [ ] Integration testing semua fitur
- [ ] Fix bugs yang ditemukan
- [ ] Improve error handling
- [ ] Improve loading states
- [ ] Improve UI/UX
- [ ] Add form validation messages
- [ ] Add confirmation dialogs (untuk delete)
- [ ] Optimize performance
- [ ] Code cleanup dan refactoring
- [ ] Update dokumentasi
- [ ] Final testing

### Testing Checklist
- [ ] Add expense → muncul di list
- [ ] Edit expense → perubahan tersimpan
- [ ] Delete expense → hilang dari list
- [ ] Filter by kategori → hasil benar
- [ ] Filter by date → hasil benar
- [ ] Dashboard stats → angka benar
- [ ] Refresh page → data persist
- [ ] Error handling → user friendly messages
- [ ] Responsive → works di mobile dan desktop

### Acceptance Criteria
- ✅ Semua fitur berfungsi end-to-end
- ✅ Tidak ada critical bugs
- ✅ UI/UX smooth dan user-friendly
- ✅ Code clean dan terdokumentasi
- ✅ Aplikasi siap untuk "production"

---

## 📋 Task Assignment Strategy

### Cara Memilih Task:

1. **Check Dependencies**
   - Pastikan fase yang menjadi dependency sudah selesai
   - Fase 1 & 2 bisa dikerjakan paralel (no dependencies)

2. **Sesuaikan dengan Skill**
   - Backend developer → Fase 1, 3
   - Frontend developer → Fase 2, 4
   - Full-stack → Fase 5, 6, 7

3. **Komunikasi dengan Tim**
   - Announce di grup task yang akan diambil
   - Koordinasi jika ada dependencies
   - Update progress secara rutin

4. **Buat Issue/Assign Task**
   - Buat GitHub issue untuk task
   - Assign ke diri sendiri
   - Link ke fase terkait

### Parallel Work Strategy:

```
Week 1:
├── Person 1: Fase 1 (Backend Setup)
├── Person 2: Fase 2 (Frontend Setup)
└── Person 3: Help review & planning

Week 2:
├── Person 1: Fase 3 (CRUD API)
├── Person 2: Fase 4 (UI Components)
├── Person 3: Prepare Fase 5
└── Person 4: Prepare Fase 6

Week 3:
├── Person 1 & 2: Fase 5 (Filtering)
├── Person 3 & 4: Fase 6 (Dashboard)
└── Person 5: Testing & Documentation

Week 4:
└── All: Fase 7 (Integration & Polish)
```

## 🎯 Success Metrics

### Per Fase:
- [ ] All tasks completed
- [ ] Code reviewed dan approved
- [ ] PR merged ke main
- [ ] Documentation updated
- [ ] No breaking changes

### Overall Project:
- [ ] All 7 phases completed
- [ ] 100% features working
- [ ] Minimal 5 contributors
- [ ] Clean git history
- [ ] Complete documentation

---

## 💡 Tips untuk Success

1. **Start Early**: Jangan tunggu deadline
2. **Communicate**: Update tim tentang progress dan blocker
3. **Review Others**: Help review PR orang lain
4. **Test Thoroughly**: Test perubahan Anda sebelum PR
5. **Ask Questions**: Jangan stuck sendiri terlalu lama
6. **Small Commits**: Commit often dengan message yang jelas
7. **Stay Organized**: Use todo list dan project board

---

**Ready to start?** Pilih fase dan mulai berkontribusi! 🚀

Lihat [KOLABORASI.md](./KOLABORASI.md) untuk detail Git workflow.
