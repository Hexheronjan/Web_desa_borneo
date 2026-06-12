'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { GraduationCap, Search, Filter, Download } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#1565c0';

const initialSiswa = [
  { no: 1, nisn: '0081234567', nama: 'Andi Saputra', kelas: 'Kelas VII-A', jenjang: 'SMP', status: 'Aktif' },
  { no: 2, nisn: '0072345678', nama: 'Siti Nurhaliza', kelas: 'Kelas VIII-B', jenjang: 'SMP', status: 'Aktif' },
  { no: 3, nisn: '0091234569', nama: 'Muhammad Alif', kelas: 'Kelas V', jenjang: 'SD', status: 'Aktif' },
  { no: 4, nisn: '0054567890', nama: 'Dewi Lestari', kelas: 'Kelas X-MIPA', jenjang: 'SMA', status: 'Aktif' },
  { no: 5, nisn: '0045678901', nama: 'Budi Hartono', kelas: 'Kelas XI-IIS', jenjang: 'SMA', status: 'Aktif' },
  { no: 6, nisn: '0036789012', nama: 'Putri Dayak', kelas: 'Kelas XII-MIPA', jenjang: 'SMA', status: 'Aktif' }
];

export default function DataSiswaPage() {
  const [search, setSearch] = useState('');

  const filtered = initialSiswa.filter(s =>
    s.nama.toLowerCase().includes(search.toLowerCase()) ||
    s.nisn.includes(search) ||
    s.jenjang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Siswa & Pelajar" modul="Guru / Fasilitator Belajar" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Siswa" value={256} satuan="siswa" barColor="blue" progress={90} />
        <StatCard label="Siswa SD" value={120} satuan="siswa" barColor="blue" progress={47} />
        <StatCard label="Siswa SMP" value={82} satuan="siswa" barColor="purple" progress={32} />
        <StatCard label="Siswa SMA" value={54} satuan="siswa" barColor="orange" progress={21} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <GraduationCap size={16} /> Database Siswa Terdaftar di Wilayah Desa Adat
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari siswa..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">NISN</th>
                    <th className="pb-2 pr-4">Nama Siswa</th>
                    <th className="pb-2 pr-4">Kelas</th>
                    <th className="pb-2 pr-4">Jenjang</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s.nisn} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{s.no}</td>
                      <td className="py-2.5 pr-4 font-mono text-xs text-slate-600">{s.nisn}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{s.nama}</td>
                      <td className="py-2.5 pr-4 text-slate-600 text-xs">{s.kelas}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.jenjang === 'SD' ? 'bg-blue-100 text-blue-700' :
                          s.jenjang === 'SMP' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {s.jenjang}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {s.status}
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
    </div>
  );
}
