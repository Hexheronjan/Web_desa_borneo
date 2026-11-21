'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { CheckCircle2, Award, Users, ClipboardList, AlertTriangle, Calendar } from 'lucide-react';
import { DESA_BAB4, EVALUASI_PER_PERAN_BAB4, LOG_4_MINGGU_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a365d';

export default function UATSUSPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Evaluasi UAT, SUS, Kualitas &amp; Log 4 Minggu (N=126)" modul="Validasi &amp; Evaluasi RQ3 (Dataset SLV 3)" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Skor SUS Gabungan', value: '67,58', sub: 'Cronbach α = 0,955 (N=126)', color: '#c05621', icon: Award },
          { label: 'Tingkat Lulus UAT', value: '86,65%', sub: '837 / 966 tugas relevan (1.008 baris)', color: '#276749', icon: ClipboardList },
          { label: 'Kualitas Total (1–5)', value: '3,39 / 5', sub: 'Cronbach α = 0,984', color: '#2b6cb0', icon: CheckCircle2 },
          { label: 'Partisipan 7 Peran', value: '126', sub: '3 desa × 42 · 7 peran × 18', color: '#553c9a', icon: Users },
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

      {/* Warning F-029 */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
        <AlertTriangle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Temuan Kritis Bab IV:</strong> Dari 35 kelompok fitur (F-001 s.d. F-035), fitur <strong>F-029 (Tenaga Kesehatan)</strong> masih berstatus <em>memerlukan perbaikan dan pengujian ulang (retest)</em>, sementara peran <strong>Guru/Tenaga Pendidikan</strong> (UAT 79,86%) dan <strong>Masyarakat Umum</strong> (SUS 62,22) memerlukan panduan tugas yang lebih sederhana dan pendampingan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Evaluasi per Desa */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Perbandingan UAT &amp; SUS Antar 3 Desa (N=42 / Desa)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={DESA_BAB4.map((d) => ({
                  desa: d.nama.replace('Desa ', ''),
                  UAT: d.evaluasiRQ3.uat,
                  SUS: d.evaluasiRQ3.sus,
                }))}
                margin={{ top: 5, right: 15, left: -10, bottom: 5 }}
                barSize={24}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="desa" tick={{ fontSize: 11, fill: '#334155' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="UAT" name="UAT (%)" fill="#276749" radius={[4, 4, 0, 0]} />
                <Bar dataKey="SUS" name="Skor SUS" fill="#2b6cb0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-[10px] text-slate-500 mt-2">
              Waktu luring tercatat: Jonggon Jaya 915 menit · Kedang Ipil 918 menit · Lung Anai <strong>2.928 menit</strong> (memperkuat urgensi mode offline-first).
            </p>
          </CardContent>
        </Card>

        {/* Log 4 Minggu */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Perkembangan Log Penggunaan 4 Minggu (504 Entri Log)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b bg-slate-50 text-[10px] text-slate-500 uppercase">
                    <th className="py-2 px-2 text-left">Periode</th>
                    <th className="py-2 px-2 text-right">Selesai</th>
                    <th className="py-2 px-2 text-right">Tingkat</th>
                    <th className="py-2 px-2 text-right">Kesalahan</th>
                    <th className="py-2 px-2 text-right">Bantuan</th>
                  </tr>
                </thead>
                <tbody>
                  {LOG_4_MINGGU_BAB4.map((l) => (
                    <tr key={l.periode} className="border-b last:border-0">
                      <td className="py-2.5 px-2 font-bold text-slate-800">{l.periode}</td>
                      <td className="py-2.5 px-2 text-right font-mono">{l.selesai}/{l.direncanakan}</td>
                      <td className="py-2.5 px-2 text-right font-mono font-bold text-emerald-700">{l.tingkat.toFixed(2)}%</td>
                      <td className="py-2.5 px-2 text-right font-mono text-red-600">{l.kesalahan}</td>
                      <td className="py-2.5 px-2 text-right font-mono text-amber-700">{l.bantuan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">
              Tingkat penyelesaian meningkat dari <strong>82,14%</strong> (Minggu 1) menjadi <strong>98,41%</strong> (Minggu 4), dengan kesalahan turun dari 93 menjadi <strong>0</strong>.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabel 7 Peran Utama UML */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <ClipboardList size={16} /> Hasil Evaluasi UAT, SUS &amp; Kualitas per 7 Peran Utama UML (N = 18 / Peran)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  {['Peran Utama UML', 'Komponen', 'Fitur', 'N', 'Kualitas (1–5)', 'Skor SUS', 'Lulus UAT (%)', 'Catatan Bab IV'].map((h, i) => (
                    <th key={i} className="text-left py-2.5 px-2.5 text-[10px] font-bold text-gray-500 uppercase whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EVALUASI_PER_PERAN_BAB4.map((r, i) => (
                  <tr key={r.peran} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-2.5 px-2.5 font-bold text-slate-800 whitespace-nowrap">{r.peran}</td>
                    <td className="py-2.5 px-2.5 font-mono text-[10px] text-slate-500">{r.kodeKomponen}</td>
                    <td className="py-2.5 px-2.5 font-mono text-[10px] text-indigo-700 font-bold">{r.kodeFitur}</td>
                    <td className="py-2.5 px-2.5 font-mono">{r.n}</td>
                    <td className="py-2.5 px-2.5 font-mono font-bold text-blue-700">{r.kualitasTotal.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono font-bold text-purple-700">{r.sus.toFixed(2)}</td>
                    <td className="py-2.5 px-2.5 font-mono font-bold text-emerald-700">{r.uat.toFixed(2)}%</td>
                    <td className="py-2.5 px-2.5 text-[11px] text-slate-600">{r.catatan}</td>
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
