# API Documentation - Expense Tracker

Dokumentasi lengkap untuk REST API Expense Tracker.

## 📍 Base URL

```
http://localhost:3000/api
```

## 🔧 Response Format

Semua response menggunakan format JSON.

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE"
  }
}
```

## 📊 Data Models

### Expense Object

```javascript
{
  "id": "string",              // Unique ID (UUID atau auto-increment)
  "deskripsi": "string",       // Deskripsi pengeluaran
  "jumlah": number,            // Nominal dalam Rupiah
  "kategori": "string",        // Kategori pengeluaran
  "tanggal": "YYYY-MM-DD",     // Tanggal pengeluaran
  "createdAt": "ISO 8601",     // Timestamp dibuat
  "updatedAt": "ISO 8601"      // Timestamp terakhir update
}
```

### Kategori yang Valid
- `Makanan & Minuman`
- `Transportasi`
- `Belanja`
- `Tagihan`
- `Hiburan`
- `Kesehatan`
- `Lain-lain`

---

## 🛣️ Endpoints

### 1. Get All Expenses

Mengambil semua data pengeluaran dengan optional filtering.

**Endpoint:**
```
GET /api/expenses
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| kategori | string | No | Filter berdasarkan kategori |
| month | string | No | Filter berdasarkan bulan (format: YYYY-MM) |
| startDate | string | No | Filter dari tanggal (format: YYYY-MM-DD) |
| endDate | string | No | Filter sampai tanggal (format: YYYY-MM-DD) |

**Request Example:**
```bash
# Get all expenses
GET /api/expenses

# Filter by kategori
GET /api/expenses?kategori=Makanan%20%26%20Minuman

# Filter by month
GET /api/expenses?month=2025-11

# Filter by date range
GET /api/expenses?startDate=2025-11-01&endDate=2025-11-30

# Multiple filters
GET /api/expenses?kategori=Transportasi&month=2025-11
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "deskripsi": "Makan siang di warteg",
      "jumlah": 25000,
      "kategori": "Makanan & Minuman",
      "tanggal": "2025-11-22",
      "createdAt": "2025-11-22T10:30:00Z",
      "updatedAt": "2025-11-22T10:30:00Z"
    },
    {
      "id": "2",
      "deskripsi": "Bensin motor",
      "jumlah": 50000,
      "kategori": "Transportasi",
      "tanggal": "2025-11-22",
      "createdAt": "2025-11-22T11:00:00Z",
      "updatedAt": "2025-11-22T11:00:00Z"
    }
  ],
  "count": 2
}
```

---

### 2. Get Single Expense

Mengambil detail satu pengeluaran berdasarkan ID.

**Endpoint:**
```
GET /api/expenses/:id
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | ID expense yang ingin diambil |

**Request Example:**
```bash
GET /api/expenses/1
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "deskripsi": "Makan siang di warteg",
    "jumlah": 25000,
    "kategori": "Makanan & Minuman",
    "tanggal": "2025-11-22",
    "createdAt": "2025-11-22T10:30:00Z",
    "updatedAt": "2025-11-22T10:30:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Expense not found",
    "code": "EXPENSE_NOT_FOUND"
  }
}
```

---

### 3. Create Expense

Menambahkan pengeluaran baru.

**Endpoint:**
```
POST /api/expenses
```

**Request Body:**
```json
{
  "deskripsi": "string",    // Required, min 3 characters
  "jumlah": number,         // Required, must be positive
  "kategori": "string",     // Required, must be valid kategori
  "tanggal": "YYYY-MM-DD"   // Required, valid date format
}
```

**Request Example:**
```bash
POST /api/expenses
Content-Type: application/json

{
  "deskripsi": "Beli kopi",
  "jumlah": 15000,
  "kategori": "Makanan & Minuman",
  "tanggal": "2025-11-22"
}
```

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "3",
    "deskripsi": "Beli kopi",
    "jumlah": 15000,
    "kategori": "Makanan & Minuman",
    "tanggal": "2025-11-22",
    "createdAt": "2025-11-22T14:30:00Z",
    "updatedAt": "2025-11-22T14:30:00Z"
  },
  "message": "Expense created successfully"
}
```

**Validation Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": {
      "deskripsi": "Deskripsi is required",
      "jumlah": "Jumlah must be a positive number"
    }
  }
}
```

---

### 4. Update Expense

Mengupdate pengeluaran yang sudah ada.

**Endpoint:**
```
PUT /api/expenses/:id
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | ID expense yang ingin diupdate |

**Request Body:**
```json
{
  "deskripsi": "string",    // Optional
  "jumlah": number,         // Optional
  "kategori": "string",     // Optional
  "tanggal": "YYYY-MM-DD"   // Optional
}
```

**Request Example:**
```bash
PUT /api/expenses/1
Content-Type: application/json

{
  "deskripsi": "Makan siang di restoran",
  "jumlah": 50000
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "deskripsi": "Makan siang di restoran",
    "jumlah": 50000,
    "kategori": "Makanan & Minuman",
    "tanggal": "2025-11-22",
    "createdAt": "2025-11-22T10:30:00Z",
    "updatedAt": "2025-11-22T15:00:00Z"
  },
  "message": "Expense updated successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Expense not found",
    "code": "EXPENSE_NOT_FOUND"
  }
}
```

---

