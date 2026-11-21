'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip,
} from 'recharts';
import { Target, AlertTriangle, RefreshCw, BarChart2 } from 'lucide-react';
import { useState } from 'react';
import { DESA_BAB4, DIMENSI_BAB4, INDIKATOR_24_BAB4 } from '@/lib/bab4-data';

const COLOR = '#283593';

export default function PenilaianKesiapanPage() {
  const [selectedDesaId, setSelectedDesaId] = useState<string>('lung-anai');
  const [activeTab, setActiveTab] = useState<'dimensi' | 'radar'>('dimensi');

  const desa = DESA_BAB4.find((d) => d.id === selectedDesaId) ?? DESA_BAB4[2];

  const dimensiRows = DIMENSI_BAB4.map((d) => {
    const skor = desa.dimensi[d.kode as keyof typeof desa.dimensi];
    const inds = INDIKATOR_24_BAB4.filter((i) => i.dimensiKode === d.kode);
    return {
      kode: d.kode,
      dimensi: `${d.kode} — ${d.nama}`,
      singkat: d.singkat,
      skor,
      gap: Number((100 - skor).toFixed(2)),
      bobot: d.bobot,
      indikatorText: inds.map((i) => `${i.kode} (${i.nama})`).join('; '),
    };
  });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Penilaian Kesiapan (6 Dimensi &amp; 24 Indikator — Bab IV Tabel 4.16–4.17)" modul="Pemerintah Desa" color={COLOR} />

      {/* PILIH DESA PENELITIAN */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border rounded-xl">
        <span className="text-xs font-bold text-slate-700">Lokus Desa Penelitian (Kab. Kutai Kartanegara):</span>
        <div className="flex gap-1.5 flex-wrap">
          {DESA_BAB4.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDesaId(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                selectedDesaId === d.id ? 'bg-indigo-700 text-white border-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {d.nama} ({d.skorKesiapan.toFixed(2)})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Kesiapan Desa" value={desa.skorKesiapan.toFixed(2)} satuan={`Kategori: ${desa.kategoriKesiapan}`} barColor="blue" progress={desa.skorKesiapan} />
        <StatCard label="Kesenjangan (100 − S)" value={desa.kesenjangan.toFixed(2)} satuan="Jarak ke Skor Maksimum" barColor="orange" progress={desa.kesenjangan} />
        <StatCard label="Struktur Kerangka" value="6 Dimensi" satuan="24 Indikator · Bobot AHP" barColor="green" progress={100} />
        <StatCard label="Konsistensi AHP" value="CR 0,00144" satuan="S-CVI 1,000 · α 0,9367" barColor="purple" progress={100} />
      </div>

      <div className="flex gap-2">
        <button onClick={() => setActiveTab('dimensi')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors border ${activeTab === 'dimensi' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Daftar 6 Dimensi &amp; 24 Indikator</button>
        <button onClick={() => setActiveTab('radar')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors border ${activeTab === 'radar' ? 'bg-indigo-700 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Grafik Radar 6 Dimensi</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          {activeTab === 'dimensi' ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                  <BarChart2 size={16} /> Skor Kesiapan per Dimensi — {desa.nama} (Tabel 4.17)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5">
                {dimensiRows.map((d) => (
                  <div key={d.kode} className="p-3.5 border rounded-xl bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700 gap-2">
                      <span>{d.dimensi}</span>
                      <span className="text-indigo-900 font-mono whitespace-nowrap">{d.skor.toFixed(2)} / 100 (Gap {d.gap.toFixed(2)})</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-indigo-700" style={{ width: `${d.skor}%` }} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500">W={d.bobot.toFixed(5)}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-snug">Indikator: {d.indikatorText}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                  <Target size={16} /> Analisis Radar 6 Dimensi — {desa.nama}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={dimensiRows}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="singkat" tick={{ fontSize: 10, fill: '#475569' }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                      <Radar name="Skor Kesiapan" dataKey="skor" stroke={COLOR} fill={COLOR} fillOpacity={0.3} strokeWidth={2} />
                      <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Diagnosis &amp; Prioritas — {desa.nama}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <p className="font-bold text-red-700">Prioritas Perbaikan Utama</p>
              <p className="text-[11px] text-red-900 font-semibold leading-relaxed">{desa.prioritasPerbaikan}</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl space-y-1">
              <p className="font-bold text-green-700">Kekuatan Relatif Desa</p>
              <p className="text-[11px] text-green-900 font-semibold leading-relaxed">{desa.kekuatanRelatif}</p>
            </div>
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
              <p className="font-bold text-indigo-800">Rekomendasi DSS SAW #1</p>
              <p className="text-[11px] text-slate-700 font-semibold">{desa.dssPrioritas.kode} — {desa.dssPrioritas.nama}</p>
              <p className="text-[10px] text-indigo-700 font-mono">Skor SAW: {desa.dssPrioritas.skorSAW.toFixed(4)} ({desa.dssPrioritas.stabilitas})</p>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed italic">
              Catatan Bab IV: Skor digunakan untuk diagnosis dan penentuan prioritas perbaikan, bukan untuk memberi peringkat normatif nilai budaya antardesa.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Sumber: Dataset SLV 1 v1.2 — 126 Responden (42/Desa) &amp; Bobot Global AHP 3 Pakar</span>
        <span>Rerata Awal 3 Desa: 58,18 → Pasca: 60,45</span>
      </div>
    </div>
  );
}
