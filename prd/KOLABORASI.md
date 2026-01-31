# Panduan Kolaborasi Tim - Expense Tracker

Panduan lengkap untuk bekerja sama dalam satu repository menggunakan Git dan GitHub.

## 🎯 Tujuan Kolaborasi

Dalam proyek ini, Anda akan belajar:
- Bekerja dengan Git workflow profesional
- Melakukan code review
- Mengelola konflik kode
- Berkomunikasi efektif dalam tim
- Mengikuti best practices development

## 👥 Struktur Tim

### Roles (Optional)
1. **Tech Lead** - Koordinator teknis, review final
2. **Backend Developers (2-3 orang)** - Fokus ke API dan server
3. **Frontend Developers (2-3 orang)** - Fokus ke UI dan client-side
4. **Full-Stack** - Membantu kedua sisi

**Catatan**: Semua anggota bisa berkontribusi di semua bagian, roles hanya untuk memudahkan koordinasi.

## 🌲 Git Workflow

### Branch Strategy

#### Main Branches
```
main (atau master)
└── Branch utama, selalu stable dan production-ready
```

#### Development Branches
```
feature/nama-fitur
├── feature/add-expense-form
├── feature/expense-list
├── feature/filter-by-category
└── feature/dashboard-stats

bugfix/nama-bug
├── bugfix/fix-date-format
└── bugfix/fix-delete-button
```

### Naming Convention untuk Branch

**Format**: `<type>/<deskripsi-singkat>`

**Type:**
- `feature/` - Fitur baru
- `bugfix/` - Perbaikan bug
- `hotfix/` - Perbaikan urgent
- `refactor/` - Refactoring kode
- `docs/` - Perubahan dokumentasi

**Contoh:**
```bash
feature/add-expense-api
feature/dashboard-ui
bugfix/fix-cors-error
refactor/improve-api-structure
docs/update-readme
```

## 🔄 Workflow Step-by-Step

### 1. Ambil Task dari Fase

Lihat [FASE.md](./FASE.md) dan pilih task yang tersedia.

### 2. Update Local Repository

```bash
# Pastikan di branch main
git checkout main

# Pull perubahan terbaru dari remote
git pull origin main
```

### 3. Buat Branch Baru

```bash
# Buat dan pindah ke branch baru
git checkout -b feature/nama-fitur

# Contoh:
git checkout -b feature/add-expense-form
```

### 4. Coding!

Kerjakan task Anda. Tips:
- Commit secara berkala, jangan tunggu selesai semua
- Test perubahan Anda sebelum commit
- Pastikan kode berjalan tanpa error

### 5. Commit Perubahan

```bash
# Cek file yang berubah
git status

# Tambahkan file ke staging
git add <nama-file>
# Atau tambahkan semua file
git add .

# Commit dengan message yang jelas
git commit -m "feat: add expense form component"
```

### 6. Push ke Remote

```bash
# Push branch ke GitHub
git push origin feature/nama-fitur

# Contoh:
git push origin feature/add-expense-form
```

### 7. Buat Pull Request (PR)

1. Buka repository di GitHub
2. Klik "Pull requests" > "New pull request"
3. Base: `main` ← Compare: `feature/nama-fitur`
4. Isi PR Template:
   - **Title**: Deskripsi singkat perubahan
   - **Description**: Apa yang diubah dan mengapa
   - **Related Issue**: Link ke issue (jika ada)
5. Request reviewer (minimal 1 orang)
6. Klik "Create pull request"

### 8. Code Review

**Sebagai Author:**
- Tanggapi komentar reviewer dengan sopan
- Lakukan perubahan jika diminta
- Push perubahan ke branch yang sama

**Sebagai Reviewer:**
- Baca kode dengan teliti
- Berikan komentar konstruktif
- Approve jika kode sudah baik
- Request changes jika perlu perbaikan

### 9. Merge ke Main

Setelah diapprove:
1. Pastikan tidak ada conflict
2. Klik "Merge pull request"
3. Klik "Confirm merge"
4. Hapus branch (optional)

### 10. Update Local Repository

```bash
# Kembali ke main branch
git checkout main

# Pull perubahan terbaru
git pull origin main

# Hapus branch lokal yang sudah tidak dipakai
git branch -d feature/nama-fitur
```

