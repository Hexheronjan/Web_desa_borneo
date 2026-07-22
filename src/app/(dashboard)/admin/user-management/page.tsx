'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, Search, Shield, CheckCircle2, Lock, Unlock, RefreshCw, Key, Ban, Eye, X, ShieldAlert } from 'lucide-react';

const COLOR = '#1a237e';

// 7 Peran Final yang disetujui di dokumen
const ROLE_OPTIONS = [
  'Administrator Sistem',
  'Pemerintah Desa',
  'Lembaga Adat',
  'Tokoh Masyarakat',
  'Guru/Tenaga Pendidikan',
  'Tenaga Kesehatan',
  'Masyarakat Umum'
];

interface UserDemo {
  id: string;
  nama: string;
  username: string;
  peran: string[]; // multi-role
  desaWilayah: 'Jonggon Jaya' | 'Kedang Ipil' | 'Lung Anai' | 'Semua Wilayah';
  status: 'Aktif' | 'Nonaktif';
  terkunci: boolean;
  masaBerlaku: string; // YYYY-MM-DD
  terakhirLogin: string;
}

const INITIAL_USERS: UserDemo[] = [
  { id: 'USR-01', nama: 'Dr. Ahmad Surya', username: 'admin_super', peran: ['Administrator Sistem'], desaWilayah: 'Semua Wilayah', status: 'Aktif', terkunci: false, masaBerlaku: '2028-12-31', terakhirLogin: '18 Jul 2026, 12:05 WITA' },
  { id: 'USR-02', nama: 'Bapak Lurah Hasan', username: 'pemdes_hasan', peran: ['Pemerintah Desa'], desaWilayah: 'Jonggon Jaya', status: 'Aktif', terkunci: false, masaBerlaku: '2027-06-30', terakhirLogin: '18 Jul 2026, 11:20 WITA' },
  { id: 'USR-03', nama: 'Tetua Adat Buyung', username: 'adat_buyung', peran: ['Lembaga Adat'], desaWilayah: 'Kedang Ipil', status: 'Aktif', terkunci: false, masaBerlaku: '2027-12-31', terakhirLogin: '18 Jul 2026, 08:15 WITA' },
  { id: 'USR-04', nama: 'Warga Rudi', username: 'layanan_slv', peran: ['Masyarakat Umum'], desaWilayah: 'Lung Anai', status: 'Aktif', terkunci: false, masaBerlaku: '2028-01-01', terakhirLogin: '17 Jul 2026, 17:40 WITA' },
  { id: 'USR-05', nama: 'Bidan Kartini', username: 'nakes_kartini', peran: ['Tenaga Kesehatan'], desaWilayah: 'Jonggon Jaya', status: 'Aktif', terkunci: false, masaBerlaku: '2027-12-31', terakhirLogin: '18 Jul 2026, 09:30 WITA' },
  { id: 'USR-06', nama: 'Guru Budaya Dewi', username: 'guru_dewi', peran: ['Guru/Tenaga Pendidikan'], desaWilayah: 'Kedang Ipil', status: 'Aktif', terkunci: false, masaBerlaku: '2027-12-31', terakhirLogin: '18 Jul 2026, 10:55 WITA' },
  { id: 'USR-07', nama: 'Tokoh Adat Jafar', username: 'adat_jafar', peran: ['Tokoh Masyarakat', 'Lembaga Adat'], desaWilayah: 'Lung Anai', status: 'Aktif', terkunci: true, masaBerlaku: '2026-12-31', terakhirLogin: '15 Jul 2026, 11:45 WITA' },
];

