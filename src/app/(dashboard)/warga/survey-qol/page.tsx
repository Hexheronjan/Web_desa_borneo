'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

const surveyQuestions = [
  { id: 'Q1', dimension: 'Kesehatan', text: 'Seberapa puas Anda dengan akses dan pelayanan Posyandu di desa saat ini?' },
  { id: 'Q2', dimension: 'Pendidikan', text: 'Bagaimana penilaian Anda terhadap fasilitas belajar umum/adat bagi anak-anak?' },
  { id: 'Q3', dimension: 'Sosial', text: 'Seberapa erat nilai kebersamaan dan kerukunan warga desa adat yang Anda rasakan?' },
  { id: 'Q4', dimension: 'Lingkungan', text: 'Apakah lingkungan sekitar tempat tinggal Anda bersih dari sampah dan limbah?' },
  { id: 'Q5', dimension: 'Ekonomi', text: 'Bagaimana kecukupan pendapatan keluarga Anda untuk memenuhi kebutuhan pokok?' }
];

export default function SurveyQoLPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({ Q1: 4, Q2: 4, Q3: 4, Q4: 3, Q5: 3 });
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId: string, val: number) => {
    setAnswers({ ...answers, [qId]: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Survei Kualitas Hidup (QoL)" modul="Warga Adat Borneo" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Indeks QoL Desa" value="76.80" satuan="Skor Baik" barColor="purple" progress={77} />
        <StatCard label="Responden Terlibat" value={146} satuan="keluarga" barColor="blue" progress={90} />
        <StatCard label="Tingkat Partisipasi" value="95%" satuan="sangat tinggi" barColor="green" progress={95} />
        <StatCard label="Status Pengisian" value={submitted ? 'Selesai' : 'Belum Kirim'} satuan="survei berkala" barColor={submitted ? 'green' : 'orange'} progress={submitted ? 100 : 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Survey Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <MessageSquare size={16} /> Kuesioner Pengukuran Kepuasan Hidup Warga (Likert 1-5)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <p className="font-bold text-slate-800 text-sm md:text-base">Terima Kasih atas Partisipasi Anda!</p>
                <p className="text-xs text-slate-500">Tanggapan Anda telah tersimpan secara anonim dan terhitung dalam DSS Index Desa.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors text-slate-600 mt-2"
                >
                  Isi Ulang Survei
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                {surveyQuestions.map((q) => (
                  <div key={q.id} className="p-3.5 border rounded-xl bg-slate-50/50 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">{q.dimension}</span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{q.id}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-normal">{q.text}</p>
                    <div className="flex items-center gap-2.5 pt-1">
                      {[1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleSelect(q.id, val)}
                          className={`w-9 h-9 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${
                            answers[q.id] === val 
                              ? 'bg-purple-700 border-purple-700 text-white shadow-sm' 
                              : 'bg-white text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                      <span className="text-[10px] text-slate-400 ml-1">
                        {answers[q.id] === 1 ? 'Sangat Buruk' :
                         answers[q.id] === 2 ? 'Buruk' :
                         answers[q.id] === 3 ? 'Cukup' :
                         answers[q.id] === 4 ? 'Baik' : 'Sangat Baik'}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send size={12} /> Kirim Hasil Tanggapan Survei
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Previous Results Info */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle2 size={16} /> Sekilas Index QoL Terakhir
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>Pengukuran QoL Desa Adat Borneo didasarkan pada 5 dimensi kepuasan hidup:</p>
            <div className="space-y-2">
              {[
                { name: 'Kesehatan (KIA & Posyandu)', val: '4.35 / 5.0' },
                { name: 'Pendidikan (Literasi & Sekolah)', val: '4.10 / 5.0' },
                { name: 'Sosial (Gotong Royong & Adat)', val: '4.00 / 5.0' },
                { name: 'Lingkungan (Air & Sampah)', val: '3.80 / 5.0' },
                { name: 'Ekonomi (Pendapatan & UMKM)', val: '3.80 / 5.0' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between border-b pb-1 text-[11px]">
                  <span className="text-slate-500">{item.name}</span>
                  <span className="font-bold text-slate-700">{item.val}</span>
                </div>
              ))}
            </div>
            <p className="pt-2 border-t text-[10px] text-slate-400">
              *Tanggapan Anda membantu Kepala Desa dalam menyusun Rencana Anggaran Pembangunan Desa (RKPDes) tahun depan.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
