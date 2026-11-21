'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { ShieldCheck, RefreshCw, BarChart2, Smile, TrendingUp, Heart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DESA_BAB4, PREPOST_6_KONSTRUK_BAB4 } from '@/lib/bab4-data';

const COLOR = '#6a1b9a';

export default function HasilQoLPage() {
  const qol = PREPOST_6_KONSTRUK_BAB4.find((c) => c.sasaran === 'Manfaat awal kualitas hidup')!;
  const chartData = PREPOST_6_KONSTRUK_BAB4.filter((c) => c.sasaran !== 'Kematangan digital').map((c) => ({
    aspek: c.sasaran.replace('Manfaat awal ', ''),
    Pra: c.sebelum,
    Pasca: c.sesudah,
  }));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Ringkasan Manfaat Awal Kualitas Hidup (Bab IV)" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-purple-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Penyajian Data Agregat Tingkat Desa (N = 126 Partisipan)</p>
          <p className="text-purple-700 mt-0.5 font-medium leading-relaxed">
            Seluruh data manfaat awal kualitas hidup (QoL) disajikan secara agregat lintas 3 desa (Jonggon Jaya, Kedang Ipil, Lung Anai) untuk menjaga privasi individu serta dibaca sebagai manfaat awal proksimal selama 4 minggu implementasi.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Pasca QoL (N=126)" value="69,97" satuan={`Pra ${qol.sebelum.toFixed(2)} (Δ +${qol.delta.toFixed(2)})`} barColor="purple" progress={70} />
        <StatCard label="Median Perubahan (Δ)" value="+4,30" satuan="Proporsi positif: 73,8%" barColor="green" progress={74} />
        <StatCard label="Uji Tanda Eksak (Holm)" value="Signifikan" satuan={`p Holm = ${qol.pHolm}`} barColor="blue" progress={95} />
        <StatCard label="Capaian 54 KPI SDGs" value="80,67%" satuan="Awal 72,76% (+7,90 poin)" barColor="orange" progress={81} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Perbandingan Pra vs Pasca 5 Konstruk RQ3 (Skala 0–100)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[40, 80]} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="Pra" name="Pra (Baseline)" fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  <Bar dataKey="Pasca" name="Pasca (Minggu 4)" fill="#6a1b9a" radius={[4, 4, 0, 0]} maxBarSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Smile size={16} /> Perubahan per Desa (Tabel 4.43)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {DESA_BAB4.map((d) => (
              <div key={d.id} className="p-2.5 bg-slate-50 border rounded-lg space-y-1">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>{d.nama}</span>
                  <span className="text-emerald-700">Δ QoL +{d.prePostDelta.qol.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>SDGs 3 / 4 / 18:</span>
                  <span className="font-semibold text-slate-700">{d.sdgKPI.sdg3}% / {d.sdgKPI.sdg4}% / {d.sdgKPI.sdg18}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Ringkasan Perubahan Siklus 4 Minggu
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
            <p>
              Skor manfaat awal kualitas hidup meningkat dari <strong>68,43</strong> menjadi <strong>69,97</strong> (Δ rerata <strong>+1,54</strong>; median Δ <strong>+4,30</strong>; 93 partisipan meningkat dan 33 menurun dari N=126).
            </p>
            <p>
              Kenaikan signifikan juga teramati pada integrasi data (+7,71), pemantauan SDGs Desa (+7,62), kualitas keputusan (+6,82), dan kematangan digital (+0,59 pada N=121).
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Heart size={16} /> Pengalaman Penggunaan &amp; Batas Interpretasi
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
            <p>
              Peran <strong>Tokoh Masyarakat</strong> (N=18) mencatat UAT <strong>84,72%</strong>, kualitas total <strong>3,46/5</strong>, dan SUS <strong>62,78</strong>. Masukan warga dan pengawasan sosial membantu menjaga keterlacakan musyawarah desa.
            </p>
            <p>
              Sesuai Bab IV, hasil 4 minggu tanpa kelompok kontrol dibaca sebagai perubahan implementatif proksimal, bukan klaim kausal tunggal jangka panjang.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50 mt-1">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Sumber: Dataset SLV 3 v1.2 — Tabel 4.40 s.d. 4.45 Bab IV</span>
        <span>Kab. Kutai Kartanegara · 2026</span>
      </div>
    </div>
  );
}
