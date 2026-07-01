'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import { User, Award, Star, CheckCircle2, FileText } from 'lucide-react';

const COLOR = '#1a365d';

const expertData = [
  {
    validator: 'Validator 1',
    nama: 'Prof. Dr. Ahmad Fauzi, M.Kom',
    institusi: 'Universitas Mulawarman',
    bidang: 'Smart Village & IoT',
    pengalaman: '20 Tahun',
    aspek: [
      { nama: 'Kelengkapan Framework', nilai: 94 },
      { nama: 'Relevansi Indikator', nilai: 92 },
      { nama: 'Validitas Konten', nilai: 91 },
      { nama: 'Keterbacaan Instrumen', nilai: 93 },
      { nama: 'Kesesuaian Konteks', nilai: 90 },
    ],
    rataRata: 92.00,
    status: 'Valid',
    catatan: 'Framework sudah komprehensif dan relevan untuk desa adat Kalimantan Timur.',
  },
  {
    validator: 'Validator 2',
    nama: 'Dr. Bambang Setiawan, M.T',
    institusi: 'Institut Teknologi Sepuluh Nopember',
    bidang: 'DSS & Kecerdasan Buatan',
    pengalaman: '15 Tahun',
    aspek: [
      { nama: 'Logika DSS', nilai: 92 },
      { nama: 'Konsistensi AHP', nilai: 91 },
      { nama: 'Akurasi Bobot', nilai: 89 },
      { nama: 'Interpretasi Output', nilai: 90 },
      { nama: 'Kemudahan Operasi', nilai: 88 },
    ],
    rataRata: 90.00,
    status: 'Valid',
    catatan: 'Metode AHP sudah diterapkan dengan benar, CR dalam batas yang dapat diterima.',
  },
  {
    validator: 'Validator 3',
    nama: 'Dr. Siti Rahayu, M.Sc',
    institusi: 'Universitas Gadjah Mada',
    bidang: 'Sistem Informasi & e-Government',
    pengalaman: '18 Tahun',
    aspek: [
      { nama: 'Desain Sistem', nilai: 96 },
      { nama: 'Kegunaan (Usability)', nilai: 95 },
      { nama: 'Keandalan Sistem', nilai: 94 },
      { nama: 'Keamanan Data', nilai: 96 },
      { nama: 'Integrasi Modul', nilai: 94 },
    ],
    rataRata: 95.00,
    status: 'Valid',
    catatan: 'Sistem terintegrasi dengan baik dan memenuhi standar e-government Indonesia.',
  },
];

const validatorColors = ['#2b6cb0', '#276749', '#553c9a'];

export default function ExpertValidationPage() {
  const rataRataTotal = (expertData.reduce((s, e) => s + e.rataRata, 0) / expertData.length).toFixed(2);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Nilai Expert — Penilaian Pakar" modul="Validasi & Evaluasi" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Validator', value: '3', sub: 'Ahli & Pakar', color: COLOR, icon: User },
          { label: 'Rata-rata Skor', value: rataRataTotal, sub: 'Expert Review', color: '#276749', icon: Award },
          { label: 'Validasi Selesai', value: '3 / 3', sub: '100% Valid', color: '#2b6cb0', icon: CheckCircle2 },
          { label: 'Nilai Tertinggi', value: '95.00', sub: 'Validator 3 — UGM', color: '#553c9a', icon: Star },
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

      {/* Card per Validator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {expertData.map((exp, i) => (
          <Card key={i} className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: validatorColors[i] }}>
                <User size={16} /> {exp.validator}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Info pakar */}
              <div className="p-3 rounded-xl mb-3" style={{ backgroundColor: validatorColors[i] + '10' }}>
                <p className="text-[12px] font-black text-slate-800">{exp.nama}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{exp.institusi}</p>
                <div className="flex gap-3 mt-1.5">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: validatorColors[i] }}>{exp.bidang}</span>
                  <span className="text-[10px] text-slate-500">Exp: {exp.pengalaman}</span>
                </div>
              </div>

              {/* Skor besar */}
              <div className="text-center mb-3">
                <p className="text-4xl font-black" style={{ color: validatorColors[i] }}>{exp.rataRata.toFixed(2)}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <CheckCircle2 size={14} className="text-green-600" />
                  <span className="text-[11px] font-bold text-green-700">{exp.status}</span>
                </div>
              </div>

              {/* Aspek penilaian */}
              <div className="space-y-1.5 mb-3">
                {exp.aspek.map((a, j) => (
                  <div key={j}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[11px] text-slate-600">{a.nama}</span>
                      <span className="text-[11px] font-bold" style={{ color: validatorColors[i] }}>{a.nilai}</span>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${a.nilai}%`, backgroundColor: validatorColors[i] }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Catatan */}
              <div className="p-2 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Catatan Expert</p>
                <p className="text-[11px] text-slate-600 leading-snug italic">"{exp.catatan}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Perbandingan Bar Chart */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Award size={16} /> Perbandingan Nilai Expert Review — Per Aspek
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={expertData[0].aspek.map((a, i) => ({
                aspek: a.nama,
                V1: expertData[0].aspek[i].nilai,
                V2: expertData[1].aspek[i].nilai,
                V3: expertData[2].aspek[i].nilai,
              }))}
              margin={{ top: 0, right: 10, left: -10, bottom: 55 }}
              barGap={2}
              barSize={14}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="aspek" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={60} interval={0} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <ReferenceLine y={90} stroke="#e53e3e" strokeDasharray="4 4" label={{ value: 'Min Valid (90)', fill: '#e53e3e', fontSize: 9 }} />
              <Bar dataKey="V1" name="Validator 1" fill={validatorColors[0]} radius={[3, 3, 0, 0]} />
              <Bar dataKey="V2" name="Validator 2" fill={validatorColors[1]} radius={[3, 3, 0, 0]} />
              <Bar dataKey="V3" name="Validator 3" fill={validatorColors[2]} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 justify-center mt-1">
            {expertData.map((e, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: validatorColors[i] }} />
                <span className="text-[10px] text-gray-500">{e.validator}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
