'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { RefreshCw, BarChart2, AlertTriangle, Layers, FileText, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { DESA_BAB4, DIMENSI_BAB4, INDIKATOR_24_BAB4, PREPOST_6_KONSTRUK_BAB4 } from '@/lib/bab4-data';

const COLOR = '#283593';

export default function HasilPenilaianDesaPage() {
  const [compMode, setCompMode] = useState<'desa' | 'dimensi' | 'prepost'>('desa');

  const desaData = DESA_BAB4.map((d) => ({
    name: d.nama.replace('Desa ', ''),
    kesiapan: d.skorKesiapan,
    sdgPasca: d.sdgKPI.akhir,
  }));

  const dimensiData = DIMENSI_BAB4.map((dim) => ({
    name: dim.singkat,
    jonggonJaya: DESA_BAB4[0].dimensi[dim.kode as keyof typeof DESA_BAB4[0]['dimensi']],
    kedangIpil: DESA_BAB4[1].dimensi[dim.kode as keyof typeof DESA_BAB4[1]['dimensi']],
    lungAnai: DESA_BAB4[2].dimensi[dim.kode as keyof typeof DESA_BAB4[2]['dimensi']],
  }));

  const prepostData = PREPOST_6_KONSTRUK_BAB4.filter((p) => p.sasaran !== 'Kematangan digital').map((p) => ({
    name: p.sasaran.replace('Manfaat awal ', ''),
    sebelum: p.sebelum,
    sesudah: p.sesudah,
  }));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Hasil Penilaian Desa (RQ1 &amp; RQ3 — Bab IV)" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kesiapan (Pra → Pasca)" value="58,18 → 60,45" satuan="Δ +2,27 (N=126; p=0,0900)" barColor="blue" progress={60.45} />
        <StatCard label="Kematangan (N=121)" value="1,94 → 2,53" satuan="Δ +0,59 · Signifikan" barColor="purple" progress={50.6} />
        <StatCard label="Kualitas Hidup Awal" value="68,43 → 69,97" satuan="Δ +1,54 · Signifikan" barColor="green" progress={69.97} />
        <StatCard label="Capaian KPI SDGs" value="72,76% → 80,67%" satuan="+7,90 pp (54 Unit KPI)" barColor="orange" progress={80.67} />
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 p-3 bg-slate-50 border rounded-xl">
        <span className="text-xs font-bold text-slate-700">Mode Perbandingan Hasil Penilaian (Bab IV):</span>
        <div className="flex gap-1.5 flex-wrap">
          {[
            { key: 'desa', label: 'Antardesa (3 Lokus)' },
            { key: 'dimensi', label: 'Antardimensi (D1–D6)' },
            { key: 'prepost', label: 'Sebelum vs Sesudah (RQ3)' },
          ].map((opt) => (
            <button
              key={opt.key}
              onClick={() => setCompMode(opt.key as typeof compMode)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${compMode === opt.key ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-600 hover:bg-slate-100'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} />{' '}
              {compMode === 'desa'
                ? 'Perbandingan Skor Kesiapan & KPI SDGs Pasca (3 Desa)'
                : compMode === 'dimensi'
                ? 'Profil 6 Dimensi Kesiapan Tiga Desa (Tabel 4.17)'
                : 'Perubahan Skor Sebelum & Sesudah Implementasi (Tabel 4.40)'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                {compMode === 'desa' ? (
                  <BarChart data={desaData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="kesiapan" name="Skor Kesiapan RQ1" fill="#283593" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sdgPasca" name="Capaian KPI SDGs Pasca (%)" fill="#2e7d32" radius={[4, 4, 0, 0]} />
                  </BarChart>
                ) : compMode === 'dimensi' ? (
                  <BarChart data={dimensiData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="jonggonJaya" name="Jonggon Jaya" fill="#1d4ed8" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="kedangIpil" name="Kedang Ipil" fill="#0f766e" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="lungAnai" name="Lung Anai" fill="#b45309" radius={[3, 3, 0, 0]} />
                  </BarChart>
                ) : (
                  <BarChart data={prepostData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="sebelum" name="Sebelum (Pra)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="sesudah" name="Sesudah (Pasca)" fill="#283593" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Prioritas Perbaikan per Desa (Tabel 4.16)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
              <p className="font-bold text-indigo-800">Jonggon Jaya (68,04 — Tinggi)</p>
              <p className="text-[10px] text-slate-600">Prioritas: <strong>D6 Pemantauan SDGs &amp; DSS (58,40)</strong> → A08 Dasbor SDGs 3, 4, 18 (SAW 0,9509).</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
              <p className="font-bold text-amber-800">Kedang Ipil (58,11 — Sedang)</p>
              <p className="text-[10px] text-slate-600">Kekuatan D5 (86,58); prioritas <strong>D4 Integrasi Data (47,44)</strong> &amp; D2 (48,40) → A02 (SAW 0,9200).</p>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1">
              <p className="font-bold text-red-800">Lung Anai (48,39 — Sedang)</p>
              <p className="text-[10px] text-slate-600">Kekuatan D5 tertinggi (89,73); prioritas <strong>D2 Infrastruktur (30,75)</strong> → mode luring-utama &amp; A02 (SAW 0,9117).</p>
            </div>
            <div className="p-2.5 bg-slate-50 border rounded-xl space-y-1 text-[10px] text-slate-500">
              <p className="flex items-center gap-1 font-semibold text-slate-700"><FileText size={11} /> Dataset SLV 1, SLV 2, SLV 3 v1.2</p>
              <p className="flex items-center gap-1"><ShieldCheck size={11} /> 126 Partisipan · Desain Sebelum–Sesudah (4 Minggu)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Layers size={16} /> Daftar Lengkap 6 Dimensi &amp; 24 Indikator Final (Tabel 4.11 &amp; 4.13D)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5">Kode</th>
                    <th className="p-2.5">Dimensi</th>
                    <th className="p-2.5">Indikator Final</th>
                    <th className="p-2.5 text-right">Bobot Lokal</th>
                    <th className="p-2.5 text-right">Bobot Global</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INDIKATOR_24_BAB4.map((ind) => (
                    <tr key={ind.kode} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-mono font-bold text-indigo-700">{ind.kode}</td>
                      <td className="p-2.5 font-semibold text-slate-700">{ind.dimensiKode} — {ind.dimensiNama}</td>
                      <td className="p-2.5 text-slate-700">{ind.nama}</td>
                      <td className="p-2.5 text-right font-mono text-slate-600">{ind.bobotLokal.toFixed(6)}</td>
                      <td className="p-2.5 text-right font-mono font-bold text-indigo-700">{ind.bobotGlobal.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Sumber: Bab IV — Dataset SLV 1 &amp; SLV 3 v1.2 (Jonggon Jaya, Kedang Ipil, Lung Anai)</span>
        <span>Koreksi Holm α = 0,05 (5/6 Konstruk Signifikan)</span>
      </div>
    </div>
  );
}
