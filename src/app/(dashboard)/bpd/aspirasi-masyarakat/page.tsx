'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Users, Search, Filter, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#4527a0';

const aspirasiData = [
  { no: 1, tanggal: '11 Jun 2026', pengirim: 'Rudi Hartono', kategori: 'Infrastruktur', isi: 'Jembatan RT 03 sudah mulai rapuh kayu ulinnya, mohon penanganan.', status: 'Ditindaklanjuti' },
  { no: 2, tanggal: '10 Jun 2026', pengirim: 'Ibu Buyung', kategori: 'Ekonomi / UMKM', isi: 'UMKM anyaman rotan kekurangan alat pengering, butuh bantuan modal.', status: 'Proses' },
  { no: 3, tanggal: '09 Jun 2026', pengirim: 'Bidan Kartini', kategori: 'Kesehatan', isi: 'Layanan internet di Posyandu RT 04 sering terputus, menghambat pelaporan.', status: 'Diterima' },
  { no: 4, tanggal: '08 Jun 2026', pengirim: 'Guru Dewi', kategori: 'Pendidikan', isi: 'Ruang kelas belajar TIK di Balai Adat bocor saat hujan deras.', status: 'Ditindaklanjuti' },
  { no: 5, tanggal: '07 Jun 2026', pengirim: 'Andi Saputra', kategori: 'Layanan Publik', isi: 'Akurasi pendataan NIK baru mohon divalidasi berkala oleh operator.', status: 'Diterima' },
  { no: 6, tanggal: '06 Jun 2026', pengirim: 'Fatimah Zahra', kategori: 'Kesehatan', isi: 'Pasokan vitamin balita di posyandu RT 01 kurang mencukupi.', status: 'Ditindaklanjuti' },
  { no: 7, tanggal: '05 Jun 2026', pengirim: 'Dewi Lestari', kategori: 'Keamanan', isi: 'Pos ronda RT 02 butuh perbaikan sarana kelistrikan lampu sorot.', status: 'Proses' },
  { no: 8, tanggal: '04 Jun 2026', pengirim: 'Joko Widodo', kategori: 'Pertanian', isi: 'Irigasi sawah RT 05 tersumbat lumpur dari buangan sisa perkebunan.', status: 'Diterima' }
];

export default function AspirasiMasyarakatPage() {
  const [search, setSearch] = useState('');

  const filtered = aspirasiData.filter(a =>
    a.pengirim.toLowerCase().includes(search.toLowerCase()) ||
    a.kategori.toLowerCase().includes(search.toLowerCase()) ||
    a.isi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Aspirasi Masyarakat" modul="BPD (Badan Permusyawaratan Desa)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Aspirasi" value={24} satuan="masukan masuk" barColor="purple" progress={65} />
        <StatCard label="Ditindaklanjuti" value={14} satuan="aspirasi selesai" barColor="green" progress={58} />
        <StatCard label="Dalam Proses" value={6} satuan="aspirasi dikoordinasikan" barColor="blue" progress={25} />
        <StatCard label="Diterima / Baru" value={4} satuan="aspirasi antrian" barColor="orange" progress={17} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <MessageSquare size={16} /> Kotak Aduan & Aspirasi Warga Desa (Dikelola BPD)
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari aspirasi..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-48"
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
                    <th className="pb-2 pr-4">Tanggal</th>
                    <th className="pb-2 pr-4">Pengirim</th>
                    <th className="pb-2 pr-4">Kategori Aspek</th>
                    <th className="pb-2 pr-4">Aspirasi / Aduan Masalah</th>
                    <th className="pb-2">Status Tindakan BPD</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((a, i) => (
                    <tr key={a.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-3 pr-4 text-center text-slate-400 font-mono text-xs">{a.no}</td>
                      <td className="py-3 pr-4 text-xs text-slate-500 font-mono">{a.tanggal}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-700">{a.pengirim}</td>
                      <td className="py-3 pr-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700">
                          {a.kategori}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-slate-600 text-xs md:text-sm leading-relaxed">{a.isi}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          a.status === 'Ditindaklanjuti' ? 'bg-green-100 text-green-700' :
                          a.status === 'Proses' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {a.status}
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
