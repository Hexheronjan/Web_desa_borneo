'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Laptop, ShieldAlert, Award, FileText, CheckCircle, Info, HelpCircle
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface MateriLiterasi {
  id: string;
  judul: string;
  kategori: 'Dasar Perangkat' | 'Keamanan Digital' | 'Layanan Desa' | 'Pelatihan Literasi';
  deskripsi: string;
  durasi: string;
  tingkat: 'Pemula' | 'Menengah' | 'Mahir';
  status: 'Selesai' | 'Mulai';
}

export default function LiterasiDigitalPage() {
  const [list, setList] = useState<MateriLiterasi[]>([
    { id: 'LD-01', judul: 'Pengenalan Tombol & Navigasi Laptop / HP', kategori: 'Dasar Perangkat', deskripsi: 'Cara menghidupkan, mematikan, menyambung WiFi, dan membuka browser web dengan benar.', durasi: '45 Menit', tingkat: 'Pemula', status: 'Selesai' },
    { id: 'LD-02', judul: 'Keamanan Kata Sandi & Menghindari Penipuan Online', kategori: 'Keamanan Digital', deskripsi: 'Materi praktis menjaga akun WhatsApp, email, dan menghindari tautan phishing berbahaya.', durasi: '60 Menit', tingkat: 'Pemula', status: 'Selesai' },
    { id: 'LD-03', judul: 'Panduan Mengajukan Surat & Aspirasi Lewat Aplikasi Desa', kategori: 'Layanan Desa', deskripsi: 'Langkah demi langkah menggunakan portal Smart Living Village secara mandiri di rumah.', durasi: '30 Menit', tingkat: 'Pemula', status: 'Mulai' },
    { id: 'LD-04', judul: 'Pelatihan Literasi Digital & Pengenalan Internet Sehat', kategori: 'Pelatihan Literasi', deskripsi: 'Etika bermedia sosial, verifikasi hoaks, dan mencari informasi bermanfaat di internet.', durasi: '90 Menit', tingkat: 'Menengah', status: 'Mulai' },
  ]);

  // Quiz Penilaian Mandiri Sederhana
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const quizQuestions = [
    { id: 1, q: 'Apa langkah pertama jika menerima tautan mencurigakan lewat WA?', options: ['Langsung klik', 'Hapus dan laporkan', 'Kirim ke grup lain'], correct: 'Hapus dan laporkan' },
    { id: 2, q: 'Manakah kata sandi (password) yang paling aman?', options: ['12345678', 'namaDesa123', 'Borneo*2026!'], correct: 'Borneo*2026!' },
    { id: 3, q: 'Bagaimana memverifikasi berita hoaks di internet?', options: ['Percaya jika banyak dibagikan', 'Cek di situs resmi turnbackhoax.id', 'Tanya tetangga'], correct: 'Cek di situs resmi turnbackhoax.id' },
  ];

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(quizAnswers).length < quizQuestions.length) {
      alert('Mohon jawab semua pertanyaan.');
      return;
    }
    setQuizSubmitted(true);
  };

  const score = quizQuestions.reduce((acc, q) => {
    return acc + (quizAnswers[q.id] === q.correct ? 1 : 0);
  }, 0);

  const handleStart = (id: string) => {
    setList(prev => prev.map(item => item.id === id ? { ...item, status: 'Selesai' } : item));
    alert('📖 Materi berhasil diselesaikan.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Literasi Digital" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER NOTIFIKASI */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <Info size={16} className="text-indigo-600 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Gunakan istilah literasi digital, bukan istilah indeks, kecuali terdapat formula pengukuran yang resmi.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Materi Selesai" value={`${list.filter(m => m.status === 'Selesai').length} Materi`} satuan="Telah Tuntas" barColor="green" progress={50} />
        <StatCard label="Materi Tersedia" value={`${list.length} Modul`} satuan="Dasar hingga Mahir" barColor="blue" progress={100} />
        <StatCard label="Progres Keseluruhan" value="50%" satuan="Belajar Mandiri" barColor="purple" progress={50} />
        <StatCard label="Hasil Evaluasi Mandiri" value={quizSubmitted ? `${score}/${quizQuestions.length} Benar` : 'Belum Ujian'} satuan="Penilaian Mandiri" barColor="orange" progress={quizSubmitted ? (score/quizQuestions.length)*100 : 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* LIST MATERI LITERASI */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Progres Literasi Digital Saya</h2>

          <div className="space-y-3">
            {list.map(m => (
              <Card key={m.id} className="border border-slate-200">
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-center flex-wrap gap-1.5">
                    <div className="flex items-center gap-2">
                      <Laptop size={14} className="text-indigo-700" />
                      <span className="font-bold text-slate-400 text-[10px]">{m.kategori}</span>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                      m.tingkat === 'Pemula' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-blue-50 border-blue-200 text-blue-700'
                    }`}>
                      {m.tingkat}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-805 text-[13px]">{m.judul}</h3>
                    <p className="text-slate-550 leading-relaxed mt-1 text-[11px]">{m.deskripsi}</p>
                  </div>

                  <div className="border-t pt-2.5 flex justify-between items-center text-[10px] text-slate-400">
                    <span>Durasi Belajar: <strong>{m.durasi}</strong></span>
                    {m.status === 'Selesai' ? (
                      <span className="flex items-center gap-0.5 text-green-700 font-bold"><CheckCircle size={11} /> Selesai</span>
                    ) : (
                      <button onClick={() => handleStart(m.id)} className="px-3 py-1 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-800">
                        Mulai Belajar
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* RIWAYAT KEGIATAN LITERASI */}
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Riwayat Kegiatan Selesai</h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center p-2.5 bg-slate-50 border rounded-lg">
                <p className="font-bold text-slate-800">1. Pengenalan Tombol &amp; Navigasi Laptop / HP</p>
                <span className="text-[10px] text-slate-400">Selesai: 14 Juli 2026</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-50 border rounded-lg">
                <p className="font-bold text-slate-800">2. Keamanan Kata Sandi &amp; Menghindari Penipuan Online</p>
                <span className="text-[10px] text-slate-400">Selesai: 16 Juli 2026</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* PANEL KANAN: PENILAIAN MANDIRI SEDERHANA */}
        <div className="space-y-4">
          <Card className="border border-slate-200">
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle size={14} className="text-indigo-700" /> Penilaian Mandiri Sederhana
              </CardTitle>
            </CardHeader>
            <CardContent>
              {quizSubmitted ? (
                <div className="p-4 bg-slate-50 rounded-lg space-y-3.5 text-center">
                  <Award size={28} className="text-indigo-700 mx-auto" />
                  <div>
                    <p className="font-bold text-slate-850">Evaluasi Mandiri Selesai</p>
                    <p className="text-xs text-slate-500 mt-1">Anda menjawab <strong>{score} dari {quizQuestions.length}</strong> pertanyaan dengan benar.</p>
                  </div>
                  <button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }} className="w-full py-1.5 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-800">
                    Ulangi Penilaian
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuizSubmit} className="space-y-4">
                  {quizQuestions.map(q => (
                    <div key={q.id} className="space-y-2">
                      <p className="font-bold text-slate-805">{q.id}. {q.q}</p>
                      <div className="space-y-1">
                        {q.options.map(opt => (
                          <label key={opt} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-slate-50 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              value={opt}
                              checked={quizAnswers[q.id] === opt}
                              onChange={() => setQuizAnswers(prev => ({ ...prev, [q.id]: opt }))}
                              className="text-indigo-700"
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button type="submit" className="w-full py-2 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 shadow-sm">
                    Kirim Penilaian Mandiri
                  </button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Rekomendasi materi berikutnya */}
          <Card className="border-l-4 border-l-purple-600 bg-purple-50/10">
            <CardHeader className="py-2.5">
              <CardTitle className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">Rekomendasi Belajar Berikutnya</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 font-semibold text-slate-700">
              <p>👉 Modul: "Panduan Mengajukan Surat &amp; Aspirasi Lewat Aplikasi Desa"</p>
              <p className="text-[10px] text-slate-400">Estimasi waktu belajar: 30 Menit</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
