'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { RefreshCw, BarChart2, CheckCircle2, ShieldCheck, Compass, Activity } from 'lucide-react';
import { useState } from 'react';
import { PREPOST_6_KONSTRUK_BAB4 } from '@/lib/bab4-data';

const COLOR = '#283593';

const CAPAIAN_PROGRAM = [
  {
    program: 'A08 — Dasbor SDGs Desa 3, 4, dan 18 (Prioritas #1 Jonggon Jaya — SAW 0,9509)',
    capaian: 'Capaian 18 KPI SDGs Jonggon Jaya naik dari 73,81% → 81,78% (+7,97 poin)',
    kualitasData: 'UAT Jonggon Jaya 89,44% · SUS 66,19 · Rubrik Kematangan 2,21 → 2,68',
    kendala: 'Pembaruan data lintas layanan masih memerlukan koordinasi rutin',
    manfaat: 'Integrasi data (+6,20), pemantauan SDGs (+7,39), dan kualitas keputusan (+6,71) meningkat',
    perbaikan: 'Penguatan verifikasi berkala dan perbaikan + retest fitur F-029 kesehatan',
  },
  {
    program: 'A02 — Penguatan Konektivitas, Perangkat & Mode Luring (Prioritas #1 Kedang Ipil 0,9200 & Lung Anai 0,9117)',
    capaian: 'Tingkat penyelesaian tugas 4 minggu naik dari 82,14% → 98,41% (kesalahan 93 → 0)',
    kualitasData: 'Waktu luring tercatat: Lung Anai 2.928 mnt, Kedang Ipil 918 mnt, Jonggon Jaya 915 mnt',
    kendala: 'Keterbatasan sinyal & listrik pada wilayah terluar Lung Anai serta pendampingan peran Guru',
    manfaat: 'Kesiapan Lung Anai naik +8,80 poin dan kematangan rubrik naik +0,63 (1,80 → 2,43)',
    perbaikan: 'Penguatan sinkronisasi luring, cadangan daya, dan panduan sederhana untuk Guru (SDG 4)',
  },
];

export default function EvaluasiCapaianPage() {
  const [umpanBalikText, setUmpanBalikText] = useState('');
  const [submittedUB, setSubmittedUB] = useState(false);

  const chartData = PREPOST_6_KONSTRUK_BAB4.filter((c) => c.sasaran !== 'Kematangan digital').map((c) => ({
    name: c.sasaran.replace('Manfaat awal ', ''),
    awal: c.sebelum,
    akhir: c.sesudah,
  }));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Evaluasi Capaian Pra–Pasca (RQ3 Bab IV)" modul="Pemerintah Desa" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <ShieldCheck size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Umpan Balik Evaluasi Siklus 4 Minggu (Dataset SLV 3 v1.2)</p>
          <p className="text-blue-800 mt-0.5 font-medium leading-relaxed">
            Hasil evaluasi ini menjadi <strong>umpan balik terhadap kualitas data, perbaikan DSS, fitur F-029, dan pendampingan peran</strong>. Lima dari enam konstruk meningkat signifikan setelah koreksi Holm; kesiapan digital naik +2,27 namun belum signifikan (p = 0,0900).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kesiapan (N=126)" value="+2,27" satuan="58,18 → 60,45 (p=0,0900 NS)" barColor="blue" progress={60} />
        <StatCard label="Kematangan (N=121)" value="+0,59" satuan="1,94 → 2,53 (Signifikan)" barColor="purple" progress={51} />
        <StatCard label="Manfaat QoL (N=126)" value="+1,54" satuan="68,43 → 69,97 (Median +4,30)" barColor="green" progress={70} />
        <StatCard label="54 KPI SDGs Desa" value="+7,90" satuan="72,76% → 80,67%" barColor="orange" progress={81} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Perbandingan Kondisi Awal (Pra) vs Kondisi Akhir (Pasca 4 Minggu)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[210px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} />
                  <YAxis domain={[40, 80]} tick={{ fontSize: 9, fill: '#64748b' }} />
                  <Tooltip contentStyle={{ fontSize: 10 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="awal" name="Kondisi Awal (Pra)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="akhir" name="Kondisi Akhir (Pasca)" fill="#283593" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5">Konstruk RQ3</th>
                    <th className="p-2.5 text-center">N</th>
                    <th className="p-2.5 text-right">Pra</th>
                    <th className="p-2.5 text-right">Pasca</th>
                    <th className="p-2.5 text-right text-indigo-700">Δ Rerata</th>
                    <th className="p-2.5 text-center">Status (Holm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PREPOST_6_KONSTRUK_BAB4.map((e) => (
                    <tr key={e.sasaran} className="hover:bg-slate-50/50 font-medium">
                      <td className="p-2.5 text-slate-800 font-bold">{e.sasaran}</td>
                      <td className="p-2.5 text-center font-mono">{e.n}</td>
                      <td className="p-2.5 text-right font-mono text-slate-500">{e.sebelum.toFixed(2)}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-slate-800">{e.sesudah.toFixed(2)}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-green-700">+{e.delta.toFixed(2)}</td>
                      <td className="p-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${e.signifikan ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {e.signifikan ? `Sig (${e.pHolm})` : `NS (${e.pHolm})`}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Compass size={16} /> Umpan Balik Periode Berikutnya
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 text-xs">
            <p className="text-slate-500 leading-relaxed">
              Catat masukan, kendala lapangan, atau penyesuaian bobot kriteria DSS SAW (C1–C6) untuk bahan musyawarah periode berikutnya.
            </p>
            {submittedUB ? (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
                <CheckCircle2 size={14} /> Umpan balik berhasil disimpan untuk evaluasi periode berikutnya!
              </div>
            ) : (
              <div className="space-y-2">
                <textarea
                  rows={4}
                  value={umpanBalikText}
                  onChange={(e) => setUmpanBalikText(e.target.value)}
                  placeholder="Contoh: Perlu penguatan sinkronisasi luring Lung Anai dan pendampingan peran Guru untuk SDG 4..."
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300 text-slate-700"
                />
                <button
                  onClick={() => { if (umpanBalikText) setSubmittedUB(true); }}
                  className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold"
                >
                  Kirim Umpan Balik Evaluasi
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Detail Evaluasi Program Prioritas DSS SAW (A08 &amp; A02)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {CAPAIAN_PROGRAM.map((p, idx) => (
              <div key={idx} className="p-3.5 border rounded-xl bg-slate-50/50 space-y-2">
                <p className="font-bold text-slate-800 text-xs">{p.program}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] pt-1 border-t border-dashed">
                  <div><span className="font-bold text-slate-500 block">Capaian Realisasi:</span><span className="text-slate-700 font-medium">{p.capaian}</span></div>
                  <div><span className="font-bold text-slate-500 block">Bukti Evaluasi RQ3:</span><span className="text-slate-700 font-medium">{p.kualitasData}</span></div>
                  <div><span className="font-bold text-slate-500 block">Kendala Lapangan:</span><span className="text-red-700 font-medium">{p.kendala}</span></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] pt-2 border-t border-dashed">
                  <div><span className="font-bold text-slate-500 block">Manfaat Teramati:</span><span className="text-green-700 font-medium italic">"{p.manfaat}"</span></div>
                  <div><span className="font-bold text-slate-500 block">Agenda Penyempurnaan (Tabel 4.52):</span><span className="text-indigo-900 font-semibold">{p.perbaikan}</span></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Sumber: Dataset SLV 3 v1.2 — Evaluasi 4 Minggu 3 Desa Penelitian</span>
        <span>Kab. Kutai Kartanegara · 2026</span>
      </div>
    </div>
  );
}
