'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Shield, CheckCircle2, FileCheck, AlertTriangle } from 'lucide-react';
import { ARTEFAK_6_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a365d';

export default function ValidasiArtefakPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Validasi 6 Artefak Utama (A1–A6)" modul="Validasi &amp; Evaluasi DSRM (Tabel 4.22 &amp; 4.27A)" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Artefak DSRM', value: '6 Artefak', sub: 'A1 s.d. A6 (RQ1–RQ3)', color: COLOR, icon: FileCheck },
          { label: 'Validitas Isi RQ1 (A1)', value: 'S-CVI 1,000', sub: 'Pra 0,9167 → Pasca 1,000 · CR 0,00144', color: '#276749', icon: CheckCircle2 },
          { label: 'Evaluasi DSS (A4)', value: '4,09 / 5', sub: 'Sensitivitas 39/39 stabil (±10%)', color: '#2b6cb0', icon: Shield },
          { label: 'Uji Prototipe (A6)', value: '86,65% UAT', sub: 'SUS 67,58 · F-029 perlu retest', color: '#c05621', icon: AlertTriangle },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                <Icon size={18} style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{kpi.label}</p>
                <p className="text-base font-black text-gray-900 leading-tight">{kpi.value}</p>
                <p className="text-[10px] text-gray-500">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traceability Artefak 1 - 6 */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Shield size={16} /> Keterlacakan 6 Artefak Penelitian (A1 → A6)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
            {ARTEFAK_6_BAB4.map((a) => (
              <div key={a.kode} className="flex flex-col items-center text-center p-3 rounded-xl border-2 border-blue-200 bg-blue-50/60">
                <div className="w-9 h-9 rounded-full bg-blue-800 flex items-center justify-center mb-2">
                  <span className="text-white text-xs font-black">{a.kode}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-800 leading-tight">{a.nama.split('—')[1]?.trim()}</p>
                <span className="mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-indigo-100 text-indigo-700">{a.tahap}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 leading-relaxed">
            <strong>Kejujuran Status Bukti (Gerbang Bukti Bab IV — Tabel 4.27A):</strong> Validasi isi &amp; pembobotan AHP untuk <strong>A1</strong> telah selesai oleh Panel 3 Pakar (P1–P3) dengan S-CVI/Ave pasca-revisi <strong>1,000</strong> dan CR <strong>0,00144</strong>. Untuk <strong>A2–A6</strong>, instrumen validasi formal pakar telah tersusun dan dievaluasi secara desain, sensitivitas, formatif, serta uji lapangan 4 minggu (N=126), sementara lembar pengesahan pakar formal tetap dipisahkan dari klaim terverifikasi sampai ditandatangani.
          </div>
        </CardContent>
      </Card>

      {/* Tabel 6 Artefak Bab IV */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <FileCheck size={16} /> Matriks 6 Artefak Utama &amp; Status Bukti Empiris
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="text-center py-2.5 px-2.5 text-[10px] font-bold text-gray-500 uppercase">Kode</th>
                  <th className="text-left py-2.5 px-2.5 text-[10px] font-bold text-gray-500 uppercase">Nama Artefak</th>
                  <th className="text-left py-2.5 px-2.5 text-[10px] font-bold text-gray-500 uppercase">Struktur Utama</th>
                  <th className="text-left py-2.5 px-2.5 text-[10px] font-bold text-gray-500 uppercase">Fungsi dalam Sistem</th>
                  <th className="text-left py-2.5 px-2.5 text-[10px] font-bold text-blue-700 uppercase">Status Bukti Bab IV</th>
                </tr>
              </thead>
              <tbody>
                {ARTEFAK_6_BAB4.map((a, i) => (
                  <tr key={a.kode} className={`border-b border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-3 px-2.5 text-center font-mono font-black text-blue-800">{a.kode}</td>
                    <td className="py-3 px-2.5">
                      <p className="font-bold text-slate-800">{a.nama}</p>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">{a.tahap}</span>
                    </td>
                    <td className="py-3 px-2.5 text-slate-600">{a.struktur}</td>
                    <td className="py-3 px-2.5 text-slate-600 leading-snug">{a.fungsi}</td>
                    <td className="py-3 px-2.5 font-semibold text-slate-800">{a.statusBukti}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
