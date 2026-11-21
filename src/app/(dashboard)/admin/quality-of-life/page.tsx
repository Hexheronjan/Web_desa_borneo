'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Smile, Users, MapPin, TrendingUp, BarChart3 } from 'lucide-react';
import { DESA_BAB4, PREPOST_6_KONSTRUK_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a237e';

export default function QualityOfLifePage() {
  const qolConstruct = PREPOST_6_KONSTRUK_BAB4.find((c) => c.sasaran === 'Manfaat awal kualitas hidup')!;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Manfaat Awal Kualitas Hidup (Quality of Life)" modul="Evaluasi Pra–Pasca RQ3 (Dataset SLV 3)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Pra → Pasca (N=126)" value="69,97" satuan={`Pra ${qolConstruct.sebelum.toFixed(2)} → Δ +${qolConstruct.delta.toFixed(2)}`} barColor="purple" progress={70} />
        <StatCard label="Median Perubahan (Δ)" value="+4,30" satuan="Proporsi + = 73,8% (93/126)" barColor="green" progress={74} />
        <StatCard label="Uji Tanda Eksak (Holm)" value="Signifikan" satuan={`p = ${qolConstruct.pHolm}`} barColor="blue" progress={95} />
        <StatCard label="Cakupan Evaluasi" value="3 Desa" satuan="42/desa · 7 peran × 18" barColor="orange" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Smile size={16} /> Perbandingan Perubahan Manfaat Awal Kualitas Hidup &amp; 6 Konstruk RQ3
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {DESA_BAB4.map((desa) => (
              <div key={desa.id} className="p-3.5 border rounded-xl bg-slate-50/60">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-indigo-600" /> {desa.nama} ({desa.kecamatan})
                  </span>
                  <span className="text-emerald-700 font-mono">Δ QoL: +{desa.prePostDelta.qol.toFixed(2)} poin</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] mt-2">
                  <div className="p-2 bg-white rounded-lg border">
                    <span className="text-slate-400 block text-[10px]">Integrasi Data</span>
                    <strong className="text-indigo-700">+{desa.prePostDelta.dataIntegration.toFixed(2)}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border">
                    <span className="text-slate-400 block text-[10px]">Pemantauan SDGs</span>
                    <strong className="text-blue-700">+{desa.prePostDelta.sdgMonitoring.toFixed(2)}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border">
                    <span className="text-slate-400 block text-[10px]">Kualitas Keputusan</span>
                    <strong className="text-purple-700">+{desa.prePostDelta.decisionQuality.toFixed(2)}</strong>
                  </div>
                  <div className="p-2 bg-white rounded-lg border">
                    <span className="text-slate-400 block text-[10px]">KPI SDGs Akhir</span>
                    <strong className="text-emerald-700">{desa.sdgKPI.akhir.toFixed(2)}%</strong>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Data Pengukuran RQ3 (Bab IV)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 leading-normal space-y-4">
            <p>
              Manfaat kualitas hidup pada siklus evaluasi 4 minggu dimaknai sebagai <strong>indikasi manfaat awal (proksimal)</strong> terhadap kemudahan layanan, akses informasi kesehatan/pendidikan, partisipasi, dan perlindungan budaya.
            </p>
            <div className="space-y-2.5">
              {[
                { label: 'Jumlah Partisipan Evaluasi', val: '126 partisipan (3 desa)' },
                { label: 'Distribusi Peran', val: '7 peran utama × 18 orang' },
                { label: 'Skor Rata-rata Pra → Pasca', val: '68,43 → 69,97 (+1,54)' },
                { label: 'Uji Statistik Utama', val: 'Exact Sign Test (p Holm 1,69×10⁻⁷)' },
                { label: 'Durasi Siklus Uji', val: '4 Minggu (Dataset SLV 3)' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between border-b pb-1 gap-2">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-semibold text-slate-700 text-right">{item.val}</span>
                </div>
              ))}
            </div>
            <p className="pt-2 border-t text-slate-400 text-[10px]">
              *Perubahan kualitas hidup jangka panjang memerlukan pengamatan longitudinal melampaui siklus uji 4 minggu.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
