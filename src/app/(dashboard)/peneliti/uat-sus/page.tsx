'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { CheckCircle2, Award, ListOrdered, Users, ClipboardList } from 'lucide-react';

const COLOR = '#1a365d';

const susQuestions = [
  { q: 'Q1', text: 'Saya rasa saya akan sering menggunakan sistem smart village ini.', positif: true, rerata: 4.50 },
  { q: 'Q2', text: 'Saya rasa sistem ini terlalu rumit untuk digunakan.', positif: false, rerata: 1.80 },
  { q: 'Q3', text: 'Saya rasa sistem ini sangat mudah untuk dioperasikan.', positif: true, rerata: 4.20 },
  { q: 'Q4', text: 'Saya butuh bantuan orang lain / teknisi untuk menggunakan sistem.', positif: false, rerata: 1.90 },
  { q: 'Q5', text: 'Saya rasa fitur-fitur dalam sistem terintegrasi dengan baik.', positif: true, rerata: 4.40 },
  { q: 'Q6', text: 'Saya rasa terlalu banyak hal yang tidak konsisten pada sistem.', positif: false, rerata: 1.50 },
  { q: 'Q7', text: 'Saya rasa mayoritas warga akan cepat belajar menggunakan sistem.', positif: true, rerata: 4.15 },
  { q: 'Q8', text: 'Saya rasa pengoperasian sistem ini membingungkan.', positif: false, rerata: 1.60 },
  { q: 'Q9', text: 'Saya merasa percaya diri menggunakan sistem ini.', positif: true, rerata: 4.30 },
  { q: 'Q10', text: 'Saya butuh belajar banyak hal sebelum dapat menggunakan sistem.', positif: false, rerata: 2.00 },
];

// Formula SUS: (positif - 1) + (5 - negatif) × 2.5
const susScore = susQuestions.reduce((sum, q) => {
  const kontribusi = q.positif ? (q.rerata - 1) : (5 - q.rerata);
  return sum + kontribusi;
}, 0) * 2.5;

const uatTestCases = [
  { modul: 'Login & Autentikasi', cases: 3, lulus: 3, persen: 100 },
  { modul: 'Dashboard Peneliti', cases: 4, lulus: 4, persen: 100 },
  { modul: 'Analisis Readiness', cases: 3, lulus: 3, persen: 100 },
  { modul: 'Analisis Maturity', cases: 2, lulus: 2, persen: 100 },
  { modul: 'Analisis QoL', cases: 2, lulus: 2, persen: 100 },
  { modul: 'Analisis DSS', cases: 2, lulus: 2, persen: 100 },
  { modul: 'Validasi Artefak', cases: 2, lulus: 2, persen: 100 },
  { modul: 'Repository & Publikasi', cases: 2, lulus: 2, persen: 100 },
];

const susScaleColors = (score: number) => {
  if (score >= 90) return { label: 'Grade A+', color: '#276749', bg: '#f0fff4' };
  if (score >= 80) return { label: 'Grade A (Excellent)', color: '#276749', bg: '#f0fff4' };
  if (score >= 70) return { label: 'Grade B (Good)', color: '#2b6cb0', bg: '#ebf8ff' };
  if (score >= 60) return { label: 'Grade C (OK)', color: '#d69e2e', bg: '#fffff0' };
  return { label: 'Grade D/F', color: '#e53e3e', bg: '#fff5f5' };
};

const susInfo = susScaleColors(susScore);