## 📝 Commit Message Guidelines

### Format
```
<type>: <subject>

<body> (optional)
```

### Types
- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `refactor`: Refactoring kode
- `style`: Perubahan styling/formatting
- `docs`: Perubahan dokumentasi
- `test`: Menambah/memperbaiki test
- `chore`: Maintenance task

### Contoh Commit Messages yang Baik

```bash
✅ feat: add expense form with validation
✅ fix: resolve CORS error in API
✅ refactor: simplify expense calculation logic
✅ style: format code with prettier
✅ docs: update setup instructions
```

### Contoh Commit Messages yang Buruk

```bash
❌ update
❌ fix bug
❌ changes
❌ asdfghjkl
❌ done
```

### Tips Commit Message
1. Gunakan present tense ("add" bukan "added")
2. Jangan gunakan titik di akhir subject
3. Subject maksimal 50 karakter
4. Jelaskan "apa" dan "mengapa", bukan "bagaimana"

## 👀 Code Review Guidelines

### Untuk Reviewer

#### Yang Harus Dicek:
- ✅ Kode berjalan tanpa error
- ✅ Mengikuti struktur folder yang benar
- ✅ Naming variable/function jelas dan konsisten
- ✅ Tidak ada hardcoded values yang seharusnya di config
- ✅ Error handling sudah ada
- ✅ Kode mudah dibaca dan dipahami
- ✅ Tidak ada code duplication yang berlebihan

#### Cara Memberikan Feedback:
```
❌ Buruk: "Ini salah"
✅ Baik: "Mungkin lebih baik pakai const daripada let di sini karena valuenya tidak berubah"

❌ Buruk: "Code-mu jelek"
✅ Baik: "Saya rasa kita bisa extract logic ini ke fungsi terpisah supaya lebih reusable"
```

#### Template Komentar Review:
```markdown
**Positif:**
- Form validation sudah berfungsi dengan baik
- UI responsive di mobile

**Saran:**
- Mungkin tambahkan error handling untuk API call
- Variabel `x` bisa diganti nama jadi `totalExpenses` supaya lebih jelas

**Questions:**
- Kenapa pakai forEach daripada map di line 45?
```

### Untuk Author (Pembuat PR)

#### PR Template:
```markdown
## Deskripsi
Menambahkan form untuk input expense baru dengan validasi

## Perubahan
- Membuat komponen ExpenseForm
- Menambahkan validasi input
- Integrasi dengan API POST /api/expenses

## Testing
- [x] Form bisa submit data
- [x] Validasi berfungsi
- [x] Data tersimpan di database
- [x] UI responsive

## Screenshots (jika UI)
[Tambahkan screenshot]

## Notes
- Masih perlu tambahkan date picker yang lebih baik
```

## 🔥 Mengatasi Merge Conflict

### Kenapa Conflict Terjadi?
Conflict terjadi ketika 2 orang mengedit file yang sama di line yang sama.

### Cara Mengatasi Conflict:

#### Step 1: Pull Perubahan Terbaru
```bash
git checkout main
git pull origin main
git checkout feature/nama-fitur
git merge main
```

#### Step 2: Lihat File yang Conflict
```bash
git status
```

File yang conflict akan ditandai "both modified".

#### Step 3: Edit File yang Conflict

File akan berisi marker seperti ini:
```javascript
<<<<<<< HEAD
const port = 3000;
=======
const port = 5000;
>>>>>>> main
```

- `<<<<<<< HEAD` - Kode dari branch Anda
- `=======` - Pemisah
- `>>>>>>> main` - Kode dari branch main

#### Step 4: Pilih Kode yang Benar

Hapus marker dan pilih kode yang benar:
```javascript
// Setelah diperbaiki:
const port = 3000;
```

#### Step 5: Commit Hasil Resolve
```bash
git add .
git commit -m "resolve: merge conflict in config"
git push origin feature/nama-fitur
```

### Tips Menghindari Conflict:
1. Pull dari main secara rutin
2. Komunikasi dengan tim tentang file yang dikerjakan
3. Buat branch untuk task yang kecil dan spesifik
4. Jangan edit file yang sedang dikerjakan orang lain

## 🗣️ Komunikasi Tim

