# Panduan Edit System dengan Role-Based Approval

## 📋 Daftar Isi
1. [Fitur Edit Utama](#fitur-edit-utama)
2. [Alur Persetujuan](#alur-persetujuan)
3. [Contoh Penggunaan](#contoh-penggunaan)
4. [Troubleshooting](#troubleshooting)

---

## 🎯 Fitur Edit Utama

### 1. **User Management** (`/admin/user-management`)
Edit data pengguna dengan persetujuan berbasis role.

#### Field yang dapat diubah:
- ✏️ **Nama Lengkap** - Nama pengguna (min 3 karakter)
- 👤 **Role** - Peran/posisi pengguna (Super Admin, Operator SID, dll)
- ⚡ **Status** - Aktif/Nonaktif

#### Cara Menggunakan:
1. Klik tombol **Edit** (icon pensil kuning) pada baris pengguna yang ingin diedit
2. Dialog edit akan membuka dengan preview nama lama → nama baru
3. Ubah nama, role, atau status sesuai kebutuhan
4. Klik **"Simpan Perubahan"** atau **"Ajukan Perubahan"** tergantung role Anda

---

### 2. **Role Management** (`/admin/role-management`)
Edit data role dengan tracking lengkap.

#### Field yang dapat diubah:
- 🔹 **Nama Role** - Nama peran (Super Admin, Operator, dll)
- 📝 **Deskripsi** - Penjelasan fungsi role
- 🔓 **Hak Akses** - Jumlah modul yang dapat diakses

---

## 🔄 Alur Persetujuan

### Untuk **SUPER ADMIN** 🔴
```
Edit → Klik Simpan Perubahan 
  ↓
✅ INSTAN (Status: Selesai)
  ↓
Tampil Langsung di Sistem
```

**Karakteristik:**
- Perubahan disimpan dengan status **"Selesai"**
- Data langsung tampil di sistem tanpa perlu approval
- Digunakan untuk admin/super admin yang memiliki wewenang penuh

---

### Untuk **OPERATOR SID** 🔵
```
Edit → Klik Ajukan Perubahan
  ↓
⏳ PENDING (Status: Baru)
  ↓
Menunggu Persetujuan Super Admin
  ↓
Super Admin Klik "✅ Setujui"
  ↓
✅ Disetujui
  ↓
Tampil di Sistem
```

**Karakteristik:**
- Perubahan disimpan dengan status **"Baru"** (pending)
- Ditampilkan sebagai **"Perubahan Menunggu Persetujuan"** di tabel
- Super Admin dapat melihat preview lengkap sebelum approve/reject
- Super Admin bisa **"✅ Setujui"** atau **"❌ Tolak"**

---

## 📝 Contoh Penggunaan

### Scenario 1: Super Admin Edit User
```
👤 Login sebagai: Super Admin
Nama: Dr. Ahmad Surya
Tindakan: Ganti nama menjadi "Fauzan"

1. Klik Edit pada baris Dr. Ahmad Surya
2. Ubah "Dr. Ahmad Surya" → "Fauzan"
3. Klik "✅ Simpan Perubahan (Instan)"
4. ✅ Toast: "Berhasil! Data user diubah langsung (Instan)"
5. Langsung tampil di tabel: Fauzan (tanpa approval)
```

### Scenario 2: Operator Edit User (Perlu Approval)
```
👤 Login sebagai: Operator SID
Nama: Dr. Ahmad Surya
Tindakan: Ganti nama menjadi "Fauzan"

1. Klik Edit pada baris Dr. Ahmad Surya
2. Ubah "Dr. Ahmad Surya" → "Fauzan"
3. Klik "📤 Ajukan Perubahan"
4. ⏳ Toast: "Perubahan diajukan! Menunggu persetujuan dari Super Admin..."
5. Di tabel, muncul box kuning: "⏳ Perubahan Menunggu Persetujuan"
   - Preview: Nama Baru: "Fauzan"
   - Diajukan oleh: Operator SID
6. Super Admin login dan melihat box yang sama
7. Super Admin klik "✅ Setujui"
8. ✅ Toast: "Berhasil menyetujui usulan perubahan..."
9. Nama berubah menjadi "Fauzan" dan pending box hilang
```

---

## 🔐 Status Perubahan

### Status Database
| Status | Artinya | Tampilan | Action |
|--------|---------|---------|--------|
| **Selesai** | Perubahan sudah disetujui & aktif | Normal | Tidak ada action |
| **Baru** | Perubahan pending approval | ⏳ Kotak Kuning | Super Admin bisa Setujui/Tolak |

---

## 📊 Tampilan Pending Changes

Ketika ada perubahan pending dari Operator, Super Admin akan melihat:

```
┌─────────────────────────────────────────────────┐
│ ⏳ Perubahan Menunggu Persetujuan                │
├─────────────────────────────────────────────────┤
│ 📝 Nama Baru:      "Fauzan"                     │
│ 👤 Role Baru:      "Operator SID"               │
│ ⚡ Status Baru:    "Aktif"                      │
├─────────────────────────────────────────────────┤
│ 📤 Diajukan oleh:   Operator SID                │
├─────────────────────────────────────────────────┤
│  [✅ Setujui]  [❌ Tolak]                       │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Troubleshooting

### Problem: Edit button tidak merespons
**Solusi:**
- Refresh halaman (Ctrl+R)
- Pastikan Anda sudah login
- Cek console untuk error messages

### Problem: Perubahan tidak tampil
**Solusi:**
- Tunggu 2-3 detik (auto-refresh setiap 2.5s)
- Jika Super Admin: perubahan harusnya instan
- Jika Operator: perubahan butuh disetujui Super Admin dulu

### Problem: Tidak bisa melihat pending changes
**Solusi:**
- Login sebagai Super Admin (hanya Super Admin yang bisa lihat tombol Setujui)
- Cek tabel ada highlight kuning pada nama user

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ CLIENT (Next.js)                                            │
│                                                             │
│  1. User klik Edit                                          │
│     ↓                                                       │
│  2. Dialog Edit muncul                                      │
│     ↓                                                       │
│  3. User ubah data                                          │
│     ↓                                                       │
│  4. Klik "Simpan/Ajukan"                                   │
│     ↓                                                       │
│  5. POST /api/module-records                               │
│     (dengan status: "Selesai" atau "Baru")                │
│                      │                                      │
│                      ↓                                      │
│        ┌──────────────────────────────┐                   │
│        │ DATABASE                     │                   │
│        │ ModuleRecord Table           │                   │
│        │                              │                   │
│        │ - status: "Selesai" (admin)  │                   │
│        │ - status: "Baru" (operator)  │                   │
│        └──────────────────────────────┘                   │
│                      │                                      │
│                      ↓                                      │
│  6. GET /api/module-records (auto-refresh 2.5s)           │
│     ↓                                                       │
│  7. Process records (dari oldest ke newest)               │
│     - Jika status "Selesai": apply change                 │
│     - Jika status "Baru": show as pending                 │
│     ↓                                                       │
│  8. Update UI dengan data final                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 API Reference

### POST /api/module-records (Create/Save Edit)
```json
{
  "modulePath": "/admin/user-management",
  "moduleName": "User Management",
  "title": "Fauzan",
  "category": "UserEdit",
  "valueText": "admin_super",
  "description": "{\"nama\": \"Fauzan\", \"role\": \"Super Admin\", \"status\": \"Aktif\", \"requestedBy\": \"Super Admin\"}",
  "status": "Selesai"  // atau "Baru" untuk Operator
}
```

### PATCH /api/module-records (Approve Change)
```json
{
  "id": "modrec_1234567890_abc12345",
  "modulePath": "/admin/user-management",
  "title": "Fauzan",
  "category": "UserEdit",
  "valueText": "admin_super",
  "description": "{...}",
  "status": "Selesai"  // Ubah dari "Baru" ke "Selesai"
}
```

---

## ✅ Checklist Implementasi

- ✅ Edit User Management
  - ✅ Nama Lengkap
  - ✅ Role
  - ✅ Status
  - ✅ Real-time pending display
  - ✅ Admin approval system

- ✅ Edit Role Management
  - ✅ Nama Role
  - ✅ Deskripsi
  - ✅ Hak Akses tracking

- ✅ Visual Feedback
  - ✅ Toast notifications
  - ✅ Pending changes highlight
  - ✅ Role-specific info in dialog

---

## 🚀 Next Steps

Untuk menambahkan edit ke modul lain:
1. Buat Edit Button dengan `onClick` handler
2. Buat Edit Dialog/Form
3. POST ke `/api/module-records` dengan `status: simulatedRole === 'admin' ? 'Selesai' : 'Baru'`
4. Load database changes dengan `loadDatabaseRecords()`
5. Show pending changes untuk role yang perlu approval

---

**Last Updated:** 2026-06-12
**Version:** 1.0
