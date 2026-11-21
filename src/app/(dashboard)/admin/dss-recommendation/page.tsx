'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { ShieldAlert, Activity, BarChart3 } from 'lucide-react';
import { DESA_BAB4, DSS_KRITERIA_SAW } from '@/lib/bab4-data';

const COLOR = '#1a237e';

const LOG_PROSES = [
  {
    id: 'DSS-JJ-01',
    desa: 'Desa Jonggon Jaya',
    jumlahAlternatif: 10,
    dataDigunakan: 'Dataset SLV 2 v1.2 (C1–C2 Empiris RQ1 + C3–C6 Multiaktor)',
    rekomendasiTeratas: 'A08 — Dasbor SDGs Desa 3, 4, dan 18 (V = 0,950907)',
    statusKelengkapan: 'Lengkap',
    versiBobot: 'SLV 1 v1.2',
    statusSensitivitas: '13/13 Stabil (±10%)',
    logPerhitungan: 'CR AHP Dimensi = 0,00144; Normalisasi SAW 100%',
    tglProses: 'Juli 2026',
  },
  {
    id: 'DSS-KI-02',
    desa: 'Desa Kedang Ipil',
    jumlahAlternatif: 10,
    dataDigunakan: 'Dataset SLV 2 v1.2 (C1–C2 Empiris RQ1 + C3–C6 Multiaktor)',
    rekomendasiTeratas: 'A02 — Penguatan Konektivitas dan Perangkat (V = 0,920042)',
    statusKelengkapan: 'Lengkap',
    versiBobot: 'SLV 1 v1.2',
    statusSensitivitas: '13/13 Stabil (±10%)',
    logPerhitungan: 'CR AHP Dimensi = 0,00144; Normalisasi SAW 100%',
    tglProses: 'Juli 2026',
  },
  {
    id: 'DSS-LA-03',
    desa: 'Desa Lung Anai',
    jumlahAlternatif: 10,
    dataDigunakan: 'Dataset SLV 2 v1.2 (C1–C2 Empiris RQ1 + C3–C6 Multiaktor)',
    rekomendasiTeratas: 'A02 — Penguatan Konektivitas dan Perangkat (V = 0,911694)',
    statusKelengkapan: 'Lengkap',
    versiBobot: 'SLV 1 v1.2',
    statusSensitivitas: '13/13 Stabil (±10%)',
    logPerhitungan: 'CR AHP Dimensi = 0,00144; Normalisasi SAW 100%',
    tglProses: 'Juli 2026',
  },
];

export default function DSSRecommendationPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Monitoring Proses Rekomendasi DSS (Artefak 4 — SAW)" modul="Tata Kelola &amp; DSS" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <ShieldAlert size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 font-semibold leading-relaxed">
          <p>⚠️ <strong>Kewenangan Monitoring Administrator (Bab IV, Subbab 4.3):</strong> Administrator memantau log perhitungan SAW, kelengkapan 30 baris matriks keputusan (3 desa × 10 alternatif), dan uji sensitivitas ±10% (39/39 kombinasi desa–skenario stabil).</p>
          <p className="text-red-800">🚫 <strong>Batas Otoritas:</strong> DSS menghasilkan rekomendasi analitis untuk bahan musyawarah, bukan keputusan otomatis. Penetapan program berada pada Pemerintah Desa bersama Lembaga Adat dan unsur masyarakat.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Matriks Keputusan" value="30 Baris" satuan="3 Desa × 10 Alternatif" barColor="blue" progress={100} />
        <StatCard label="Kriteria SAW" value="6 Kriteria" satuan="C1–C5 Benefit, C6 Cost" barColor="purple" progress={100} />
        <StatCard label="Sensitivitas ±10%" value="39 / 39" satuan="Kombinasi Stabil (100%)" barColor="green" progress={100} />
        <StatCard label="Evaluasi Formatif DSS" value="4,09 / 5" satuan="24 Evaluator (21 User + 3 Pakar)" barColor="orange" progress={82} />
      </div>

      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Activity size={14} /> Log Proses Rekomendasi DSS SAW Tiga Desa Penelitian (Read-Only — Tabel 4.25 &amp; 4.26)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  {['ID Proses', 'Desa Penelitian', 'Alternatif', 'Rekomendasi Prioritas #1 (SAW)', 'Versi Bobot', 'Sensitivitas ±10%', 'Log Validasi', 'Status'].map((h) => (
                    <th key={h} className="text-left font-bold text-slate-700 px-3 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOG_PROSES.map((r, i) => (
                  <tr key={r.id} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                    <td className="px-3 py-2.5 font-mono font-bold text-slate-500">{r.id}</td>
                    <td className="px-3 py-2.5 font-bold text-slate-800">{r.desa}</td>
                    <td className="px-3 py-2.5 text-center font-bold text-slate-800">{r.jumlahAlternatif}</td>
                    <td className="px-3 py-2.5 font-semibold text-indigo-800">{r.rekomendasiTeratas}</td>
                    <td className="px-3 py-2.5 font-mono font-bold text-slate-600">{r.versiBobot}</td>
                    <td className="px-3 py-2.5">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-green-50 text-green-700 border-green-200">{r.statusSensitivitas}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-600">{r.logPerhitungan}</td>
                    <td className="px-3 py-2.5">
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-green-50 text-green-700 border-green-200">{r.statusKelengkapan}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 size={14} /> Enam Kriteria &amp; Bobot DSS Metode SAW (Tabel 4.24 — Read-Only)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-2.5">
          <p className="text-[10px] text-slate-600 bg-blue-50 p-2.5 rounded-lg border border-blue-100 font-semibold">
            🔒 C1–C2 berasal dari hasil empiris RQ1 (kesenjangan kesiapan &amp; bobot AHP dimensi), sedangkan C3–C6 berasal dari penilaian multiaktor dan estimasi biaya program. Rumus preferensi: Vᵢ = Σ(wⱼ × rᵢⱼ).
          </p>
          {DSS_KRITERIA_SAW.map((cw) => (
            <div key={cw.kode}>
              <div className="flex justify-between text-xs mb-1 gap-2 flex-wrap">
                <span className="text-slate-700 font-semibold">
                  <strong className="text-indigo-700">{cw.kode}</strong> — {cw.nama}{' '}
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${cw.kode === 'C6' ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {cw.atribut}
                  </span>
                </span>
                <span className="font-black text-slate-800">{(cw.bobot * 100).toFixed(0)}% ({cw.bobot.toFixed(2)})</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-indigo-700" style={{ width: `${cw.bobot * 100}%` }} />
              </div>
              <p className="text-[9px] text-slate-400 mt-0.5">Sumber: {cw.sumber}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Ringkasan 3 Desa */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {DESA_BAB4.map((d) => (
          <Card key={d.id} className="border-indigo-100">
            <CardContent className="p-4 space-y-1.5">
              <p className="text-[10px] font-bold uppercase text-indigo-700">{d.nama} ({d.kecamatan})</p>
              <p className="font-black text-slate-800 text-sm">{d.dssPrioritas.kode} — {d.dssPrioritas.nama}</p>
              <p className="text-[11px] text-slate-600">Skor SAW: <strong className="text-indigo-700 font-mono">{d.dssPrioritas.skorSAW.toFixed(4)}</strong> • Kesiapan: <strong>{d.skorKesiapan}</strong> (Gap: {d.kesenjangan})</p>
              <p className="text-[10px] text-emerald-700 font-semibold">Sensitivitas ±10%: {d.dssPrioritas.stabilitas}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
