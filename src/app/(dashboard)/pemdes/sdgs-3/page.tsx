'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, CheckCircle2, ChevronRight } from 'lucide-react';

const COLOR = '#283593';

const healthIndicators = [
  { name: 'Ketersediaan Bidan Desa Terlatih', target: '100%', actual: '100%', status: 'Tercapai', color: 'bg-green-500' },
  { name: 'Angka Partisipasi Imunisasi Balita', target: '95%', actual: '92%', status: 'Hampir Tercapai', color: 'bg-amber-500' },
  { name: 'Pantauan Berkala Ibu Hamil (KIA)', target: '100%', actual: '100%', status: 'Tercapai', color: 'bg-green-500' },
  { name: 'Penurunan Angka Stunting Tahunan', target: '14%', actual: '14%', status: 'Tercapai', color: 'bg-green-500' }
];

export default function SDGs3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="SDGs 3 — Kehidupan Sehat dan Sejahtera" modul="Pemdes / Kepala Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Capaian SDGs 3" value="82%" satuan="skor pencapaian" barColor="green" progress={82} />
        <StatCard label="Total Balita" value={120} satuan="jiwa" barColor="blue" progress={50} />
        <StatCard label="Stunting Rate" value="14%" satuan="memenuhi target" barColor="green" progress={86} />
        <StatCard label="Ibu Hamil Terpantau" value="25" satuan="ibu aktif" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Heart size={16} className="text-red-500" /> Detail Indikator Kesehatan & Kesejahteraan Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthIndicators.map((ind, i) => (
                <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                    <span>{ind.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      ind.status === 'Tercapai' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{ind.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${ind.color}`} style={{ width: ind.actual }} />
                    </div>
                    <div className="w-24 text-right text-xs">
                      <span className="text-slate-400 font-medium">Target: {ind.target}</span>
                      <span className="block font-black text-slate-800">{ind.actual}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle2 size={16} /> Keaktifan Posyandu Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Terdapat 8 pos pelayanan posyandu aktif yang tersebar di wilayah administrasi desa adat:</p>
            <div className="space-y-2">
              {[
                { name: 'Posyandu RT 01 (Nyahu)', status: 'Aktif' },
                { name: 'Posyandu RT 02 (Betang)', status: 'Aktif' },
                { name: 'Posyandu RT 03 (Mahakam)', status: 'Aktif' },
                { name: 'Posyandu RT 04 (Kahayan)', status: 'Aktif' }
              ].map((pos, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-1">
                  <span>{pos.name}</span>
                  <span className="text-green-600 font-bold">{pos.status}</span>
                </div>
              ))}
            </div>
            <p className="pt-2 text-[10px] text-slate-400">
              *Jadwal kunjungan nakes diatur otomatis setiap awal bulan melalui Modul 45 (Nakes Posyandu).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
