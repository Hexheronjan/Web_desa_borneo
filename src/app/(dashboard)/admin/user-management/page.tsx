'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { UserPlus, Search, Download, Edit, Trash2, Eye } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#1a237e';

const usersData = [
  { id: 1, nama: 'Dr. Ahmad Surya', username: 'admin_super', password: '••••••••', role: 'Super Admin', status: 'Aktif', lastLogin: '11 Jun 2026, 09:15' },
  { id: 2, nama: 'Siti Nurhaliza', username: 'operator_sid01', password: '••••••••', role: 'Operator SID', status: 'Aktif', lastLogin: '11 Jun 2026, 08:30' },
  { id: 3, nama: 'Bapak Lurah Hasan', username: 'pemdes_hasan', password: '••••••••', role: 'Pemerintah Desa', status: 'Aktif', lastLogin: '10 Jun 2026, 14:20' },
  { id: 4, nama: 'Ketua BPD Rina', username: 'bpd_rina', password: '••••••••', role: 'BPD', status: 'Aktif', lastLogin: '10 Jun 2026, 10:45' },
  { id: 5, nama: 'Tetua Adat Buyung', username: 'adat_buyung', password: '••••••••', role: 'Lembaga Adat', status: 'Aktif', lastLogin: '09 Jun 2026, 16:30' },
  { id: 6, nama: 'Guru Budaya Dewi', username: 'guru_dewi', password: '••••••••', role: 'Guru/Fasilitator', status: 'Aktif', lastLogin: '11 Jun 2026, 07:00' },
  { id: 7, nama: 'Bidan Kartini', username: 'nakes_kartini', password: '••••••••', role: 'Nakes/Posyandu', status: 'Aktif', lastLogin: '11 Jun 2026, 08:00' },
  { id: 8, nama: 'Warga Rudi', username: 'warga_rudi', password: '••••••••', role: 'Warga', status: 'Aktif', lastLogin: '08 Jun 2026, 12:15' },
  { id: 9, nama: 'Dinas PMD Joko', username: 'dinas_joko', password: '••••••••', role: 'Dinas PMD', status: 'Nonaktif', lastLogin: '05 Jun 2026, 09:00' },
  { id: 10, nama: 'Dr. Peneliti Andi', username: 'peneliti_andi', password: '••••••••', role: 'Peneliti/Akademisi', status: 'Aktif', lastLogin: '10 Jun 2026, 11:20' },
  { id: 11, nama: 'Operator SID Budi', username: 'operator_sid02', password: '••••••••', role: 'Operator SID', status: 'Aktif', lastLogin: '11 Jun 2026, 09:45' },
];

const roleColors: Record<string, string> = {
  'Super Admin': 'bg-red-100 text-red-700',
  'Operator SID': 'bg-blue-100 text-blue-700',
  'Pemerintah Desa': 'bg-green-100 text-green-700',
  'BPD': 'bg-purple-100 text-purple-700',
  'Lembaga Adat': 'bg-amber-100 text-amber-700',
  'Guru/Fasilitator': 'bg-cyan-100 text-cyan-700',
  'Nakes/Posyandu': 'bg-rose-100 text-rose-700',
  'Warga': 'bg-slate-100 text-slate-700',
  'Dinas PMD': 'bg-indigo-100 text-indigo-700',
  'Peneliti/Akademisi': 'bg-teal-100 text-teal-700',
};

export default function UserManagementPage() {
  const [search, setSearch] = useState('');

  const filtered = usersData.filter(u =>
    u.nama.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Manajemen Pengguna" modul="Modul 1: User Management" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total User" value={125} satuan="pengguna" barColor="blue" progress={85} />
        <StatCard label="User Aktif" value={118} satuan="online/aktif" barColor="green" progress={94} />
        <StatCard label="User Nonaktif" value={7} satuan="nonaktif" barColor="red" progress={6} />
        <StatCard label="Role Terdaftar" value={10} satuan="jenis role" barColor="purple" progress={100} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              👥 Daftar Pengguna Sistem
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari pengguna..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 w-48"
                />
              </div>
              <button className="px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5" />
                Tambah User
              </button>
              <button className="px-3 py-2 border text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-slate-600">
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                  <th className="pb-2 pr-4">No</th>
                  <th className="pb-2 pr-4">Nama Lengkap</th>
                  <th className="pb-2 pr-4">Username</th>
                  <th className="pb-2 pr-4">Password</th>
                  <th className="pb-2 pr-4">Role</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2 pr-4">Login Terakhir</th>
                  <th className="pb-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50' : ''}`}>
                    <td className="py-2.5 pr-4 text-slate-400">{i + 1}</td>
                    <td className="py-2.5 pr-4 font-semibold text-slate-700">{u.nama}</td>
                    <td className="py-2.5 pr-4 text-slate-600 font-mono text-xs">{u.username}</td>
                    <td className="py-2.5 pr-4 text-slate-400">{u.password}</td>
                    <td className="py-2.5 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${roleColors[u.role] || 'bg-slate-100 text-slate-600'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-slate-400">{u.lastLogin}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat">
                          <Eye className="w-3.5 h-3.5 text-blue-500" />
                        </button>
                        <button className="p-1.5 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-3.5 h-3.5 text-amber-500" />
                        </button>
                        <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Menampilkan {filtered.length} dari {usersData.length} pengguna</span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border rounded hover:bg-slate-50">← Prev</button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
              <button className="px-3 py-1 border rounded hover:bg-slate-50">2</button>
              <button className="px-3 py-1 border rounded hover:bg-slate-50">Next →</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
