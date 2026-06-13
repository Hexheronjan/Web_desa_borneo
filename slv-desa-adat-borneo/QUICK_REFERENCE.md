# 🎯 Quick Reference Card - Edit System

## Akses Fitur Edit

| Halaman | URL | Fitur Edit |
|---------|-----|-----------|
| **User Management** | `/admin/user-management` | Edit Nama, Role, Status (Approval) |
| **Role Management** | `/admin/role-management` | Edit Role, Deskripsi, Hak Akses |

---

## Tombol Aksi & Fungsi

### User Management Table

```
┌─────────────────────────────────────────────────────────────┐
│ Action Buttons pada setiap row:                             │
├─────────────────────────────────────────────────────────────┤
│ 👁️  Eye (Blue)      → View user details                    │
│ ✏️  Edit (Amber)    → Edit data (dengan approval flow)     │
│ 🗑️  Trash (Red)    → Delete user                          │
└─────────────────────────────────────────────────────────────┘
```

### Pending Changes Box

```
┌─────────────────────────────────────────────────────────────┐
│ Muncul ketika ada perubahan dari Operator pending approval: │
├─────────────────────────────────────────────────────────────┤
│ ✅ Setujui (Green)  → Approve changes (Admin only)         │
│ ❌ Tolak (Red)     → Reject changes (Admin only)            │
└─────────────────────────────────────────────────────────────┘
```

---

## Flow Chart Singkat

### Admin Edit User

```
┌─────────────────────────┐
│ Klik Edit               │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ Dialog Edit Muncul      │
│ (Admin Mode)            │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ Ubah Nama/Role/Status   │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ Klik "✅ Simpan         │
│ Perubahan (Instan)"     │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ ✅ Langsung tampil      │
│    di tabel             │
└─────────────────────────┘
```

### Operator Edit User

```
┌─────────────────────────┐
│ Klik Edit               │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ Dialog Edit Muncul      │
│ (Operator Mode)         │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ Ubah Nama/Role/Status   │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ Klik "📤 Ajukan         │
│ Perubahan"              │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ ⏳ Pending Box Muncul   │
│ (Kuning/Amber)          │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ Admin Klik "✅ Setujui" │
└────────┬────────────────┘
         ↓
┌─────────────────────────┐
│ ✅ Perubahan Diterapkan │
│    Pending Box Hilang   │
└─────────────────────────┘
```

---

## Keyboard Shortcut Equivalent

| Aksi | Keyboard | Mouse |
|------|----------|-------|
| Buka Edit | - | Click ✏️ |
| Simpan (Admin) | Enter | Click ✅ |
| Ajukan (Operator) | Enter | Click 📤 |
| Cancel | Esc | Click Batal |
| Setujui Pending | - | Click ✅ Setujui |
| Tolak Pending | - | Click ❌ Tolak |

---

## Status Codes & Meanings

```
┌──────────┬──────────────┬────────────────────────────────┐
│ Status   │ Display      │ Artinya                        │
├──────────┼──────────────┼────────────────────────────────┤
│ Selesai  │ Normal row   │ Approved & Applied             │
│          │              │ (Admin instant atau approval)  │
├──────────┼──────────────┼────────────────────────────────┤
│ Baru     │ Amber box    │ Pending approval (Operator req)│
│          │ ⏳           │ Tunggu Super Admin approve     │
└──────────┴──────────────┴────────────────────────────────┘
```

---

## Edit Dialog Info Box

### Untuk Admin (Green)
```
✅ Akses Super Admin - Perubahan INSTAN
Perubahan akan disimpan langsung dan segera tampil
di sistem tanpa approval.
```

### Untuk Operator (Amber)
```
⚠️ Akses Operator - Perubahan MENUNGGU PERSETUJUAN
Perubahan akan diajukan ke database dan harus disetujui
oleh Super Admin sebelum diterapkan ke sistem.
```

---

## Toast Notifications Cheat Sheet

