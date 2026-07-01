'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,
} from 'recharts';
import { Activity, TrendingUp, Target, AlertCircle, CheckCircle2 } from 'lucide-react';

const COLOR = '#1a365d';

// 20 Indikator Readiness
const readinessIndicators = [
  // Dimensi 1: SDM & Literasi Digital
  { kode: 'R1', dimensi: 'SDM & Literasi Digital', indikator: 'Literasi Digital Kepala Keluarga', nilai: 68.2 },
  { kode: 'R2', dimensi: 'SDM & Literasi Digital', indikator: 'Penggunaan Smartphone', nilai: 72.5 },
  { kode: 'R3', dimensi: 'SDM & Literasi Digital', indikator: 'Akses Internet', nilai: 65.8 },
  // Dimensi 2: Infrastruktur Digital
  { kode: 'R4', dimensi: 'Infrastruktur Digital', indikator: 'Jaringan Telekomunikasi', nilai: 70.1 },
  { kode: 'R5', dimensi: 'Infrastruktur Digital', indikator: 'Listrik & Energi', nilai: 78.3 },
  { kode: 'R6', dimensi: 'Infrastruktur Digital', indikator: 'Perangkat Digital Desa', nilai: 69.4 },
  // Dimensi 3: Kesehatan
  { kode: 'R7', dimensi: 'Kesehatan', indikator: 'Akses Layanan Kesehatan', nilai: 75.2 },
  { kode: 'R8', dimensi: 'Kesehatan', indikator: 'Posyandu Aktif', nilai: 80.0 },
  { kode: 'R9', dimensi: 'Kesehatan', indikator: 'Gizi & Stunting', nilai: 71.8 },
  // Dimensi 4: Ekonomi
  { kode: 'R10', dimensi: 'Ekonomi', indikator: 'UMKM & Usaha Desa', nilai: 66.5 },
  { kode: 'R11', dimensi: 'Ekonomi', indikator: 'Akses Modal & Keuangan', nilai: 63.2 },
  { kode: 'R12', dimensi: 'Ekonomi', indikator: 'E-Commerce Desa', nilai: 58.9 },
  // Dimensi 5: Lingkungan
  { kode: 'R13', dimensi: 'Lingkungan', indikator: 'Pengelolaan Sampah', nilai: 68.7 },
  { kode: 'R14', dimensi: 'Lingkungan', indikator: 'Air Bersih & Sanitasi', nilai: 72.4 },
  { kode: 'R15', dimensi: 'Lingkungan', indikator: 'Ruang Terbuka Hijau', nilai: 74.1 },
  // Dimensi 6: Sosial Budaya
  { kode: 'R16', dimensi: 'Sosial Budaya', indikator: 'Kearifan Lokal', nilai: 78.6 },
  { kode: 'R17', dimensi: 'Sosial Budaya', indikator: 'Gotong Royong', nilai: 82.3 },
  // Dimensi 7: Kelembagaan
  { kode: 'R18', dimensi: 'Kelembagaan', indikator: 'Kapasitas Pemerintah Desa', nilai: 71.2 },
  { kode: 'R19', dimensi: 'Kelembagaan', indikator: 'Regulasi & Kebijakan', nilai: 64.8 },
  { kode: 'R20', dimensi: 'Kelembagaan', indikator: 'Partisipasi Masyarakat', nilai: 76.5 },
];

const radarData = [
  { aspek: 'SDM & Literasi', nilai: 68.8 },
  { aspek: 'Infrastruktur', nilai: 72.6 },
  { aspek: 'Kesehatan', nilai: 75.7 },
  { aspek: 'Ekonomi', nilai: 62.9 },
  { aspek: 'Lingkungan', nilai: 71.7 },
  { aspek: 'Sosial Budaya', nilai: 80.5 },
  { aspek: 'Kelembagaan', nilai: 70.8 },
];

const dimColors: Record<string, string> = {
  'SDM & Literasi Digital': '#2b6cb0',
  'Infrastruktur Digital': '#276749',
  'Kesehatan': '#c05621',
  'Ekonomi': '#c53030',
  'Lingkungan': '#276749',
  'Sosial Budaya': '#553c9a',
  'Kelembagaan': '#d69e2e',
};

