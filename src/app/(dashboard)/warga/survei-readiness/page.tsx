'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { 
  Users, MessageSquare, Send, CheckCircle2, ShieldAlert, BookOpen, Smartphone, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

const surveyQuestions = [
  { id: 'R1', aspek: 'Akses Teknologi', text: 'Seberapa mudah warga desa mendapatkan akses jaringan internet seluler untuk kehidupan sehari-hari?' },
  { id: 'R2', aspek: 'Kualitas Pelayanan', text: 'Bagaimana penilaian Anda terhadap kecepatan dan keramahan petugas dalam melayani administrasi warga?' },
  { id: 'R3', aspek: 'Kemampuan Digital', text: 'Seberapa percaya diri Anda atau warga sekitar dalam mengoperasikan perangkat smartphone atau komputer?' },
  { id: 'R4', aspek: 'Keterbukaan Pemdes', text: 'Apakah Pemerintah Desa bersikap transparan mengenai pemanfaatan dana anggaran pembangunan desa?' },
  { id: 'R5', aspek: 'Akses Informasi', text: 'Seberapa mudah Anda mendapatkan informasi resmi desa mengenai jadwal rapat, posyandu, dan agenda adat?' },
  { id: 'R6', aspek: 'Partisipasi', text: 'Seberapa sering warga dilibatkan atau diajak berpendapat dalam musyawarah perencanaan program desa?' },
  { id: 'R7', aspek: 'Perlindungan Budaya', text: 'Apakah program digitalisasi yang masuk ke desa dinilai tetap menjaga nilai-nilai adat Dayak Kenyah?' }
];

export default function SurveiReadinessPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({ R1: 3, R2: 4, R3: 3, R4: 4, R5: 4, R6: 3, R7: 5 });
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
      <PageTitle fitur="Survei Persepsi Kesiapan Masyarakat" modul="Tokoh Masyarakat" color={COLOR} />

      {/* TOKOH MASYARAKAT ADVICE BANNER */}
      <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-purple-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Partisipasi & Sosialisasi Survei</p>
          <p className="text-purple-600 mt-0.5 font-medium leading-relaxed">
            Sebagai Tokoh Masyarakat, Anda dapat mengisi survei ini dan mengajak warga RT/komunitas Anda berpartisipasi guna memperoleh hasil agregat yang akurat. Anda tidak diperkenankan mengubah atau memanipulasi database hasil survei yang telah dikirimkan warga.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Tingkat Kesiapan" value="74,30" satuan="Skor Baik" barColor="purple" progress={74} />
        <StatCard label="Responden Terlibat" value={146} satuan="keluarga" barColor="blue" progress={90} />
        <StatCard label="Target Keterlibatan" value="95%" satuan="partisipasi tinggi" barColor="green" progress={95} />
        <StatCard label="Status Pengisian" value={submitted ? 'Terkirim' : 'Belum Dikirim'} satuan="survei berkala" barColor={submitted ? 'green' : 'orange'} progress={submitted ? 100 : 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* FORM KUESIONER */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BookOpen size={16} /> Kuesioner Persepsi Kesiapan Desa (Likert 1-5)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={24} />
                </div>
                <p className="font-bold text-slate-800 text-sm md:text-base">Tanggapan Berhasil Dikirim!</p>
                <p className="text-xs text-slate-500">Tanggapan Anda telah tersimpan secara anonim dan terhitung dalam DSS Index Desa.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors text-slate-600 mt-2"
                >
                  Isi Ulang Survei
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {surveyQuestions.map((q) => (
                  <div key={q.id} className="p-3 border rounded-xl bg-slate-50/50 space-y-2.5">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">{q.aspek}</span>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{q.id}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 leading-normal">{q.text}</p>
                    <div className="flex items-center gap-2 pt-1">
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
                      <span className="text-[10px] text-slate-400 ml-2 font-semibold">
                        {answers[q.id] === 1 ? 'Sangat Kurang' :
                         answers[q.id] === 2 ? 'Kurang' :
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
                  <Send size={12} /> Kirim Hasil Tanggapan Survei Kesiapan
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* INFO PENGARUH SURVEI */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Smartphone size={16} /> Pentingnya Survei Kesiapan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>
              Survei Kesiapan bertujuan mengukur kemauan dan kemampuan adaptasi digital warga secara nyata. Data agregat yang diperoleh berpengaruh langsung pada:
            </p>
            <div className="space-y-2 font-medium">
              <div className="p-2 border rounded-lg bg-slate-50">
                <span className="font-bold text-slate-700 block">Indeks Readiness Desa:</span>
                Membantu Pemdes melihat efektivitas alokasi ADD untuk pengadaan jaringan Wi-Fi desa.
              </div>
              <div className="p-2 border rounded-lg bg-slate-50">
                <span className="font-bold text-slate-700 block">Kurikulum Pelatihan LMS:</span>
                Menentukan materi pelatihan komputer atau literasi digital yang paling mendesak bagi warga.
              </div>
            </div>
            <p className="text-[10px] text-slate-400 italic pt-2 border-t">
              *Tanggapan Anda dilindungi kerahasiaannya dan diolah secara agregat.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