const RIWAYAT_AKSES = [
  { id: 'LOG-01', waktu: '18 Jul 2026, 12:05', perangkat: 'Chrome, Windows 11', ip: '192.168.1.100', modul: 'Jejak Audit', status: 'Sukses' },
  { id: 'LOG-02', waktu: '18 Jul 2026, 11:30', perangkat: 'Safari, macOS', ip: '192.168.1.102', modul: 'Layanan Publik', status: 'Sukses' },
  { id: 'LOG-03', waktu: '18 Jul 2026, 09:45', perangkat: 'Firefox, Linux', ip: '192.168.1.110', modul: 'Posyandu Digital', status: 'Sukses' },
  { id: 'LOG-04', waktu: '15 Jul 2026, 11:45', perangkat: 'Chrome, Android', ip: '192.168.1.105', modul: 'Auth', status: 'Akun Terkunci (3x Gagal Login)' },
];

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserDemo[]>(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UserDemo | null>(null);
  const [selectedUserLogs, setSelectedUserLogs] = useState<UserDemo | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [perans, setPerans] = useState<string[]>([]);
  const [desaWilayah, setDesaWilayah] = useState<'Jonggon Jaya' | 'Kedang Ipil' | 'Lung Anai' | 'Semua Wilayah'>('Jonggon Jaya');
  const [masaBerlaku, setMasaBerlaku] = useState('');
  const [status, setStatus] = useState<'Aktif' | 'Nonaktif'>('Aktif');

  const openAdd = () => {
    setEditingItem(null);
    setNama(''); setUsername(''); setPerans([]); setDesaWilayah('Jonggon Jaya');
    setMasaBerlaku('2027-12-31'); setStatus('Aktif');
    setIsModalOpen(true);
  };

  const openEdit = (item: UserDemo) => {
    setEditingItem(item);
    setNama(item.nama); setUsername(item.username); setPerans(item.peran);
    setDesaWilayah(item.desaWilayah); setMasaBerlaku(item.masaBerlaku); setStatus(item.status);
    setIsModalOpen(true);
  };

  const toggleRole = (role: string) => {
    setPerans(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (perans.length === 0) {
      alert('Pilih minimal satu peran pengguna!');
      return;
    }
    const data = { nama, username, peran: perans, desaWilayah, masaBerlaku, status };
    if (editingItem) {
      setUsers(prev => prev.map(u => u.id === editingItem.id ? { ...u, ...data } : u));
      setNotification('Akun pengguna berhasil diperbarui!');
    } else {
      setUsers(prev => [...prev, {
        id: `USR-0${prev.length + 1}`, ...data, terkunci: false, terakhirLogin: 'Belum pernah'
      }]);
      setNotification('Akun pengguna baru berhasil dibuat!');
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleStatus = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Aktif' ? 'Nonaktif' : 'Aktif' } : u));
    setNotification('Status akun berhasil diubah!');
    setTimeout(() => setNotification(null), 3000);
  };

  const toggleLock = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, terkunci: !u.terkunci } : u));
    setNotification('Status kunci akun berhasil diubah!');
    setTimeout(() => setNotification(null), 3000);
  };

  const resetPassword = (username: string) => {
    if (confirm(`Apakah Anda yakin ingin mengatur ulang kata sandi untuk user "${username}"? Password akan di-reset ke "password123".`)) {
      setNotification(`Password untuk user "${username}" telah di-reset ke "password123".`);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const filteredUsers = users.filter(u =>
    u.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.peran.some(r => r.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Manajemen Pengguna dan Peran" modul="Administrasi Sistem" color={COLOR} />

      {/* Ringkasan Metrik */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pengguna" value={users.length} satuan="akun terdaftar" barColor="blue" progress={80} />
        <StatCard label="Pengguna Aktif" value={users.filter(u => u.status === 'Aktif').length} satuan="akun" barColor="green" progress={90} />
        <StatCard label="Akun Terkunci" value={users.filter(u => u.terkunci).length} satuan="akun dinonaktifkan" barColor="red" progress={10} />
        <StatCard label="Total Peran" value="7 Peran" satuan="peran terdefinisi" barColor="purple" progress={100} />
      </div>

      <Card>
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Shield size={14} /> Daftar Pengguna &amp; Peran Sistem
          </CardTitle>
          <Button onClick={openAdd} size="sm" className="h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-700">
            <UserPlus size={13} className="mr-1" /> Buat Akun Baru
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Search size={16} className="text-slate-400" />
            <Input
              placeholder="Cari nama, username, atau peran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md h-8 text-xs"
            />
          </div>

          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold text-slate-700">ID</TableHead>
                  <TableHead className="font-bold text-slate-700">Nama Lengkap</TableHead>
                  <TableHead className="font-bold text-slate-700">Username</TableHead>
                  <TableHead className="font-bold text-slate-700">Peran Pengguna</TableHead>
                  <TableHead className="font-bold text-slate-700">Desa / Wilayah</TableHead>
                  <TableHead className="font-bold text-slate-700">Status</TableHead>
                  <TableHead className="font-bold text-slate-700">Masa Berlaku</TableHead>
                  <TableHead className="font-bold text-slate-700">Terakhir Login</TableHead>
                  <TableHead className="text-right font-bold text-slate-700">Aksi Administrasi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{u.id}</TableCell>
                    <TableCell className="font-bold text-slate-800 py-3">{u.nama}</TableCell>
                    <TableCell className="font-mono">{u.username}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {u.peran.map((r, idx) => (
                          <span key={idx} className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.5 rounded text-[9px] font-bold">
                            {r}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-700">{u.desaWilayah}</TableCell>
                    <TableCell>
                      <button onClick={() => toggleStatus(u.id)} className={`px-2 py-0.5 rounded text-[9px] font-bold border transition-all ${
                        u.status === 'Aktif' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {u.status}
                      </button>
                    </TableCell>
                    <TableCell className="font-mono">{u.masaBerlaku}</TableCell>
                    <TableCell className="text-slate-500">{u.terakhirLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button onClick={() => setSelectedUserLogs(u)} size="sm" variant="ghost" className="h-7 w-7 p-0" title="Riwayat Akses">
                          <Eye size={13} className="text-slate-600" />
                        </Button>
                        <Button onClick={() => toggleLock(u.id)} size="sm" variant="ghost" className="h-7 w-7 p-0" title={u.terkunci ? 'Buka Kunci' : 'Kunci Akun'}>
                          {u.terkunci ? <Lock size={13} className="text-red-600" /> : <Unlock size={13} className="text-green-600" />}
                        </Button>
                        <Button onClick={() => resetPassword(u.username)} size="sm" variant="ghost" className="h-7 w-7 p-0" title="Reset Sandi">
                          <Key size={13} className="text-amber-600" />
                        </Button>
                        <Button onClick={() => openEdit(u)} size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <RefreshCw size={13} className="text-blue-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Form Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-white shadow-2xl border">
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800">
                {editingItem ? 'Edit Konfigurasi Akun Pengguna' : 'Buat Akun Pengguna Baru'}
              </CardTitle>
              <Button onClick={() => setIsModalOpen(false)} size="sm" variant="ghost" className="h-8 w-8 p-0">✕</Button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Nama Lengkap</Label>
                    <Input required value={nama} onChange={e => setNama(e.target.value)} placeholder="Contoh: Andi Saputra" className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Username</Label>
                    <Input required value={username} onChange={e => setUsername(e.target.value)} placeholder="Contoh: andi_saputra" className="h-9 text-xs" />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-700">Peran Pengguna (Dapat menetapkan satu atau lebih peran)</Label>
                  <div className="grid grid-cols-2 gap-2 border p-2.5 rounded-lg bg-slate-50">
                    {ROLE_OPTIONS.map((role) => (
                      <label key={role} className="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
                        <input
                          type="checkbox"
                          checked={perans.includes(role)}
                          onChange={() => toggleRole(role)}
                          className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                        />
                        {role}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Desa / Wilayah</Label>
                    <select
                      value={desaWilayah}
                      onChange={e => setDesaWilayah(e.target.value as any)}
                      className="w-full h-9 rounded-md border bg-white px-2 text-xs"
                    >
                      <option value="Jonggon Jaya">Jonggon Jaya</option>
                      <option value="Kedang Ipil">Kedang Ipil</option>
                      <option value="Lung Anai">Lung Anai</option>
                      <option value="Semua Wilayah">Semua Wilayah</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Masa Berlaku</Label>
                    <Input required type="date" value={masaBerlaku} onChange={e => setMasaBerlaku(e.target.value)} className="h-9 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="font-bold text-slate-700">Status Akun</Label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value as any)}
                      className="w-full h-9 rounded-md border bg-white px-2 text-xs"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} className="h-8 text-xs font-bold">Batal</Button>
                  <Button type="submit" className="h-8 text-xs font-bold bg-indigo-600 hover:bg-indigo-700">Simpan Akun</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal Riwayat Akses User */}
      {selectedUserLogs && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg bg-white shadow-2xl border">
            <CardHeader className="py-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Eye size={16} className="text-indigo-600" /> Riwayat Akses &amp; Aktivitas User
              </CardTitle>
              <Button onClick={() => setSelectedUserLogs(null)} size="sm" variant="ghost" className="h-8 w-8 p-0">✕</Button>
            </CardHeader>
            <CardContent className="space-y-3 text-xs pb-4">
              <p className="font-semibold text-slate-700">User: <strong className="text-slate-900">{selectedUserLogs.nama} ({selectedUserLogs.username})</strong></p>
              
              <div className="overflow-x-auto border rounded-xl">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-bold text-slate-700">Waktu</TableHead>
                      <TableHead className="font-bold text-slate-700">Perangkat</TableHead>
                      <TableHead className="font-bold text-slate-700">Alamat IP</TableHead>
                      <TableHead className="font-bold text-slate-700">Modul</TableHead>
                      <TableHead className="font-bold text-slate-700">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {RIWAYAT_AKSES.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono text-[10px] text-slate-500">{log.waktu}</TableCell>
                        <TableCell className="text-slate-650">{log.perangkat}</TableCell>
                        <TableCell className="font-mono text-[10px]">{log.ip}</TableCell>
                        <TableCell className="font-bold text-indigo-700">{log.modul}</TableCell>
                        <TableCell>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            log.status.includes('Sukses') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-755'
                          }`}>
                            {log.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end pt-2">
                <Button onClick={() => setSelectedUserLogs(null)} className="h-8 text-xs font-bold">Tutup</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border border-green-200 bg-white text-xs font-bold">
          <CheckCircle2 className="text-green-600" size={16} /> {notification}
        </div>
      )}
    </div>
  );
}
