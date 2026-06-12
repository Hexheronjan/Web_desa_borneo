'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Clock, Search, Filter, RefreshCw, FileText } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#1a237e';

const initialLogs = [
  { time: '11 Jun 2026, 12:05', user: 'admin_super', role: 'Super Admin', modul: 'Hak Akses', aksi: 'Mengubah permission role BPD', ip: '192.168.1.100', status: 'Sukses' },
  { time: '11 Jun 2026, 11:45', user: 'operator_sid01', role: 'Operator SID', modul: 'Data Penduduk', aksi: 'Tambah data warga: NIK 64010...', ip: '192.168.1.102', status: 'Sukses' },
  { time: '11 Jun 2026, 11:20', user: 'pemdes_hasan', role: 'Pemerintah Desa', modul: 'APBDes', aksi: 'Update realisasi bidang pembangunan', ip: '192.168.1.105', status: 'Sukses' },
  { time: '11 Jun 2026, 10:55', user: 'guru_dewi', role: 'Guru', modul: 'Literasi Digital', aksi: 'Input nilai pelatihan basic IT', ip: '192.168.1.111', status: 'Sukses' },
  { time: '11 Jun 2026, 09:30', user: 'nakes_kartini', role: 'Nakes', modul: 'Stunting', aksi: 'Input data tinggi balita RT 02', ip: '192.168.1.114', status: 'Sukses' },
  { time: '11 Jun 2026, 08:15', user: 'adat_buyung', role: 'Lembaga Adat', modul: 'Musyawarah Adat', aksi: 'Posting agenda rapat Huma Betang', ip: '192.168.1.120', status: 'Sukses' },
  { time: '10 Jun 2026, 17:40', user: 'warga_rudi', role: 'Warga', modul: 'Surat Online', aksi: 'Mengajukan SK Usaha Mikro', ip: '192.168.1.201', status: 'Sukses' },
  { time: '10 Jun 2026, 15:10', user: 'peneliti_andi', role: 'Peneliti', modul: 'AHP SAW', aksi: 'Menghitung consistency ratio AHP', ip: '192.168.1.250', status: 'Sukses' },
  { time: '10 Jun 2026, 14:05', user: 'dinas_joko', role: 'Dinas PMD', modul: 'Readiness Assessment', aksi: 'Download laporan regional Gunung Mas', ip: '192.168.2.10', status: 'Sukses' },
  { time: '10 Jun 2026, 10:20', user: 'unknown_user', role: 'Tamu', modul: 'Auth / Login', aksi: 'Percobaan login gagal: password salah', ip: '202.152.33.45', status: 'Gagal' }
];

export default function AuditLogPage() {
  const [search, setSearch] = useState('');

  const filtered = initialLogs.filter(l =>
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.modul.toLowerCase().includes(search.toLowerCase()) ||
    l.aksi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Log Audit Sistem" modul="Modul 13: Audit Log" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Log Hari Ini" value={345} satuan="aktivitas" barColor="blue" progress={78} />
        <StatCard label="Aksi Sukses" value={341} satuan="transaksi" barColor="green" progress={98} />
        <StatCard label="Aksi Gagal/Alert" value={4} satuan="event" barColor="red" progress={1} />
        <StatCard label="Storage Log" value="12 MB" satuan="database" barColor="purple" progress={10} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Clock size={16} /> Riwayat Log Aktivitas Pengguna
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari log..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 w-48"
                />
              </div>
              <button className="p-2 border rounded-lg hover:bg-slate-50 text-slate-500">
                <RefreshCw size={14} />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                  <th className="pb-2 pr-4">Waktu</th>
                  <th className="pb-2 pr-4">Username</th>
                  <th className="pb-2 pr-4">Role</th>
                  <th className="pb-2 pr-4">Modul</th>
                  <th className="pb-2 pr-4">Detail Aksi</th>
                  <th className="pb-2 pr-4">Alamat IP</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l, i) => (
                  <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                    <td className="py-2.5 pr-4 text-xs font-mono text-slate-500">{l.time}</td>
                    <td className="py-2.5 pr-4 font-semibold text-slate-700">{l.user}</td>
                    <td className="py-2.5 pr-4 text-xs text-slate-500">{l.role}</td>
                    <td className="py-2.5 pr-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700">
                        {l.modul}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-slate-600 text-xs md:text-sm">{l.aksi}</td>
                    <td className="py-2.5 pr-4 text-xs font-mono text-slate-400">{l.ip}</td>
                    <td className="py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        l.status === 'Sukses' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
