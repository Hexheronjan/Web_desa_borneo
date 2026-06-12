'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Landmark, CheckCircle, AlertTriangle, Eye, ShieldAlert } from 'lucide-react';

const COLOR = '#4527a0';

const evaluasiData = [
  { no: 1, program: 'Peningkatan Posyandu & Kesehatan KIA', target: 'Skor SDGs 3 = 82%', realisasi: 'KIA RT 01-05 Aktif', persen: 100, status: 'Tercapai', catatan: 'Pelayanan bidan desa berjalan optimal dan stunting rate tertahan.' },
  { no: 2, program: 'Pengadaan VSAT Satellite Internet RT 03', target: 'Internet 20Mbps RT 03', realisasi: 'Tower terpasang, router aktif', persen: 80, status: 'Proses', catatan: 'Penyambungan listrik panel surya cadangan sedang dikerjakan.' },
  { no: 3, program: 'Pelatihan Literasi Digital Guru & Siswa', target: 'Literasi digital naik 48%', realisasi: '2 kelas pelatihan terlaksana', persen: 50, status: 'Proses', catatan: 'Keterbatasan unit komputer mengharuskan kelas dibagi shift.' },
  { no: 4, program: 'Instalasi Air Bersih Sungai Huma', target: 'Akses Sanitasi 88%', realisasi: 'Pipa air bersih disalurkan', persen: 20, status: 'Belum', catatan: 'Bahan material ulin pipa filter air mengalami keterlambatan pengiriman.' },
  { no: 5, program: 'Penyusunan Rencana RPJMDes 2026-2032', target: 'Draft final disepakati', realisasi: 'Selesai ditandatangani BPD', persen: 100, status: 'Tercapai', catatan: 'Program prioritas AHP DSS diakomodasi sepenuhnya.' }
];

export default function EvaluasiProgramPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Evaluasi Program" modul="BPD (Badan Permusyawaratan Desa)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Program Kerja" value={12} satuan="kegiatan" barColor="purple" progress={80} />
        <StatCard label="Tercapai (Selesai)" value={5} satuan="kegiatan" barColor="green" progress={41} />
        <StatCard label="Dalam Proses (On-Going)" value={5} satuan="kegiatan" barColor="blue" progress={41} />
        <StatCard label="Keterlambatan/Belum" value={2} satuan="kegiatan" barColor="red" progress={18} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} /> Laporan Penilaian Evaluasi Kinerja Pembangunan Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">Nama Program</th>
                    <th className="pb-2 pr-4">Target Indikator</th>
                    <th className="pb-2 pr-4">Realisasi Fisik</th>
                    <th className="pb-2 pr-4 text-right">Persentase</th>
                    <th className="pb-2 pr-4 text-center">Status</th>
                    <th className="pb-2">Catatan Evaluasi / Rekomendasi BPD</th>
                  </tr>
                </thead>
                <tbody>
                  {evaluasiData.map((e, i) => (
                    <tr key={e.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-3 pr-4 text-center text-slate-400 font-mono text-xs">{e.no}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{e.program}</td>
                      <td className="py-3 pr-4 text-slate-600 text-xs">{e.target}</td>
                      <td className="py-3 pr-4 text-slate-500 text-xs font-mono">{e.realisasi}</td>
                      <td className="py-3 pr-4 text-right font-bold font-mono text-xs text-indigo-700">{e.persen}%</td>
                      <td className="py-3 pr-4 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          e.status === 'Tercapai' ? 'bg-green-100 text-green-700' :
                          e.status === 'Proses' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="py-3 text-slate-600 text-xs leading-relaxed">{e.catatan}</td>
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
