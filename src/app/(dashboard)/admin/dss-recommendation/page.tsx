'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { ShieldAlert, Activity, BarChart3, AlertCircle, Eye, CheckCircle } from 'lucide-react';

const COLOR = '#1a237e';

const LOG_PROSES = [
  { id: 'RK-001', jumlahAlternatif: 7, dataDigunakan: 'AHP Matriks v2.0 — Bobot Pakar', kegagalan: 'Tidak ada', statusKelengkapan: 'Lengkap', versiBobot: 'v2.0', statusSensitivitas: 'Stabil', logPerhitungan: 'CR = 0.08 (Valid)', tglProses: '18 Juli 2026' },
  { id: 'RK-002', jumlahAlternatif: 5, dataDigunakan: 'SAW Matriks v2.0 — Skor Normalisasi', kegagalan: 'Tidak ada', statusKelengkapan: 'Lengkap', versiBobot: 'v2.0', statusSensitivitas: 'Stabil', logPerhitungan: 'Normalisasi sukses 100%', tglProses: '18 Juli 2026' },
  { id: 'RK-003', jumlahAlternatif: 7, dataDigunakan: 'AHP Matriks v1.9 — Bobot Pakar', kegagalan: 'Kolom C3 tidak terisi', statusKelengkapan: 'Tidak Lengkap', versiBobot: 'v1.9', statusSensitivitas: 'Fluktuatif', logPerhitungan: 'CR = 0.12 (Tidak Valid!)', tglProses: '15 Juli 2026' },
];

export default function DSSRecommendationPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Monitoring Proses Rekomendasi DSS" modul="Governance &amp; DSS" color={COLOR} />

      {/* Banner batasan kewenangan */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <ShieldAlert size={15} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 font-semibold leading-relaxed">
          <p>⚠️ <strong>Administrator dapat melihat:</strong> jumlah proses rekomendasi, data yang digunakan, kegagalan perhitungan, status kelengkapan, versi bobot, status sensitivitas, dan log perhitungan.</p>
          <p className="text-red-800">🚫 <strong>Administrator tidak dapat:</strong> memilih program prioritas desa, mengubah hasil musyawarah, menetapkan status diterima atau ditolak, atau mengganti nilai kriteria tanpa sumber yang sah.</p>
          <p>Perubahan terhadap kriteria dan bobot harus memperoleh persetujuan pakar atau pihak berwenang.</p>
        </div>
      </div>

      {/* Ringkasan Metrik */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Proses Rekomendasi" value={3} satuan="sesi diproses" barColor="blue" progress={60} />
        <StatCard label="Kegagalan Perhitungan" value={1} satuan="sesi bermasalah" barColor="orange" progress={33} />
        <StatCard label="Versi Bobot Aktif" value="v2.0" satuan="bobot pakar disetujui" barColor="green" progress={100} />
        <StatCard label="Status Sensitivitas" value="Stabil" satuan="2 sesi stabil" barColor="purple" progress={80} />
      </div>

      {/* Tabel Log Proses DSS (Read-Only untuk Admin) */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Activity size={14} /> Log Proses Rekomendasi DSS (Read-Only — Monitoring Teknis)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  {['ID Proses', 'Jml Alternatif', 'Data Digunakan', 'Kegagalan Perhitungan', 'Status Kelengkapan', 'Versi Bobot', 'Status Sensitivitas', 'Log Perhitungan', 'Tgl Proses'].map(h => (
                    <th key={h} className="text-left font-bold text-slate-700 px-3 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LOG_PROSES.map((r, i) => (
                  <tr key={r.id} className={`border-b ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}>
                    <td className="px-3 py-2.5 font-mono font-bold text-slate-500">{r.id}</td>
                    <td className="px-3 py-2.5 text-center font-bold text-slate-800">{r.jumlahAlternatif}</td>
                    <td className="px-3 py-2.5 text-slate-700">{r.dataDigunakan}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${r.kegagalan === 'Tidak ada' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {r.kegagalan}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${r.statusKelengkapan === 'Lengkap' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {r.statusKelengkapan}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-mono font-bold text-indigo-700">{r.versiBobot}</td>
                    <td className="px-3 py-2.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${r.statusSensitivitas === 'Stabil' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                        {r.statusSensitivitas}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-700">{r.logPerhitungan}</td>
                    <td className="px-3 py-2.5 text-slate-500">{r.tglProses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Panel bobot — read-only */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart3 size={14} /> Bobot Kriteria Aktif — v2.0 (Disetujui Pakar, Read-Only)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-2.5">
          <p className="text-[10px] text-slate-500 bg-blue-50 p-2.5 rounded-lg border font-semibold">
            🔒 Bobot kriteria ini ditetapkan oleh pakar melalui proses AHP dan disetujui oleh peneliti. Administrator hanya dapat membaca nilai bobot, tidak dapat mengubah.
          </p>
          {[
            { name: 'Kesiapan Infrastruktur (C1)', weight: 0.320 },
            { name: 'Dampak Kualitas Hidup (C2)', weight: 0.245 },
            { name: 'Pelestarian Budaya Adat (C3)', weight: 0.180 },
            { name: 'Keberlanjutan Lingkungan (C4)', weight: 0.155 },
            { name: 'Efisiensi Anggaran (C5)', weight: 0.100 },
          ].map((cw, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-semibold">{cw.name}</span>
                <span className="font-black text-slate-800">{(cw.weight * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-indigo-700" style={{ width: `${cw.weight * 100}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