### 5. Delete Expense

Menghapus pengeluaran berdasarkan ID.

**Endpoint:**
```
DELETE /api/expenses/:id
```

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | ID expense yang ingin dihapus |

**Request Example:**
```bash
DELETE /api/expenses/1
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Expense deleted successfully",
  "data": {
    "id": "1"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Expense not found",
    "code": "EXPENSE_NOT_FOUND"
  }
}
```

---

### 6. Get Statistics

Mengambil statistik dan summary pengeluaran.

**Endpoint:**
```
GET /api/expenses/stats
```

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| month | string | No | Filter stats berdasarkan bulan (YYYY-MM) |

**Request Example:**
```bash
# All time stats
GET /api/expenses/stats

# Stats for specific month
GET /api/expenses/stats?month=2025-11
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total": 5000000,
    "count": 25,
    "average": 200000,
    "byCategory": {
      "Makanan & Minuman": {
        "total": 2000000,
        "count": 10,
        "percentage": 40
      },
      "Transportasi": {
        "total": 1500000,
        "count": 8,
        "percentage": 30
      },
      "Lain-lain": {
        "total": 1500000,
        "count": 7,
        "percentage": 30
      }
    },
    "byMonth": {
      "2025-11": {
        "total": 3000000,
        "count": 15
      },
      "2025-10": {
        "total": 2000000,
        "count": 10
      }
    }
  }
}
```

---

## ❌ Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| EXPENSE_NOT_FOUND | 404 | Expense dengan ID tersebut tidak ditemukan |
| VALIDATION_ERROR | 400 | Data input tidak valid |
| INVALID_KATEGORI | 400 | Kategori tidak valid |
| INVALID_DATE | 400 | Format tanggal tidak valid |
| SERVER_ERROR | 500 | Internal server error |

---

## 🧪 Testing dengan cURL

### Create Expense
```bash
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "deskripsi": "Test expense",
    "jumlah": 100000,
    "kategori": "Makanan & Minuman",
    "tanggal": "2025-11-22"
  }'
```

### Get All Expenses
```bash
curl http://localhost:3000/api/expenses
```

### Get Single Expense
```bash
curl http://localhost:3000/api/expenses/1
```

### Update Expense
```bash
curl -X PUT http://localhost:3000/api/expenses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "jumlah": 150000
  }'
```

### Delete Expense
```bash
curl -X DELETE http://localhost:3000/api/expenses/1
```

### Get Statistics
```bash
curl http://localhost:3000/api/expenses/stats
```

---

## 🧪 Testing dengan Postman

### Setup Collection

1. **Create New Collection**: "Expense Tracker API"
2. **Set Base URL Variable**: `{{baseUrl}}` = `http://localhost:3000/api`

### Example Requests

**1. Create Expense**
- Method: POST
- URL: `{{baseUrl}}/expenses`
- Body (JSON):
```json
{
  "deskripsi": "Postman Test",
  "jumlah": 50000,
  "kategori": "Makanan & Minuman",
  "tanggal": "2025-11-22"
}
```

**2. Get All**
- Method: GET
- URL: `{{baseUrl}}/expenses`

**3. Filter by Kategori**
- Method: GET
- URL: `{{baseUrl}}/expenses?kategori=Transportasi`

---

## 📝 Validation Rules

### Deskripsi
- Required
- String
- Min length: 3 characters
- Max length: 200 characters

### Jumlah
- Required
- Number
- Must be positive (> 0)
- Integer (tidak ada decimal)

### Kategori
- Required
- String
- Must be one of valid categories:
  - Makanan & Minuman
  - Transportasi
  - Belanja
  - Tagihan
  - Hiburan
  - Kesehatan
  - Lain-lain

### Tanggal
- Required
- String
- Format: YYYY-MM-DD
- Must be valid date
- Cannot be future date

---

## 🔒 Future: Authentication (Optional)

Untuk fase lanjutan, bisa ditambahkan authentication:

```javascript
// Header
Authorization: Bearer <token>

// Protected endpoints
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

---

## 💡 Implementation Tips

### 1. Database Connection Pool

```javascript
// database/pool.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  process.exit(-1);
});

module.exports = pool;
```

### 2. Parameterized Queries (Prevent SQL Injection)

```javascript
// ❌ JANGAN seperti ini (vulnerable to SQL injection)
const query = `SELECT * FROM expenses WHERE id = ${req.params.id}`;

// ✅ GUNAKAN parameterized queries
const query = 'SELECT * FROM expenses WHERE id = $1';
const values = [req.params.id];
const result = await pool.query(query, values);
```

### 3. Transaction untuk Multiple Operations

```javascript
// Untuk operasi yang membutuhkan atomicity
const client = await pool.connect();
try {
  await client.query('BEGIN');

  await client.query('INSERT INTO expenses (...) VALUES (...)', [...]);
  await client.query('UPDATE categories SET count = count + 1 WHERE ...', [...]);

  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
}
```

### 4. Date Validation

```javascript
function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regex)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
}
```

### 5. Error Handler Middleware

```javascript
// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || 'Internal Server Error',
      code: err.code || 'SERVER_ERROR'
    }
  });
}

module.exports = errorHandler;
```

---

**Happy Coding!** 🚀

Lihat [FASE.md](./FASE.md) untuk pembagian task implementasi.
