# Struktur Project - Expense Tracker

Panduan lengkap struktur folder dan file organization untuk proyek Expense Tracker.

## 📂 Struktur Keseluruhan

```
qodr-expense-tracker-collaboration-project/
├── backend/                 # Backend Express.js
├── frontend/                # Frontend Vite
├── prd/                     # Product Requirements Documents
├── .gitignore              # Git ignore rules
└── README.md               # Project overview
```

---

## 🔙 Backend Structure

### Struktur Lengkap

```
backend/
├── server.js               # Entry point, Express app setup
├── package.json            # Dependencies & scripts
├── package-lock.json       # Lock file (auto-generated)
├── .env                    # Environment variables (not committed)
├── .env.example           # Template untuk .env
├── .gitignore             # Backend gitignore
│
├── database/              # Database related files
│   ├── pool.js            # PostgreSQL connection pool
│   ├── schema.sql         # Database schema & migrations
│   └── testConnection.js  # Test database connection
│
├── models/                # Database models/queries
│   ├── expenseModel.js    # Expense queries
│   └── categoryModel.js   # Category queries (optional)
│
├── routes/                # Route definitions
│   ├── index.js           # Main router
│   └── expenses.js        # Expense routes
│
├── controllers/           # Business logic
│   └── expenseController.js
│
├── middleware/            # Express middleware
│   ├── errorHandler.js    # Global error handler
│   └── validation.js      # Request validation
│
└── utils/                 # Utility functions
    └── validators.js      # Validation helpers
```

### File Responsibilities

#### `server.js` - Main Entry Point
```javascript
// Setup Express app
// Configure middleware (CORS, JSON parser)
// Connect routes
// Error handling
// Start server
```

**Contoh:**
```javascript
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### `routes/expenses.js` - Expense Routes
```javascript
// Define all expense-related routes
// Connect to controllers
// Apply middleware (validation, etc)
```

**Contoh:**
```javascript
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { validateExpense } = require('../middleware/validation');

