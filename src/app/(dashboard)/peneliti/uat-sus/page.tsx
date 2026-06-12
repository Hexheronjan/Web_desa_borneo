'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { CheckCircle2, Award, ListOrdered } from 'lucide-react';

const COLOR = '#37474f';

const susQuestions = [
  { q: 'Q1', text: 'Saya rasa saya akan sering menggunakan sistem smart village ini.', score: '4.50' },
  { q: 'Q2', text: 'Saya rasa sistem ini terlalu rumit untuk digunakan.', score: '1.80' },
  { q: 'Q3', text: 'Saya rasa sistem ini sangat mudah untuk dioperasikan.', score: '4.20' },
  { q: 'Q4', text: 'Saya butuh bantuan orang lain / teknisi untuk menggunakan sistem.', score: '1.90' },
  { q: 'Q5', text: 'Saya rasa fitur-fitur dalam sistem terintegrasi dengan baik.', score: '4.40' },
  { q: 'Q6', text: 'Saya rasa terlalu banyak hal yang tidak konsisten pada sistem.', score: '1.50' },
  { q: 'Q7', text: 'Saya rasa mayoritas warga akan cepat belajar menggunakan sistem.', score: '4.15' },
  { q: 'Q8', text: 'Saya rasa pengoperasian sistem ini membingungkan.', score: '1.60' },
  { q: 'Q9', text: 'Saya merasa percaya diri menggunakan sistem ini.', score: '4.30' },
  { q: 'Q10', text: 'Saya butuh belajar banyak hal sebelum dapat menggunakan sistem.', score: '2.00' }
];

export default function UATSUSPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="UAT & SUS Evaluation" modul="Evaluasi Sistem" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="SUS Score" value="82.75" satuan="Skor A (Excellent)" barColor="green" progress={83} />
        <StatCard label="Responden UAT" value={15} satuan="pengguna teruji" barColor="blue" progress={100} />
        <StatCard label="UAT Test Cases" value="20 / 20" satuan="100% lulus" barColor="green" progress={100} />
        <StatCard label="Acceptability" value="Accept" satuan="diterima warga" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Table SUS */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Skor Evaluasi Rerata Kuesioner SUS (Skala Likert 1 - 5)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">Pertanyaan Kuesioner SUS (System Usability Scale)</th>
                    <th className="pb-2 text-right">Rerata Skor</th>
                  </tr>
                </thead>
                <tbody>
                  {susQuestions.map((q, i) => (
                    <tr key={q.q} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{q.q}</td>
                      <td className="py-2.5 pr-4 text-slate-700 text-xs md:text-sm leading-relaxed">{q.text}</td>
                      <td className="py-2.5 text-right font-bold font-mono text-xs text-slate-800">{q.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* SUS Score Interpretation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Interpretasi Hasil Pengujian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-2">
              <span className="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                <CheckCircle2 size={10} /> TERIMA (ACCEPTABLE)
              </span>
              <p className="font-bold text-green-950">SUS Score: 82.75</p>
              <p className="text-[11px] text-green-800">
                Sistem dikategorikan <strong>Grade A (Excellent)</strong>. Usability sangat memuaskan bagi pengguna awam maupun aparat desa.
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-slate-50 space-y-2">
              <p className="font-bold text-slate-700">Skala Penilaian SUS:</p>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between"><span>78.9 - 100.0</span> <span className="font-bold text-green-700">Grade A (Excellent)</span></div>
                <div className="flex justify-between"><span>72.6 - 78.8</span> <span>Grade B (Good)</span></div>
                <div className="flex justify-between"><span>62.7 - 72.5</span> <span>Grade C (OK)</span></div>
                <div className="flex justify-between"><span>51.7 - 62.6</span> <span>Grade D (Poor)</span></div>
                <div className="flex justify-between"><span>0.0 - 51.6</span> <span>Grade F (Fail)</span></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