### Channel Komunikasi
1. **GitHub Issues** - Tracking bug dan task
2. **Pull Request Comments** - Diskusi tentang kode
3. **WhatsApp/Telegram** - Komunikasi cepat
4. **Weekly Sync** - Meeting rutin (optional)

### Best Practices Komunikasi:
- 📢 **Update progress** secara rutin
- 🆘 **Minta bantuan** jika stuck lebih dari 2 jam
- 📝 **Dokumentasikan** keputusan penting
- 🤝 **Respect** pendapat anggota lain
- ⏰ **Responsive** terhadap mention/request

### Template Update Progress:
```markdown
**Progress Update - [Nama]**
📅 Tanggal: 22 Nov 2025

✅ Selesai:
- Setup backend structure
- Implement GET /api/expenses

🔄 Sedang dikerjakan:
- POST /api/expenses endpoint

🚧 Blocker:
- Perlu diskusi validasi data format

📅 Next:
- Implement PUT dan DELETE endpoint
```

## 🎯 Best Practices Koding

### 1. Naming Conventions

#### JavaScript/Node.js
```javascript
// Variables & Functions: camelCase
const totalExpense = 1000;
function calculateTotal() {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:3000';

// Classes: PascalCase
class ExpenseManager {}

// Files: kebab-case
expense-form.js
expense-api.js
```

#### Folder Structure
```
kebab-case untuk folder:
components/
api/
utils/
```

### 2. Code Style

#### Indentation
- Gunakan 2 spaces (bukan tab)
- Konsisten di semua file

#### Quotes
```javascript
// Single quotes untuk string
const name = 'Expense Tracker';

// Template literals untuk interpolasi
const message = `Total: ${total}`;
```

#### Semicolons
```javascript
// Gunakan semicolon di akhir statement
const x = 10;
const y = 20;
```

### 3. File Organization

```javascript
// 1. Imports
import express from 'express';
import cors from 'cors';

// 2. Constants
const PORT = 3000;

// 3. Functions
function getExpenses() {}
function createExpense() {}

// 4. Exports
export { getExpenses, createExpense };
```

### 4. Error Handling

```javascript
// Selalu handle error
try {
  const data = await fetchExpenses();
  return data;
} catch (error) {
  console.error('Error fetching expenses:', error);
  throw error;
}
```

### 5. Comments

```javascript
// Good: Jelaskan WHY, bukan WHAT
// Calculate total because we need to show in dashboard
const total = expenses.reduce((sum, exp) => sum + exp.jumlah, 0);

// Bad: WHAT (sudah jelas dari kode)
// Loop through expenses and add jumlah
const total = expenses.reduce((sum, exp) => sum + exp.jumlah, 0);
```

## ⚠️ Common Pitfalls

### 1. Langsung Push ke Main
```bash
❌ JANGAN:
git checkout main
git add .
git commit -m "changes"
git push origin main

✅ LAKUKAN:
git checkout -b feature/my-feature
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature
# Lalu buat PR
```

### 2. Commit File yang Tidak Perlu
```bash
❌ JANGAN commit:
node_modules/
.env
.DS_Store
package-lock.json (biasanya)

✅ Pastikan ada .gitignore
```

### 3. Merge Tanpa Review
```bash
❌ JANGAN merge PR sendiri tanpa review
✅ Tunggu minimal 1 reviewer approve
```

### 4. Large Commit
```bash
❌ 1 commit dengan 50 file changes
✅ Beberapa commit kecil dengan perubahan logis
```

## 📊 Metrics Kolaborasi

### Indikator Tim yang Sehat:
- ✅ Setiap anggota punya minimal 3-5 PR
- ✅ PR direview dalam 24 jam
- ✅ Minimal 80% PR mendapat komentar review
- ✅ Konfllik diselesaikan dengan komunikasi
- ✅ Code style konsisten

## 🎓 Learning Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [How to Write Good Commit Messages](https://chris.beams.io/posts/git-commit/)
- [Code Review Best Practices](https://google.github.io/eng-practices/review/)
- [Resolving Merge Conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)

---

**Remember**: Kolaborasi yang baik adalah kunci kesuksesan proyek. Komunikasi, respect, dan saling membantu!

Lanjut ke [FASE.md](./FASE.md) untuk melihat pembagian task.
