'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Lock, AlertCircle, RefreshCw, BarChart2, Award, FileText } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { DESA_BAB4, DIMENSI_BAB4 } from '@/lib/bab4-data';

const COLOR = '#6a1b9a';

export default function HasilReadinessPage() {
  const [selectedDesaId, setSelectedDesaId] = useState<string>('lung-anai');
  const desa = DESA_BAB4.find((d) => d.id === selectedDesaId) ?? DESA_BAB4[2];

  const radarData = DIMENSI_BAB4.map((d) => ({
    aspek: d.singkat,
    nilai: desa.dimensi[d.kode as keyof typeof desa.dimensi],
    target: 85,
  }));

  const gaps = [...radarData]
    .sort((a, b) => a.nilai - b.nilai)
    .slice(0, 3)
    .map((item, idx) => ({
      aspek: item.aspek,
      skor: item.nilai,
      gap: Number((100 - item.nilai).toFixed(2)),
      prioritas: idx === 0 ? 'Sangat Tinggi' : idx === 1 ? 'Tinggi' : 'Sedang',
    }));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Ringkasan Kesiapan Desa (6 Dimensi &amp; 24 Indikator — Bab IV)" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Akses Tinjauan Terkunci (Read-Only)</p>
          <p className="text-amber-700 mt-0.5 font-medium leading-relaxed">
            Tokoh Masyarakat melihat ringkasan kesiapan tingkat desa untuk mendukung aspirasi dan pengawasan sosial, tanpa kewenangan mengubah bobot AHP atau hasil penilaian resmi.
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {DESA_BAB4.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDesaId(d.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
              selectedDesaId === d.id ? 'bg-purple-700 text-white border-purple-700' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {d.nama} ({d.skorKesiapan.toFixed(2)})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Kesiapan Desa" value={desa.skorKesiapan.toFixed(2).replace('.', ',')} satuan="Skor (0–100)" barColor="purple" progress={desa.skorKesiapan} />
        <StatCard label="Kategori Deskriptif" value={desa.kategoriKesiapan.toUpperCase()} satuan={`Kesenjangan: ${desa.kesenjangan.toFixed(2)}`} barColor="green" progress={100} />
        <StatCard label="Struktur Kerangka" value="6 Dimensi" satuan="24 Indikator · Bobot AHP" barColor="blue" progress={100} />
        <StatCard label="Rekomendasi DSS #1" value={desa.dssPrioritas.kode} satuan={`SAW: ${desa.dssPrioritas.skorSAW.toFixed(4)}`} barColor="orange" progress={92} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Grafik Radar 6 Dimensi Kesiapan — {desa.nama} (Tabel 4.17)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#475569', fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                  <Radar name="Skor Desa" dataKey="nilai" stroke="#6a1b9a" fill="#6a1b9a" fillOpacity={0.2} strokeWidth={2} />
                  <Radar name="Acuan Ideal" dataKey="target" stroke="#94a3b8" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-[10px] font-bold mt-2">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-purple-700 rounded-sm" /> Skor {desa.nama} ({desa.skorKesiapan.toFixed(2)})</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-0.5 border-t-2 border-dashed border-slate-400" /> Acuan Ideal (85)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertCircle size={16} /> 3 Kesenjangan Utama (Gap terhadap 100)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {gaps.map((g, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700">{g.aspek}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-100 text-red-700">{g.prioritas}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Skor: <b>{g.skor.toFixed(2)}</b> / 100</span>
                  <span className="text-red-600 font-bold">Gap: {g.gap.toFixed(2)}</span>
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
              <Award size={16} /> Rekomendasi Prioritas DSS (Bahan Musyawarah)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-3 text-slate-600">
            <div className="p-3 bg-green-50/60 rounded-lg border border-green-100 space-y-1">
              <p className="font-bold text-green-900">Prioritas #1: {desa.dssPrioritas.kode} — {desa.dssPrioritas.nama}</p>
              <p className="text-green-700 leading-normal">Skor SAW: <strong>{desa.dssPrioritas.skorSAW.toFixed(4)}</strong> ({desa.dssPrioritas.stabilitas}). Penetapan akhir dilakukan melalui musyawarah bersama Pemerintah Desa &amp; Lembaga Adat.</p>
            </div>
            <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-100 space-y-1">
              <p className="font-bold text-purple-900">Kekuatan Relatif: {desa.kekuatanRelatif}</p>
              <p className="text-purple-700 leading-normal">{desa.konteks}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <FileText size={16} /> Penjelasan Ringkas Hasil (Bab IV)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
            <p>
              Kerangka Kesiapan Smart Living Village terdiri atas <strong>6 dimensi (D1–D6) dan 24 indikator (I01–I24)</strong> dengan bobot AHP (CR dimensi = 0,00144). Skor kesiapan ketiga desa penelitian adalah <strong>Jonggon Jaya (68,04 — Tinggi)</strong>, <strong>Kedang Ipil (58,11 — Sedang)</strong>, dan <strong>Lung Anai (48,39 — Sedang)</strong>.
            </p>
            <p>
              Skor tidak digunakan untuk menilai tinggi-rendahnya nilai budaya antardesa, melainkan untuk mengenali kesenjangan dan menentukan prioritas perbaikan kontekstual (seperti mode luring-utama di Lung Anai dan penguatan pemantauan SDGs di Jonggon Jaya).
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50 mt-1">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Sumber: Dataset SLV 1 v1.2 (Bab IV, Tabel 4.11, 4.16 &amp; 4.17)</span>
        <span>Periode Evaluasi: Tahun 2026</span>
      </div>
    </div>
  );
}
