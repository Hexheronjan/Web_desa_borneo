'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { BarChart3, TrendingUp, Activity, PieChart as PieIcon } from 'lucide-react';
import {
  DESA_BAB4,
  DIMENSI_BAB4,
  LOG_4_MINGGU_BAB4,
  PREPOST_6_KONSTRUK_BAB4,
  RUBRIK_KEMATANGAN_DIMENSI,
} from '@/lib/bab4-data';

const COLOR = '#1a365d';
const DIM_COLORS = ['#1a365d', '#2b6cb0', '#276749', '#0694a2', '#553c9a', '#c05621'];

const radar6Dimensi = DIMENSI_BAB4.map((d) => ({
  aspek: d.singkat,
  JonggonJaya: DESA_BAB4[0].dimensi[d.kode],
  KedangIpil: DESA_BAB4[1].dimensi[d.kode],
  LungAnai: DESA_BAB4[2].dimensi[d.kode],
}));

const bobotAHPPie = DIMENSI_BAB4.map((d, i) => ({
  name: `${d.kode} (${(d.bobot * 100).toFixed(2)}%)`,
  value: Number((d.bobot * 100).toFixed(2)),
  color: DIM_COLORS[i],
}));

const perbandinganDesa = DESA_BAB4.map((d) => ({
  desa: d.nama.replace('Desa ', ''),
  Kesiapan: d.skorKesiapan,
  SDGsAkhir: d.sdgKPI.akhir,
  UAT: d.evaluasiRQ3.uat,
  SUS: d.evaluasiRQ3.sus,
}));

export default function VisualisasiDataPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Visualisasi Data Penelitian Bab IV" modul="Analitik Penelitian (Dataset SLV 1–3 v1.2)" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Dimensi & Indikator', value: '6 / 24', sub: 'CR AHP Dimensi 0,00144', color: COLOR, icon: BarChart3 },
          { label: 'Lokus Penelitian', value: '3 Desa', sub: 'N = 126 (7 peran × 18)', color: '#276749', icon: Activity },
          { label: 'Log 4 Minggu', value: '82,1% → 98,4%', sub: 'Kesalahan 93 → 0', color: '#2b6cb0', icon: TrendingUp },
          { label: 'Konstruk Signifikan', value: '5 dari 6', sub: 'Uji Berpasangan (Holm)', color: '#553c9a', icon: PieIcon },
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

      {/* Perbandingan 3 Desa & Log 4 Minggu */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart3 size={16} /> Perbandingan Kesiapan, SDGs KPI, UAT &amp; SUS (3 Desa)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={perbandinganDesa} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="desa" tick={{ fontSize: 10, fill: '#334155' }} axisLine={false} tickLine={false} />
                <YAxis domain={[30, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="Kesiapan" fill="#1a365d" radius={[3, 3, 0, 0]} />
                <Bar dataKey="SDGsAkhir" name="SDGs Akhir (%)" fill="#276749" radius={[3, 3, 0, 0]} />
                <Bar dataKey="UAT" name="UAT (%)" fill="#2b6cb0" radius={[3, 3, 0, 0]} />
                <Bar dataKey="SUS" fill="#c05621" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Tren Penyelesaian Tugas &amp; Penurunan Kesalahan (Minggu 1–4)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={[...LOG_4_MINGGU_BAB4]} margin={{ top: 5, right: 15, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="periode" tick={{ fontSize: 10, fill: '#334155' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 110]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="tingkat" name="Tingkat Selesai (%)" stroke="#276749" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="kesalahan" name="Jumlah Kesalahan" stroke="#e53e3e" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="bantuan" name="Permintaan Bantuan" stroke="#c05621" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Radar 6 Dimensi + Pie Bobot AHP + Rubrik Kematangan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Radar 6 Dimensi Kesiapan (D1–D6)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={210}>
              <RadarChart data={radar6Dimensi} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                <PolarGrid stroke="#bee3f8" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#1a365d', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Jonggon Jaya" dataKey="JonggonJaya" stroke="#2b6cb0" fill="#2b6cb0" fillOpacity={0.18} strokeWidth={2} />
                <Radar name="Kedang Ipil" dataKey="KedangIpil" stroke="#276749" fill="#276749" fillOpacity={0.12} strokeWidth={2} />
                <Radar name="Lung Anai" dataKey="LungAnai" stroke="#c05621" fill="#c05621" fillOpacity={0.12} strokeWidth={2} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <PieIcon size={16} /> Distribusi Bobot AHP 6 Dimensi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={bobotAHPPie} dataKey="value" cx="50%" cy="50%" outerRadius={58} stroke="none">
                  {bobotAHPPie.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}%`, 'Bobot AHP']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-1 mt-2">
              {bobotAHPPie.map((d, i) => (
                <div key={i} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-[10px] text-gray-600 truncate">{d.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart3 size={16} /> Rubrik Kematangan M1–M6 (Pasca)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[...RUBRIK_KEMATANGAN_DIMENSI]} margin={{ top: 5, right: 5, left: -20, bottom: 5 }} barSize={8}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="kode" tick={{ fontSize: 9, fill: '#334155' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 3.5]} tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                <Bar dataKey="jonggonJaya" name="Jonggon Jaya" fill="#2b6cb0" radius={[2, 2, 0, 0]} />
                <Bar dataKey="kedangIpil" name="Kedang Ipil" fill="#276749" radius={[2, 2, 0, 0]} />
                <Bar dataKey="lungAnai" name="Lung Anai" fill="#c05621" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Ringkasan Pra-Pasca 6 Konstruk */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Activity size={16} /> Delta Perubahan Pra–Pasca 6 Konstruk Evaluasi RQ3
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PREPOST_6_KONSTRUK_BAB4.map((c) => (
              <div key={c.sasaran} className="p-3 rounded-xl border border-slate-200 bg-slate-50/70">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-slate-800">{c.sasaran}</p>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${c.signifikan ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {c.signifikan ? 'Signifikan' : 'NS'}
                  </span>
                </div>
                <p className="text-sm font-black text-blue-800">{c.sebelum.toFixed(2)} → {c.sesudah.toFixed(2)} <span className="text-emerald-700">(+{c.delta.toFixed(2)})</span></p>
                <p className="text-[10px] text-slate-500 mt-0.5">N={c.n} · {c.uji} · p Holm = {c.pHolm}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
