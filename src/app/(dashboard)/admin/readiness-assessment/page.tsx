'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { AlertCircle, Layers } from 'lucide-react';
import { DESA_BAB4, DIMENSI_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a237e';

export default function ReadinessAssessmentPage() {
  const [selectedId, setSelectedId] = useState<string>(DESA_BAB4[0].id);
  const desa = DESA_BAB4.find((d) => d.id === selectedId) ?? DESA_BAB4[0];

  const rows = DIMENSI_BAB4.map((dim, idx) => {
    const skor = desa.dimensi[dim.kode as keyof typeof desa.dimensi];
    const status = skor >= 68 ? 'Kuat' : skor >= 50 ? 'Sedang' : 'Prioritas';
    return {
      no: idx + 1,
      kode: dim.kode,
      kriteria: dim.nama,
      bobot: `${(dim.bobot * 100).toFixed(2)}%`,
      skor: `${skor.toFixed(2)}`,
      gap: `${(100 - skor).toFixed(2)}`,
      status,
    };
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageTitle fitur="Readiness Assessment (6 Dimensi · 24 Indikator)" modul="Hasil Penelitian RQ1 (Dataset SLV 1)" color={COLOR} />
        <div className="flex gap-1.5">
          {DESA_BAB4.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                d.id === selectedId
                  ? 'bg-indigo-700 text-white border-indigo-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {d.nama.replace('Desa ', '')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={`Skor Kesiapan (${desa.nama.replace('Desa ', '')})`} value={desa.skorKesiapan.toFixed(2)} satuan={`Kategori: ${desa.kategoriKesiapan}`} barColor="teal" progress={Math.round(desa.skorKesiapan)} />
        <StatCard label="Kesenjangan (Gap)" value={desa.kesenjangan.toFixed(2)} satuan="poin ke skor 100" barColor="red" progress={Math.round(desa.kesenjangan)} />
        <StatCard label="Struktur Kerangka" value="6 / 24" satuan="Dimensi · Indikator (CR 0,00144)" barColor="blue" progress={100} />
        <StatCard label="Responden 3 Desa" value="126" satuan="42/desa · 7 peran × 18" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Layers size={16} /> Lembar Evaluasi Kesiapan 6 Dimensi (D1–D6) — {desa.nama}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-3">Kode</th>
                    <th className="pb-2 pr-4">Dimensi Kesiapan</th>
                    <th className="pb-2 pr-4">Bobot AHP</th>
                    <th className="pb-2 pr-4">Skor (0–100)</th>
                    <th className="pb-2 pr-4">Gap</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((c, i) => (
                    <tr key={c.kode} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-3 text-indigo-700 font-mono font-bold text-xs">{c.kode}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700 text-xs">{c.kriteria}</td>
                      <td className="py-2.5 pr-4 text-slate-500 font-mono text-xs">{c.bobot}</td>
                      <td className="py-2.5 pr-4 font-bold text-slate-800 font-mono text-xs">{c.skor}</td>
                      <td className="py-2.5 pr-4 text-red-600 font-mono text-xs">{c.gap}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.status === 'Kuat' ? 'bg-green-100 text-green-700' :
                          c.status === 'Sedang' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {c.status}
                        </span>
                      </td>
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
              <AlertCircle size={16} /> Diagnosis &amp; Prioritas Bab IV
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs leading-relaxed text-slate-600">
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
              <p className="font-bold text-green-800 mb-1">Kekuatan Relatif ({desa.nama.replace('Desa ', '')})</p>
              <p>{desa.kekuatanRelatif}</p>
            </div>
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="font-bold text-red-800 mb-1">Prioritas Perbaikan Utama</p>
              <p>{desa.prioritasPerbaikan}</p>
            </div>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="font-bold text-indigo-900 mb-1">Rekomendasi DSS SAW #1</p>
              <p>
                <strong>{desa.dssPrioritas.kode} — {desa.dssPrioritas.nama}</strong> (skor preferensi {desa.dssPrioritas.skorSAW.toFixed(6)}, {desa.dssPrioritas.stabilitas}).
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="font-bold text-slate-700 mb-1">Perbandingan 3 Desa (Pra → Pasca RQ3)</p>
              <p>Jonggon Jaya: <strong>68,04</strong> (Tinggi) · Kedang Ipil: <strong>58,11</strong> (Sedang) · Lung Anai: <strong>48,39</strong> (Sedang). Rerata keseluruhan pra <strong>58,18</strong> → pasca <strong>60,45</strong> (p Holm = 0,0900, belum signifikan dalam 4 minggu).</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
