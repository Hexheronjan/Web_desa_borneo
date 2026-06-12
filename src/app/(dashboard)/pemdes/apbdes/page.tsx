'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { TrendingUp, CheckCircle, Percent } from 'lucide-react';

const COLOR = '#283593';

const apbdesDetails = [
  { no: 1, bidang: 'Bidang Penyelenggaraan Pemerintahan Desa', anggaran: 'Rp 250.050.000', realisasi: 'Rp 200.000.000', persen: 80.0 },
  { no: 2, bidang: 'Bidang Pelaksanaan Pembangunan Desa', anggaran: 'Rp 450.000.000', realisasi: 'Rp 340.000.000', persen: 75.5 },
  { no: 3, bidang: 'Bidang Pembinaan Kemasyarakatan Desa', anggaran: 'Rp 200.000.000', realisasi: 'Rp 150.000.000', persen: 75.0 },
  { no: 4, bidang: 'Bidang Pemberdayaan Masyarakat Desa', anggaran: 'Rp 250.000.000', realisasi: 'Rp 150.400.000', persen: 60.1 },
  { no: 5, bidang: 'Bidang Penanggulangan Bencana & Darurat', anggaran: 'Rp 100.000.000', realisasi: 'Rp 60.000.000', persen: 60.0 }
];

export default function APBDesPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="APBDes (Anggaran Pendapatan dan Belanja Desa)" modul="Pemdes / Kepala Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Anggaran" value="Rp 1.25B" satuan="anggaran tahunan" barColor="blue" progress={100} />
        <StatCard label="Realisasi APBDes" value="Rp 900.4M" satuan="72.45% terserap" barColor="green" progress={72} />
        <StatCard label="Sisa Anggaran" value="Rp 349.6M" satuan="dana tersedia" barColor="purple" progress={28} />
        <StatCard label="Efisiensi Penyerapan" value="95%" satuan="nilai akuntabilitas" barColor="green" progress={95} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Realisasi Anggaran Desa per Bidang Pembangunan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">Bidang Pembiayaan</th>
                    <th className="pb-2 pr-4 text-right">Pagu Anggaran</th>
                    <th className="pb-2 pr-4 text-right">Realisasi</th>
                    <th className="pb-2 text-right">Persentase</th>
                  </tr>
                </thead>
                <tbody>
                  {apbdesDetails.map((b, i) => (
                    <tr key={b.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{b.no}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{b.bidang}</td>
                      <td className="py-2.5 pr-4 text-right font-mono text-xs text-slate-600">{b.anggaran}</td>
                      <td className="py-2.5 pr-4 text-right font-mono text-xs text-indigo-700">{b.realisasi}</td>
                      <td className="py-2.5 text-right font-bold font-mono text-xs" style={{ color: COLOR }}>{b.persen.toFixed(1)}%</td>
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
              <Percent size={16} /> Progress Penyerapan Dana
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>Rincian progres penyerapan dana desa berjalan:</p>
            <div className="space-y-3">
              {apbdesDetails.map((b, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-0.5 text-[10px] font-semibold text-slate-600">
                    <span className="truncate max-w-[150px]">{b.bidang.replace('Bidang ', '')}</span>
                    <span>{b.persen}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-700 rounded-full" style={{ width: `${b.persen}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t text-[10px] text-slate-400">
              *Diperbarui secara berkala oleh Operator Keuangan Desa dan divalidasi oleh BPD (Badan Permusyawaratan Desa).
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