function getKategori(nilai: number) {
  if (nilai >= 80) return { label: 'Sangat Baik', cls: 'bg-green-100 text-green-700' };
  if (nilai >= 70) return { label: 'Baik', cls: 'bg-blue-100 text-blue-700' };
  if (nilai >= 60) return { label: 'Cukup', cls: 'bg-yellow-100 text-yellow-700' };
  return { label: 'Kurang', cls: 'bg-red-100 text-red-700' };
}

export default function AnalisisReadinessPage() {
  const rataRata = (readinessIndicators.reduce((s, r) => s + r.nilai, 0) / readinessIndicators.length).toFixed(2);
  const tertinggi = readinessIndicators.reduce((a, b) => a.nilai > b.nilai ? a : b);
  const terendah = readinessIndicators.reduce((a, b) => a.nilai < b.nilai ? a : b);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Analisis Readiness" modul="Analisis Framework" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Indikator', value: '20', sub: 'Indikator Readiness', color: COLOR, icon: Target },
          { label: 'Rata-rata Score', value: `${rataRata}`, sub: 'Kategori: Baik', color: '#276749', icon: TrendingUp },
          { label: 'Dimensi Tertinggi', value: 'Sosial Budaya', sub: `${tertinggi.nilai.toFixed(1)} — Sangat Baik`, color: '#553c9a', icon: CheckCircle2 },
          { label: 'Dimensi Terendah', value: 'Ekonomi', sub: `${terendah.nilai.toFixed(1)} — Cukup`, color: '#c53030', icon: AlertCircle },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                <Icon size={18} style={{ color: kpi.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{kpi.label}</p>
                <p className="text-base font-black text-gray-900 leading-tight truncate">{kpi.value}</p>
                <p className="text-[10px] text-gray-500 leading-snug">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Radar Chart */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Radar Chart — 7 Dimensi Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="#bee3f8" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 10, fill: '#1a365d', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[50, 90]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                <Radar name="Nilai" dataKey="nilai" stroke="#2b6cb0" fill="#2b6cb0" fillOpacity={0.25} strokeWidth={2} />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8 }}
                  formatter={(v: any) => [`${v}`, 'Skor Readiness']}
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100 text-center">
              <p className="text-xs font-bold text-blue-700">Rata-rata Readiness: <span className="text-lg font-black">{rataRata}</span></p>
              <p className="text-[11px] text-gray-500 mt-0.5">Kategori: <span className="font-semibold text-green-700">Baik</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart per dimensi */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Skor Per Dimensi Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={radarData} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="aspek" tick={{ fontSize: 10, fill: '#374151' }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: any) => [`${v}`, 'Skor']} />
                <Bar dataKey="nilai" radius={[0, 4, 4, 0]}>
                  {radarData.map((_, i) => (
                    <Cell key={i} fill={['#2b6cb0','#276749','#c05621','#c53030','#276749','#553c9a','#d69e2e'][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabel 20 Indikator */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Target size={16} /> Hasil Assessment — 20 Indikator Readiness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 text-[10px] font-bold text-gray-400 uppercase">Kode</th>
                  <th className="text-left py-2 px-2 text-[10px] font-bold text-gray-400 uppercase">Dimensi</th>
                  <th className="text-left py-2 px-2 text-[10px] font-bold text-gray-400 uppercase">Indikator</th>
                  <th className="text-center py-2 px-2 text-[10px] font-bold text-blue-600 uppercase">Nilai</th>
                  <th className="text-center py-2 px-2 text-[10px] font-bold text-gray-400 uppercase">Kategori</th>
                </tr>
              </thead>
              <tbody>
                {readinessIndicators.map((ind, i) => {
                  const kat = getKategori(ind.nilai);
                  return (
                    <tr key={i} className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                      <td className="py-2.5 px-2 font-mono text-[11px] font-bold text-gray-500">{ind.kode}</td>
                      <td className="py-2.5 px-2">
                        <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-full" style={{ color: dimColors[ind.dimensi], backgroundColor: dimColors[ind.dimensi] + '15' }}>
                          {ind.dimensi}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-[12px] text-slate-700">{ind.indikator}</td>
                      <td className="py-2.5 px-2 text-center font-black text-blue-700 text-[13px]">{ind.nilai.toFixed(1)}</td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${kat.cls}`}>{kat.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
