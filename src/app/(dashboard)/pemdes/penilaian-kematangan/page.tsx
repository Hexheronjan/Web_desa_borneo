'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BarChart2, Info } from 'lucide-react';
import { DESA_BAB4, RUBRIK_KEMATANGAN_DIMENSI } from '@/lib/bab4-data';

const COLOR = '#283593';

export default function PenilaianKematanganPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Penilaian Kematangan Tata Kelola Digital (Rubrik 6 Dimensi M1–M6 — Bab IV Tabel 4.44)" modul="Pemerintah Desa" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <Info size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Sesuai Bab IV, rubrik kematangan tingkat desa terdiri atas <strong>6 dimensi (M1–M6)</strong> dengan bobot sama dan berbeda dari skor kematangan individual berpasangan (N = 121 complete-case: <strong>1,94 → 2,53</strong>; Δ = +0,59; p Holm = 2,56 × 10⁻¹⁶).
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Jonggon Jaya" value="2,68 / 5,0" satuan="Pra 2,21 (+0,47) · Berkembang" barColor="blue" progress={53.6} />
        <StatCard label="Kedang Ipil" value="2,40 / 5,0" satuan="Pra 1,90 (+0,51) · Berkembang" barColor="purple" progress={48.0} />
        <StatCard label="Lung Anai" value="2,43 / 5,0" satuan="Pra 1,80 (+0,63) · Berkembang" barColor="green" progress={48.6} />
        <StatCard label="Individu (N=121)" value="2,53 / 5,0" satuan="Pra 1,94 (+0,59) · Signifikan" barColor="orange" progress={50.6} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <BarChart2 size={16} /> Hasil Rubrik Kematangan Enam Dimensi per Desa (Tabel 4.44)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs">
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold text-left">
                <tr>
                  <th className="p-2.5">Desa Penelitian</th>
                  <th className="p-2.5 text-center">Pra</th>
                  <th className="p-2.5 text-center">Pasca</th>
                  <th className="p-2.5 text-center">Perubahan</th>
                  <th className="p-2.5">Kategori</th>
                  <th className="p-2.5">Nilai Pasca Tertinggi</th>
                  <th className="p-2.5">Nilai Pasca Terendah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DESA_BAB4.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/50">
                    <td className="p-2.5 font-bold text-slate-800">{d.nama}</td>
                    <td className="p-2.5 text-center font-mono">{d.kematanganPra.toFixed(2)}</td>
                    <td className="p-2.5 text-center font-mono font-black text-indigo-700">{d.kematanganPasca.toFixed(2)}</td>
                    <td className="p-2.5 text-center font-mono font-bold text-emerald-700">+{d.kematanganDelta.toFixed(2)}</td>
                    <td className="p-2.5"><span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[10px]">Berkembang</span></td>
                    <td className="p-2.5 text-slate-700">{d.kematanganTertinggi}</td>
                    <td className="p-2.5 text-slate-600">{d.kematanganTerendah}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {RUBRIK_KEMATANGAN_DIMENSI.map((m) => (
              <div key={m.kode} className="p-3 border rounded-xl bg-slate-50/60 space-y-1">
                <p className="font-bold text-slate-800"><span className="text-indigo-700 font-mono">{m.kode}</span> — {m.nama}</p>
                <div className="flex justify-between text-[10px] text-slate-600 font-mono pt-1">
                  <span>Jonggon Jaya: <strong>{m.jonggonJaya.toFixed(2)}</strong></span>
                  <span>Kedang Ipil: <strong>{m.kedangIpil.toFixed(2)}</strong></span>
                  <span>Lung Anai: <strong>{m.lungAnai.toFixed(2)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
