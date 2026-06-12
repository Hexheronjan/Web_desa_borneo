'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { GraduationCap, Search, Filter, Download, Plus, BookOpen } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#00695c';

const initialSiswa = [
  { nisn: '0081234567', nama: 'Andi Saputra', sekolah: 'SDN 01 Borneo', jenjang: 'SD', status: 'Aktif' },
  { nisn: '0072345678', nama: 'Siti Nurhaliza', sekolah: 'SDN 01 Borneo', jenjang: 'SD', status: 'Aktif' },
  { nisn: '0063456789', nama: 'Rian Hidayat', sekolah: 'SMPN 02 Kahayan', jenjang: 'SMP', status: 'Aktif' },
  { nisn: '0054567890', nama: 'Dewi Lestari', sekolah: 'SMPN 02 Kahayan', jenjang: 'SMP', status: 'Aktif' },
  { nisn: '0045678901', nama: 'Budi Hartono', sekolah: 'SMAN 01 Pulang Pisau', jenjang: 'SMA', status: 'Aktif' },
  { nisn: '0036789012', nama: 'Putri Dayak', sekolah: 'SMAN 01 Pulang Pisau', jenjang: 'SMA', status: 'Aktif' },
  { nisn: '0097890123', nama: 'Rudi Hartono', sekolah: 'SDN 02 Rungan', jenjang: 'SD', status: 'Lulus' },
  { nisn: '0088901234', nama: 'Kartini Sari', sekolah: 'SMPN 02 Kahayan', jenjang: 'SMP', status: 'Lulus' }
];

export default function DataPendidikanPage() {
  const [search, setSearch] = useState('');
  const [jenjangFilter, setJenjangFilter] = useState('Semua');

  const filtered = initialSiswa.filter(s => {
    const matchSearch = s.nama.toLowerCase().includes(search.toLowerCase()) || s.nisn.includes(search);
    const matchJenjang = jenjangFilter === 'Semua' || s.jenjang === jenjangFilter;
    return matchSearch && matchJenjang;
  });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Pendidikan" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Siswa" value={785} satuan="siswa terdaftar" barColor="teal" progress={85} />
        <StatCard label="Tingkat SD" value={420} satuan="siswa" barColor="blue" progress={53} />
        <StatCard label="Tingkat SMP" value={210} satuan="siswa" barColor="purple" progress={26} />
        <StatCard label="Tingkat SMA" value={155} satuan="siswa" barColor="orange" progress={19} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <GraduationCap size={16} /> Daftar Siswa & Pelajar Desa
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama/NISN..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 w-36 md:w-48"
                  />
                </div>
                <select
                  value={jenjangFilter}
                  onChange={e => setJenjangFilter(e.target.value)}
                  className="px-2 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="Semua">Semua Jenjang</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b">
                    <th className="pb-2 pr-4">No</th>
                    <th className="pb-2 pr-4">NISN</th>
                    <th className="pb-2 pr-4">Nama Lengkap</th>
                    <th className="pb-2 pr-4">Sekolah</th>
                    <th className="pb-2 pr-4">Jenjang</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <tr key={s.nisn} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-slate-400 text-xs">{i + 1}</td>
                      <td className="py-2.5 pr-4 font-mono text-xs text-slate-600">{s.nisn}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{s.nama}</td>
                      <td className="py-2.5 pr-4 text-slate-600 text-xs">{s.sekolah}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.jenjang === 'SD' ? 'bg-blue-100 text-blue-700' :
                          s.jenjang === 'SMP' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {s.jenjang}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                        }`}>
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

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BookOpen size={16} /> Rekap Partisipasi Sekolah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Angka Partisipasi Sekolah (APS)</span>
                <span className="text-teal-700">92.50%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-700 rounded-full" style={{ width: '92.5%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Angka Partisipasi Kasar (APK)</span>
                <span className="text-blue-700">104.20%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-700 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
            <div className="pt-3 border-t">
              <p className="font-bold text-slate-700 mb-1">Tingkat Literasi Digital</p>
              <p className="text-slate-500 mb-2 leading-relaxed">Persentase siswa yang mampu mengoperasikan komputer dasar & portal web desa:</p>
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-600">Literasi Digital Siswa</span>
                <span className="font-bold text-indigo-700">48%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-700 rounded-full" style={{ width: '48%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