router.get('/', expenseController.getAllExpenses);
router.get('/stats', expenseController.getStats);
router.get('/:id', expenseController.getExpenseById);
router.post('/', validateExpense, expenseController.createExpense);
router.put('/:id', validateExpense, expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
```

#### `models/expenseModel.js` - Database Queries
```javascript
// All SQL queries for expenses
// Use parameterized queries
// Return clean data
```

**Contoh:**
```javascript
const pool = require('../database/pool');

exports.getAllExpenses = async (filters = {}) => {
  let query = 'SELECT * FROM expenses WHERE 1=1';
  const params = [];
  let paramCount = 1;

  // Apply filters with parameterized queries
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

exports.createExpense = async (expenseData) => {
  const { deskripsi, jumlah, kategori, tanggal } = expenseData;
  const result = await pool.query(
    `INSERT INTO expenses (deskripsi, jumlah, kategori, tanggal)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [deskripsi, jumlah, kategori, tanggal]
  );
  return result.rows[0];
};
```

#### `controllers/expenseController.js` - Business Logic
```javascript
// Handle request/response
// Call model functions
// Format response
// Error handling
```

**Contoh:**
```javascript
const expenseModel = require('../models/expenseModel');

exports.getAllExpenses = async (req, res, next) => {
  try {
    const { kategori, month } = req.query;
    const expenses = await expenseModel.getAllExpenses({ kategori, month });

    res.json({
      success: true,
      data: expenses,
      count: expenses.length
    });
  } catch (error) {
    next(error);
  }
};

exports.createExpense = async (req, res, next) => {
  try {
    const expense = await expenseModel.createExpense(req.body);

    res.status(201).json({
      success: true,
      data: expense,
      message: 'Expense created successfully'
    });
  } catch (error) {
    next(error);
  }
};
```

#### `database/pool.js` - Connection Pool
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

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL');
});

module.exports = pool;
```

#### `database/schema.sql` - Database Schema
```sql
CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  deskripsi VARCHAR(200) NOT NULL,
  jumlah INTEGER NOT NULL CHECK (jumlah > 0),
  kategori VARCHAR(50) NOT NULL,
  tanggal DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_expenses_kategori ON expenses(kategori);
CREATE INDEX IF NOT EXISTS idx_expenses_tanggal ON expenses(tanggal);
```

#### `.env` - Environment Variables
```
# Server
PORT=3000
NODE_ENV=development

# Database
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_tracker
```

**PENTING**: Jangan commit file `.env` ke Git!

#### `.env.example` - Template Environment Variables
```
# Server
PORT=3000
NODE_ENV=development

# Database
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432
DB_NAME=expense_tracker
```

**Catatan**: File ini di-commit ke Git sebagai template untuk developer lain.

#### `package.json` - Dependencies & Scripts
```json
{
  "name": "expense-tracker-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 🎨 Frontend Structure

### Struktur Lengkap

```
frontend/
├── index.html              # Main HTML file
├── package.json            # Dependencies & scripts
├── package-lock.json       # Lock file (auto-generated)
├── vite.config.js         # Vite configuration
├── .gitignore             # Frontend gitignore
│
└── src/
    ├── main.js            # Entry point
    ├── style.css          # Global styles
    │
    ├── components/        # UI Components
    │   ├── Layout.js      # Main layout
    │   ├── Dashboard.js   # Dashboard component
    │   ├── ExpenseForm.js # Form component
    │   ├── ExpenseList.js # List component
    │   ├── ExpenseItem.js # Single item
    │   ├── FilterBar.js   # Filter component
    │   ├── StatCard.js    # Stat display
    │   └── CategoryBreakdown.js
    │
    ├── api/               # API calls
    │   └── expenseApi.js  # Expense API functions
    │
    ├── config/            # Configuration
    │   └── api.js         # API config
    │
    ├── utils/             # Utility functions
    │   ├── helpers.js     # Helper functions
    │   └── formatters.js  # Format data (currency, date)
    │
    └── styles/            # Component-specific styles
        ├── dashboard.css
        ├── expense.css
        └── form.css
```

### File Responsibilities

#### `index.html` - Main HTML
```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Expense Tracker</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

#### `src/main.js` - Entry Point
```javascript
// Import styles
// Import components
// Initialize app
// Render to DOM
```

**Contoh:**
```javascript
import './style.css';
import { Layout } from './components/Layout.js';
import { Dashboard } from './components/Dashboard.js';
import { ExpenseList } from './components/ExpenseList.js';

// Initialize app
function initApp() {
  const app = document.getElementById('app');

  const layout = new Layout();
  app.innerHTML = layout.render();

  // Initialize components
  const dashboard = new Dashboard();
  const expenseList = new ExpenseList();

  dashboard.init();
  expenseList.init();
}

// Start app when DOM ready
document.addEventListener('DOMContentLoaded', initApp);
```

#### `src/components/ExpenseList.js` - Component Example
```javascript
// Component class
// Render method
// Event handlers
// State management
```

**Contoh:**
```javascript
import { fetchExpenses, deleteExpense } from '../api/expenseApi.js';
import { ExpenseItem } from './ExpenseItem.js';

export class ExpenseList {
  constructor() {
    this.expenses = [];
    this.container = null;
  }

  async init() {
    this.container = document.getElementById('expense-list');
    await this.loadExpenses();
    this.render();
    this.attachEventListeners();
  }

  async loadExpenses() {
    try {
      const response = await fetchExpenses();
      this.expenses = response.data;
    } catch (error) {
      console.error('Error loading expenses:', error);
    }
  }

  render() {
    if (!this.container) return;

    const html = `
      <div class="expense-list">
        <h2>Daftar Pengeluaran</h2>
        <div class="expense-items">
          ${this.expenses.map(expense =>
            new ExpenseItem(expense).render()
          ).join('')}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
  }

  attachEventListeners() {
    // Event delegation for delete buttons
    this.container.addEventListener('click', async (e) => {
      if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        await this.handleDelete(id);
      }
    });
  }

  async handleDelete(id) {
    if (!confirm('Hapus pengeluaran ini?')) return;

    try {
      await deleteExpense(id);
      await this.loadExpenses();
      this.render();
    } catch (error) {
      alert('Gagal menghapus pengeluaran');
    }
  }
}
```

#### `src/api/expenseApi.js` - API Functions
```javascript
// All API calls
// Error handling
// Response formatting
```

**Contoh:**
```javascript
import { API_BASE_URL } from '../config/api.js';

export async function fetchExpenses(filters = {}) {
  const queryParams = new URLSearchParams(filters);
  const url = `${API_BASE_URL}/expenses?${queryParams}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch expenses');
  }

  return response.json();
}

export async function createExpense(expenseData) {
  const response = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    throw new Error('Failed to create expense');
  }

  return response.json();
}

export async function updateExpense(id, expenseData) {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseData),
  });

  if (!response.ok) {
    throw new Error('Failed to update expense');
  }

  return response.json();
}