| Tipe | Warna | Durasi | Contoh |
|------|-------|--------|--------|
| Success | 🟢 Green | 4s | ✅ Berhasil! Data user diubah |
| Info | 🔵 Blue | 4s | ⏳ Perubahan diajukan! |
| Error | 🔴 Red | 4s | ❌ Gagal mengajukan edit user |

---

## Common Scenarios

### Scenario 1: Admin Ingin Ubah Nama User

```bash
1. Buka User Management
2. Lihat "Dr. Ahmad Surya" di list
3. Klik Edit (pencil icon)
4. Clear "Dr. Ahmad Surya"
5. Type "Fauzan"
6. Klik "✅ Simpan Perubahan (Instan)"
7. ✅ Toast: Berhasil!
8. Nama berubah langsung jadi "Fauzan"
```

---

### Scenario 2: Operator Usul Perubahan, Admin Approve

```bash
OPERATOR:
1. Switch ke "🔵 Operator SID"
2. Edit user "Fauzan"
3. Change nama → "Ahmad"
4. Klik "📤 Ajukan Perubahan"
5. ⏳ Toast: Perubahan diajukan

ADMIN:
1. Switch ke "🔴 Super Admin"
2. Lihat Fauzan punya pending box kuning
3. Read preview di box (Nama Baru: Ahmad)
4. Klik "✅ Setujui"
5. ✅ Toast: Berhasil menyetujui
6. Nama berubah ke "Ahmad", box hilang
```

---

### Scenario 3: Approve Custom Role Edit

```bash
ADMIN:
1. Buka Role Management
2. Lihat daftar role
3. Klik Edit di role "Operator SID"
4. Edit deskripsi di form panel
5. ✏️ Toast: Edit role berhasil dicatat
```

---

## Troubleshooting Quick Fix

| Problem | Solution |
|---------|----------|
| Edit button tidak respond | Refresh page (F5) |
| Pending box tidak muncul | Tunggu 3 detik (auto-refresh) |
| Can't see Setujui button | Login as Admin 🔴 |
| Dialog tidak muncul | Check browser console |
| Toast tidak tampil | Fullscreen the page |
| Changes tidak save | Check network tab |

---

## File Reference

| File | Purpose |
|------|---------|
| `user-management/page.tsx` | User edit UI & logic |
| `role-management/page.tsx` | Role edit UI & logic |
| `api/module-records/route.ts` | Backend API |
| `EDIT_SYSTEM_GUIDE.md` | Detailed documentation |
| `VISUAL_COMPARISON.md` | Before & after visuals |
| `IMPLEMENTATION_SUMMARY.md` | Implementation details |

---

## Auto-Refresh Info

```
┌─────────────────────────────────────┐
│ Auto Refresh Mechanism              │
├─────────────────────────────────────┤
│ Interval: 2.5 detik                 │
│ Function: loadDatabaseUsers()        │
│ Auto-apply: Selesai records         │
│ Show pending: Baru records          │
│ Clean up: Toast hilang after 4s     │
└─────────────────────────────────────┘
```

---

## Performance Tips

- ✅ Refresh terjadi otomatis setiap 2.5 detik
- ✅ Jangan spam-click tombol (tunggu response)
- ✅ Data sync antar tab otomatis
- ✅ Storage: Semua di database ModuleRecord

---

## Next Steps to Implement Similar Feature

Untuk menambah edit ke modul lain:

1. Copy edit button handler dari user-management
2. Create edit dialog/form
3. POST ke `/api/module-records`
4. Load database dengan role check
5. Show pending changes untuk non-admin

Lihat `IMPLEMENTATION_SUMMARY.md` untuk code template.

---

**Quick Help:** Lihat dokumentasi lengkap di folder project
- `EDIT_SYSTEM_GUIDE.md` - Cara penggunaan
- `VISUAL_COMPARISON.md` - Before & After
- `IMPLEMENTATION_SUMMARY.md` - Technical details

**Date:** 2026-06-12 | **Version:** 1.0