export default function UATSUSPage() {
  const totalCases = uatTestCases.reduce((s, t) => s + t.cases, 0);
  const totalLulus = uatTestCases.reduce((s, t) => s + t.lulus, 0);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Nilai SUS — UAT & SUS Evaluation" modul="Validasi & Evaluasi" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'SUS Score', value: susScore.toFixed(2), sub: susInfo.label, color: susInfo.color, icon: Award },
          { label: 'Responden UAT', value: '15', sub: 'Pengguna Sistem', color: '#2b6cb0', icon: Users },
          { label: 'UAT Test Cases', value: `${totalLulus} / ${totalCases}`, sub: '100% Lulus', color: '#276749', icon: ClipboardList },
          { label: 'Acceptability', value: 'Accept', sub: 'Diterima Warga', color: '#553c9a', icon: CheckCircle2 },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Tabel SUS */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Kuesioner SUS — Feedback User (Skala Likert 1–5)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-center py-2.5 px-2 text-[10px] font-bold text-gray-400 uppercase w-12">No</th>
                    <th className="text-left py-2.5 px-2 text-[10px] font-bold text-gray-400 uppercase">Pertanyaan Kuesioner SUS (System Usability Scale)</th>
                    <th className="text-right py-2.5 px-2 text-[10px] font-bold text-blue-600 uppercase w-20">Rerata</th>
                  </tr>
                </thead>
                <tbody>
                  {susQuestions.map((q, i) => (
                    <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                      <td className="py-2.5 px-2 text-center">
                        <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${q.positif ? 'bg-blue-100' : 'bg-orange-100'}`}>
                          <span className={`text-[10px] font-black ${q.positif ? 'text-blue-700' : 'text-orange-700'}`}>{q.q}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-[12px] text-slate-700 leading-snug">
                        {q.text}
                        <span className={`ml-2 text-[9px] font-bold px-1 py-0.5 rounded ${q.positif ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                          {q.positif ? '+' : '−'}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-right font-black font-mono text-[13px]" style={{ color: q.positif ? '#2b6cb0' : '#c05621' }}>
                        {q.rerata.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-blue-50 border-t-2 border-blue-200">
                    <td colSpan={2} className="py-2.5 px-2 text-[11px] font-bold text-blue-800">
                      SUS Score = Σ [(Positif − 1) + (5 − Negatif)] × 2.5
                    </td>
                    <td className="py-2.5 px-2 text-right text-lg font-black text-blue-800">{susScore.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Interpretasi & Skala */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Interpretasi Hasil SUS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hasil */}
            <div className="p-4 rounded-xl border-2 text-center" style={{ borderColor: susInfo.color, backgroundColor: susInfo.bg }}>
              <CheckCircle2 size={28} className="mx-auto mb-2" style={{ color: susInfo.color }} />
              <p className="text-4xl font-black" style={{ color: susInfo.color }}>{susScore.toFixed(2)}</p>
              <p className="text-sm font-black mt-1" style={{ color: susInfo.color }}>{susInfo.label}</p>
              <p className="text-[11px] text-gray-600 mt-1">Sistem diterima dan usable</p>
            </div>

            {/* Skala SUS */}
            <div className="space-y-1.5">
              <p className="text-[11px] font-bold text-gray-500 uppercase">Skala Penilaian SUS</p>
              {[
                { range: '90 – 100', grade: 'Grade A+ (Best)', color: '#276749' },
                { range: '78 – 89', grade: 'Grade A (Excellent)', color: '#2b6cb0' },
                { range: '68 – 77', grade: 'Grade B (Good)', color: '#d69e2e' },
                { range: '51 – 67', grade: 'Grade C (OK)', color: '#c05621' },
                { range: '0 – 50', grade: 'Grade D/F (Poor)', color: '#e53e3e' },
              ].map((s, i) => (
                <div key={i} className={`flex justify-between items-center p-2 rounded-lg ${susScore >= parseInt(s.range) ? 'border-2' : 'bg-gray-50'}`}
                  style={susScore >= parseInt(s.range.split('–')[0]) && susScore <= parseInt(s.range.split('–')[1] || '100')
                    ? { borderColor: s.color, backgroundColor: s.color + '10' } : {}}>
                  <span className="text-[11px] text-slate-600">{s.range}</span>
                  <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.grade}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* UAT Test Cases */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <ClipboardList size={16} /> UAT Test Cases — Hasil Pengujian per Modul
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {uatTestCases.map((tc, i) => (
              <div key={i} className="p-3 rounded-xl border border-green-200 bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-bold text-slate-700">{tc.modul}</p>
                  <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">{tc.lulus}/{tc.cases} cases</span>
                  <span className="font-black text-green-700">{tc.persen}%</span>
                </div>
                <div className="h-1.5 bg-green-200 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: `${tc.persen}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-blue-800">Total UAT Test Cases: {totalLulus} / {totalCases} Lulus</p>
              <p className="text-[10px] text-blue-600 mt-0.5">Semua modul berhasil diuji dan diterima oleh pengguna</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-blue-800">100%</p>
              <p className="text-[10px] text-blue-600">Pass Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
