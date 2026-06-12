'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { TrendingUp, FileText, CheckCircle2 } from 'lucide-react';

const COLOR = '#4527a0';

const bpdApbdes = [
  { name: 'Penyelenggaraan Pemerintahan Desa', anggaran: 250050000, realisasi: 200000000, persen: 80.0 },
  { name: 'Pelaksanaan Pembangunan Desa', anggaran: 450000000, realisasi: 340000000, persen: 75.5 },
  { name: 'Pembinaan Kemasyarakatan Desa', anggaran: 200000000, realisasi: 150000000, persen: 75.0 },
  { name: 'Pemberdayaan Masyarakat Desa', anggaran: 250000000, realisasi: 150400000, persen: 60.1 },
  { name: 'Penanggulangan Bencana & Keadaan Darurat', anggaran: 100000000, realisasi: 60000000, persen: 60.0 }
];

export default function TransparansiAPBDesPage() {
  const totalAnggaran = 1250050000;
  const totalRealisasi = 900400000;
  const realisasiPct = ((totalRealisasi / totalAnggaran) * 100).toFixed(2);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Transparansi APBDes" modul="BPD (Badan Permusyawaratan Desa)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pagu APBDes" value="Rp 1.25B" satuan="tahun berjalan" barColor="purple" progress={100} />
        <StatCard label="Total Realisasi" value="Rp 900.4M" satuan="penyerapan 72.45%" barColor="green" progress={72} />
        <StatCard label="Sisa Anggaran" value="Rp 349.6M" satuan="tersedia" barColor="blue" progress={28} />
        <StatCard label="Audit Kepatuhan BPD" value="Sesuai" satuan="terverifikasi" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Laporan Alokasi Anggaran Belanja Desa Real-Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4">Bidang Belanja</th>
                    <th className="pb-2 pr-4 text-right">Pagu Anggaran</th>
                    <th className="pb-2 pr-4 text-right">Realisasi</th>
                    <th className="pb-2 text-right">Rasio Penyerapan</th>
                  </tr>
                </thead>
                <tbody>
                  {bpdApbdes.map((b, i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{b.name}</td>
                      <td className="py-2.5 pr-4 text-right font-mono text-xs text-slate-600">Rp {b.anggaran.toLocaleString('id-ID')}</td>
                      <td className="py-2.5 pr-4 text-right font-mono text-xs text-indigo-700">Rp {b.realisasi.toLocaleString('id-ID')}</td>
                      <td className="py-2.5 text-right font-bold font-mono text-xs text-indigo-700">{b.persen.toFixed(1)}%</td>
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
              <FileText size={16} /> Hasil Audit Transparansi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>BPD memvalidasi laporan keuangan desa untuk memastikan kepatuhan alokasi program pembangunan:</p>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg space-y-2">
              <p className="font-bold text-indigo-900 flex items-center gap-1">✔️ Verifikasi BPD: VALID</p>
              <p>Realisasi anggaran sebesar Rp 900.400.000 (72,45%) dari pagu Rp 1.250.050.000 cocok dengan bukti fisik pelaksanaan program di lapangan.</p>
            </div>
            <div className="pt-2 border-t">
              <p className="font-bold text-slate-700 mb-1.5 font-mono">Status Penggunaan Anggaran:</p>
              <div className="space-y-2">
                {bpdApbdes.map((b, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-0.5 text-[10px]">
                      <span className="truncate max-w-[120px]">{b.name}</span>
                      <span>{b.persen.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-700 rounded-full" style={{ width: `${b.persen}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
