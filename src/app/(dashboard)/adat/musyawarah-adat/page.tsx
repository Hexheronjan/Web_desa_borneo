'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Users, Search, Calendar, FileText, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

const musyawarahList = [
  { no: 1, tanggal: '10 Jun 2026', topik: 'Penyelesaian Batas Hutan Adat Dusun Hulu', peserta: 42, keputusan: 'Disepakati tanda batas menggunakan ulin di koordinat GPS...', status: 'Sah' },
  { no: 2, tanggal: '05 Jun 2026', topik: 'Restorasi Kayu Tiang Huma Betang RT 02', peserta: 28, keputusan: 'Alokasi APBDesa Rp 50 juta disetujui bersama Lurah...', status: 'Sah' },
  { no: 3, tanggal: '28 Mei 2026', topik: 'Sanksi Adat Pelanggaran Hutan Lindung', peserta: 35, keputusan: 'Terhadap pelanggar dikenakan jipen adat 40 keping guci...', status: 'Sah' },
  { no: 4, tanggal: '15 Mei 2026', topik: 'Persiapan Festival Tiwah Massal Ke-XII', peserta: 60, keputusan: 'Panitia inti dibentuk, diketuai oleh Mantir Hasan...', status: 'Sah' }
];

export default function MusyawarahAdatPage() {
  const [search, setSearch] = useState('');

  const filtered = musyawarahList.filter(m =>
    m.topik.toLowerCase().includes(search.toLowerCase()) ||
    m.keputusan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Musyawarah Adat" modul="Lembaga Adat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Musyawarah" value={12} satuan="sidang sah" barColor="green" progress={60} />
        <StatCard label="Kehadiran Rerata" value="92%" satuan="peserta terdaftar" barColor="blue" progress={92} />
        <StatCard label="Hukum Adat Disepakati" value={5} satuan="putusan baru" barColor="teal" progress={50} />
        <StatCard label="Status Dokumen" value="100%" satuan="arsip digital" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Users size={16} /> Risalah Hasil Musyawarah Adat Kerapatan Kedamangan
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari keputusan..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 w-48"
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
                    <th className="pb-2 pr-4">Tanggal Rapat</th>
                    <th className="pb-2 pr-4">Topik Agenda Bahasan</th>
                    <th className="pb-2 pr-4 text-center">Peserta</th>
                    <th className="pb-2 pr-4">Hasil Keputusan Adat</th>
                    <th className="pb-2">Verifikasi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => (
                    <tr key={m.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-3 pr-4 text-center text-slate-400 font-mono text-xs">{m.no}</td>
                      <td className="py-3 pr-4 text-xs font-mono text-slate-500">{m.tanggal}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{m.topik}</td>
                      <td className="py-3 pr-4 text-center text-slate-600 font-mono text-xs">{m.peserta} orang</td>
                      <td className="py-3 pr-4 text-slate-600 text-xs leading-relaxed">{m.keputusan}</td>
                      <td className="py-3">
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 w-fit">
                          <CheckCircle2 size={10} /> {m.status}
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
