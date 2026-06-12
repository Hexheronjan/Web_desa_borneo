'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { CheckCircle2, AlertTriangle, XCircle, Search, Filter } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#00695c';

const dataValidasi = [
  { id: 'VAL001', item: 'NIK 6401010101010001 (Andi Saputra)', tipe: 'Kependudukan', status: 'Tervalidasi', catatan: 'Data KK dan NIK sinkron dengan Dukcapil.' },
  { id: 'VAL002', item: 'UMKM Kerajinan Rotan (Ibu Buyung)', tipe: 'Ekonomi', status: 'Valid Sebagian', catatan: 'Nomor ijin usaha mikro (NIB) perlu verifikasi ulang.' },
  { id: 'VAL003', item: 'Jalan Desa RT 03 (Kondisi Jalan)', tipe: 'Infrastruktur', status: 'Tidak Valid', catatan: 'Koordinat lokasi melenceng dari peta regional.' },
  { id: 'VAL004', item: 'Tinggi Badan Balita RT 02 (Clara)', tipe: 'Kesehatan', status: 'Tervalidasi', catatan: 'Data gizi stunting terkonfirmasi bidan.' },
  { id: 'VAL005', item: 'Arsip Musyawarah Adat Huma Betang', tipe: 'Budaya', status: 'Valid Sebagian', catatan: 'Dokumen scan notulen musyawarah belum terupload.' },
  { id: 'VAL006', item: 'Angka Partisipasi Siswa SDN 01', tipe: 'Pendidikan', status: 'Tervalidasi', catatan: 'Data jumlah siswa cocok dengan Dapodik.' }
];

export default function ValidasiDataPage() {
  const [search, setSearch] = useState('');

  const filtered = dataValidasi.filter(v =>
    v.item.toLowerCase().includes(search.toLowerCase()) ||
    v.tipe.toLowerCase().includes(search.toLowerCase()) ||
    v.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Validasi Data SID" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Akurasi Data" value="98.0%" satuan="sangat akurat" barColor="green" progress={98} />
        <StatCard label="Tervalidasi" value="80%" satuan="status terverifikasi" barColor="green" progress={80} />
        <StatCard label="Valid Sebagian" value="15%" satuan="butuh kelengkapan" barColor="orange" progress={15} />
        <StatCard label="Tidak Valid" value="5%" satuan="perlu koreksi" barColor="red" progress={5} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <CheckCircle2 size={16} /> Verifikasi Kelayakan Data Sistem
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari item..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b">
                    <th className="pb-2 pr-4">ID</th>
                    <th className="pb-2 pr-4">Item/Data</th>
                    <th className="pb-2 pr-4">Kategori Modul</th>
                    <th className="pb-2 pr-4">Status Validasi</th>
                    <th className="pb-2">Catatan Verifikasi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((v, i) => (
                    <tr key={v.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-3 pr-4 font-mono text-xs text-indigo-700 font-bold">{v.id}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{v.item}</td>
                      <td className="py-3 pr-4 text-xs text-slate-500">{v.tipe}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          v.status === 'Tervalidasi' ? 'bg-green-100 text-green-700' :
                          v.status === 'Valid Sebagian' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        } flex items-center gap-1 w-fit`}>
                          {v.status === 'Tervalidasi' ? <CheckCircle2 size={10} /> :
                           v.status === 'Valid Sebagian' ? <AlertTriangle size={10} /> : <XCircle size={10} />}
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-600 text-xs">{v.catatan}</td>
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
