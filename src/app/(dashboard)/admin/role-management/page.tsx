'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Shield, Edit, Eye, Settings, CheckCircle2 } from 'lucide-react';

const COLOR = '#1a237e';

const rolesData = [
  { id: 1, role: 'Super Admin', kode: 'admin_super', hakAkses: 14, deskripsi: 'Akses penuh ke semua modul sistem', status: 'Aktif', jumlahUser: 2 },
  { id: 2, role: 'Operator SID', kode: 'operator_sid', hakAkses: 7, deskripsi: 'Mengelola data Sistem Informasi Desa', status: 'Aktif', jumlahUser: 5 },
  { id: 3, role: 'Pemerintah Desa', kode: 'pemerintah_desa', hakAkses: 10, deskripsi: 'Monitoring indeks, tata kelola, SDGs, DSS, QoL, dan KPI desa', status: 'Aktif', jumlahUser: 3 },
  { id: 4, role: 'BPD', kode: 'bpd', hakAkses: 3, deskripsi: 'Pengawasan program, APBDes, dan aspirasi masyarakat', status: 'Aktif', jumlahUser: 4 },
  { id: 5, role: 'Lembaga Adat', kode: 'lembaga_adat', hakAkses: 4, deskripsi: 'Kelola kelembagaan, budaya, musyawarah, dan kalender adat', status: 'Aktif', jumlahUser: 3 },
  { id: 6, role: 'Guru/Fasilitator', kode: 'guru_fasilitator', hakAkses: 4, deskripsi: 'Monitoring data siswa, APS, APK, dan literasi digital', status: 'Aktif', jumlahUser: 8 },
  { id: 7, role: 'Nakes/Posyandu', kode: 'nakes_posyandu', hakAkses: 4, deskripsi: 'Monitoring balita, ibu hamil, posyandu, dan stunting', status: 'Aktif', jumlahUser: 6 },
  { id: 8, role: 'Warga', kode: 'warga', hakAkses: 4, deskripsi: 'Akses surat online, pengaduan, aspirasi, dan survei QoL', status: 'Aktif', jumlahUser: 85 },
  { id: 9, role: 'Dinas PMD', kode: 'dinas_pmd', hakAkses: 4, deskripsi: 'Monitoring regional, benchmarking, readiness, dan maturity', status: 'Aktif', jumlahUser: 3 },
  { id: 10, role: 'Peneliti/Akademisi', kode: 'peneliti', hakAkses: 6, deskripsi: 'Analisis readiness, DSS, maturity, dan evaluasi sistem', status: 'Aktif', jumlahUser: 4 },
];

export default function RoleManagementPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Manajemen Role & Peran" modul="Modul 2: Role Management" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Role" value={10} satuan="jenis peran" barColor="purple" progress={100} />
        <StatCard label="Role Aktif" value={10} satuan="aktif semua" barColor="green" progress={100} />
        <StatCard label="Total Modul" value={60} satuan="modul tersedia" barColor="blue" progress={100} />
        <StatCard label="Total User" value={125} satuan="pengguna" barColor="orange" progress={85} />
      </div>

      {/* Role Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            📊 Distribusi Role Pengguna
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {rolesData.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-36 flex-shrink-0">
                  <span className="text-xs font-bold text-slate-700">{r.role}</span>
                </div>
                <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700"
                    style={{ width: `${(r.jumlahUser / 85) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-indigo-700 w-12 text-right">{r.jumlahUser} user</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              🛡️ Daftar Role Sistem
            </CardTitle>
            <button className="px-3 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Tambah Role
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                  <th className="pb-2 pr-4">No</th>
                  <th className="pb-2 pr-4">Nama Role</th>
                  <th className="pb-2 pr-4">Kode</th>
                  <th className="pb-2 pr-4">Hak Akses</th>
                  <th className="pb-2 pr-4">Deskripsi</th>
                  <th className="pb-2 pr-4">Jumlah User</th>
                  <th className="pb-2 pr-4">Status</th>
                  <th className="pb-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {rolesData.map((r, i) => (
                  <tr key={r.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50' : ''}`}>
                    <td className="py-2.5 pr-4 text-slate-400">{r.id}</td>
                    <td className="py-2.5 pr-4 font-semibold text-slate-700">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-indigo-500" />
                        {r.role}
                      </div>
                    </td>
                    <td className="py-2.5 pr-4 font-mono text-xs text-slate-500">{r.kode}</td>
                    <td className="py-2.5 pr-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700">
                        {r.hakAkses} modul
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 text-xs text-slate-500 max-w-[200px] truncate">{r.deskripsi}</td>
                    <td className="py-2.5 pr-4 text-center">
                      <span className="text-sm font-bold text-slate-700">{r.jumlahUser}</span>
                    </td>
                    <td className="py-2.5 pr-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3" />
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat">
                          <Eye className="w-3.5 h-3.5 text-blue-500" />
                        </button>
                        <button className="p-1.5 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                          <Edit className="w-3.5 h-3.5 text-amber-500" />
                        </button>
                        <button className="p-1.5 hover:bg-indigo-50 rounded-lg transition-colors" title="Kelola Akses">
                          <Settings className="w-3.5 h-3.5 text-indigo-500" />
                        </button>
                      </div>
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