export async function deleteExpense(id) {
  const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete expense');
  }

  return response.json();
}

export async function fetchStats(month) {
  const url = month
    ? `${API_BASE_URL}/expenses/stats?month=${month}`
    : `${API_BASE_URL}/expenses/stats`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }

  return response.json();
}
```

#### `src/config/api.js` - API Configuration
```javascript
export const API_BASE_URL = 'http://localhost:3000/api';

export const ENDPOINTS = {
  EXPENSES: '/expenses',
  STATS: '/expenses/stats',
};
```

#### `src/utils/formatters.js` - Utility Functions
```javascript
// Format currency
export function formatCurrency(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

// Format date for input
export function formatDateForInput(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}
```

#### `package.json` - Frontend Dependencies
```json
{
  "name": "expense-tracker-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

#### `vite.config.js` - Vite Config
```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
});
```

---

## 🔒 .gitignore Files

### Backend .gitignore
```
# Dependencies
node_modules/

# Environment variables
.env
.env.local

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

### Frontend .gitignore
```
# Dependencies
node_modules/

# Build output
dist/

# Logs
*.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Environment
.env
.env.local
```

---

## 📝 Naming Conventions

### Files & Folders
- **Folders**: `kebab-case` (contoh: `expense-tracker`, `api-calls`)
- **JS Files**: `camelCase.js` (contoh: `expenseApi.js`, `pool.js`)
- **Component Files**: `PascalCase.js` (contoh: `ExpenseList.js`, `Dashboard.js`)
- **CSS Files**: `kebab-case.css` (contoh: `expense-list.css`)

### Code
- **Variables**: `camelCase` (contoh: `totalExpense`, `userName`)
- **Constants**: `UPPER_SNAKE_CASE` (contoh: `API_BASE_URL`, `MAX_ITEMS`)
- **Functions**: `camelCase` (contoh: `fetchExpenses()`, `calculateTotal()`)
- **Classes**: `PascalCase` (contoh: `ExpenseManager`, `DataValidator`)

---

## 🎯 Best Practices

### 1. Separation of Concerns
- **Routes**: Hanya define endpoints
- **Controllers**: Hanya business logic
- **Utils**: Hanya helper functions
- **Components**: Hanya UI logic

### 2. DRY (Don't Repeat Yourself)
- Extract fungsi yang dipakai berulang ke `utils/`
- Buat reusable components

### 3. Single Responsibility
- Satu file, satu tanggung jawab
- Satu function, satu tugas

### 4. Consistent Structure
- Semua components punya struktur yang sama
- Semua API calls di satu tempat

### 5. Clear Naming
- Nama file dan function harus jelas
- Hindari abbreviation yang tidak jelas

---

## 📦 Module System

### Backend (CommonJS)
```javascript
// Export
module.exports = { function1, function2 };

// Import
const { function1 } = require('./module');
```

### Frontend (ES Modules)
```javascript
// Export
export function myFunction() {}
export const myVariable = 10;

// Import
import { myFunction, myVariable } from './module.js';
```

---

## 🧪 Recommended Extensions (VS Code)

### Backend
- ESLint
- Prettier
- Thunder Client (API testing)

### Frontend
- Live Server (atau gunakan Vite dev server)
- Auto Rename Tag
- CSS Peek

---

## 💡 Tips

1. **Keep it Simple**: Jangan over-engineer di awal
2. **Consistent**: Ikuti struktur yang sudah ada
3. **Document**: Tambahkan comment di bagian yang kompleks
4. **Test**: Test perubahan sebelum commit
5. **Communicate**: Diskusikan perubahan struktur dengan tim

---

**Happy Organizing!** 📁

Lihat [FASE.md](./FASE.md) untuk mulai coding!
