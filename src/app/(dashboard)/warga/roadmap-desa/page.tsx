'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { 
  Milestone, Calendar, User, Eye, CheckCircle2, MessageSquare, 
  HelpCircle, RefreshCw, Send, AlertCircle, ArrowRight, PlayCircle
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

interface Program {
  id: string;
  nama: string;
  fase: string;
  target: string;
  jadwal: string;
  pj: string;
  status: 'Selesai' | 'Berjalan' | 'Persiapan' | 'Ditunda';
  masalah: string;
  subPrograms: string[];
  logs: string[];
}

const programsData: Program[] = [
  {
    id: 'P1',
    nama: 'Internet Desa & Booster Sinyal',
    fase: 'Fase I: Infrastruktur Digital Dasar',
    target: 'Konektivitas 100% di 3 Dusun Utama',
    jadwal: 'Mei - September 2025',
    pj: 'Kasi Pembangunan & Telekomunikasi',
    status: 'Berjalan',
    masalah: 'Mengatasi area blank spot sinyal seluler di Dusun B dan C.',
    subPrograms: [
      'Pemasangan fiber optic di Balai Desa',
      'Penyediaan 3 titik hotspot Wi-Fi gratis di sekolah dan balai adat',
      'Koordinasi provider untuk booster sinyal seluler'
    ],
    logs: [
      '12 Mei 2025: Survey lokasi dan penetapan koordinat tiang antena.',
      '30 Mei 2025: Pemasangan perangkat Wi-Fi Balai Desa selesai.',
      '18 Juli 2025: Uji coba jaringan Wi-Fi sekolah umum.'
    ]
  },
  {
    id: 'P2',
    nama: 'Posyandu Digital & Poskesdes Pintar',
    fase: 'Fase I: Layanan Kesehatan Pintar',
    target: 'Digitalisasi Rekam Medis KIA & Stunting',
    jadwal: 'Juni - Desember 2025',
    pj: 'Nakes & Kader Posyandu Desa',
    status: 'Berjalan',
    masalah: 'Mengurangi stunting dan mempermudah pemeriksaan ibu hamil.',
    subPrograms: [
      'Pelatihan kader posyandu menggunakan tablet SID',
      'Pencatatan BB & TB balita terintegrasi sistem rekam medis',
      'Edukasi nutrisi stunting via WhatsApp broadcast'
    ],
    logs: [
      '01 Juni 2025: Pelatihan kader posyandu batch 1.',
      '20 Juni 2025: Pembagian tablet pencatatan data kesehatan.'
    ]
  },
  {
    id: 'P3',
    nama: 'LMS Pendidikan & Literasi Budaya',
    fase: 'Fase II: Penguatan SDM & Budaya',
    target: 'Sertifikasi Keterampilan 200 Pemuda',
    jadwal: 'Januari - Juni 2026',
    pj: 'Guru Fasilitator & Lembaga Adat',
    status: 'Persiapan',
    masalah: 'Meningkatkan skill digital kerja pemuda tanpa melupakan adat lokal.',
    subPrograms: [
      'Pengembangan materi kursus kerajinan anyaman rotan online',
      'Sertifikasi keahlian komputer dasar tingkat desa',
      'Pustaka digital dokumentasi adat Dayak'
    ],
    logs: [
      'Draft kurikulum anyaman rotan sedang dikaji oleh Lembaga Adat.'
    ]
  },
  {
    id: 'P4',
    nama: 'Pengelolaan Sampah Terpadu (TPS)',
    fase: 'Fase II: Lingkungan & Keberlanjutan',
    target: 'Reduksi Sampah Organik 50%',
    jadwal: 'Maret - September 2025',
    pj: 'LPM & Karang Taruna',
    status: 'Ditunda',
    masalah: 'Menumpuknya sampah di TPS dusun terdekat.',
    subPrograms: [
      'Pengadaan gerobak sampah motor',
      'Pelatihan pembuatan kompos organik',
      'Penyediaan tong sampah pilah'
    ],
    logs: [
      'Penyediaan gerobak sampah ditunda menunggu pencairan dana ADD Tahap II.'
    ]
  }
];

export default function RoadmapPage() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeTab, setActiveTab] = useState<'sub' | 'track'>('sub');
  const [feedback, setFeedback] = useState('');
  const [feedbacksList, setFeedbacksList] = useState<Record<string, string[]>>({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const handleOpenDetail = (program: Program) => {
    setSelectedProgram(program);
    setActiveTab('sub');
  };

  const handleOpenFeedback = (program: Program) => {
    setSelectedProgram(program);
    setShowFeedbackModal(true);
    setFeedback('');
  };

  const submitFeedback = () => {
    if (!selectedProgram || !feedback) return;
    const progId = selectedProgram.id;
    const currentFeedbacks = feedbacksList[progId] || [];
    setFeedbacksList({
      ...feedbacksList,
      [progId]: [...currentFeedbacks, feedback]
    });
    alert('Masukan Anda berhasil disimpan dan diteruskan ke Penanggung Jawab program!');
    setShowFeedbackModal(false);
    setFeedback('');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Roadmap Smart Living Village" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Program" value={programsData.length} satuan="Program Utama" barColor="purple" progress={100} />
        <StatCard label="Status Berjalan" value={programsData.filter(p => p.status === 'Berjalan').length} satuan="Program Aktif" barColor="blue" progress={50} />
        <StatCard label="Tahapan Roadmap" value="3 Fase" satuan="Pembangunan" barColor="orange" progress={100} />
        <StatCard label="Keterlibatan Warga" value="Aktif" satuan="Pengawasan Sosial" barColor="green" progress={100} />
      </div>

      {/* ROADMAP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* DAFTAR PROGRAM ROADMAP */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Tahapan & Daftar Program Prioritas</h2>
          </div>

          <div className="space-y-3">
            {programsData.map((prog) => (
              <div 
                key={prog.id} 
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:shadow-md transition-shadow"
              >
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-purple-700 bg-purple-50 px-2 py-0.5 rounded">{prog.id}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{prog.fase}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      prog.status === 'Selesai' ? 'bg-green-50 text-green-700' :
                      prog.status === 'Berjalan' ? 'bg-blue-50 text-blue-700' :
                      prog.status === 'Persiapan' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                    }`}>{prog.status}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 truncate">{prog.nama}</h3>
                  <p className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertCircle size={12} /> {prog.masalah}
                  </p>
                  <p className="text-[11px] text-slate-500">Target: {prog.target} • Jadwal: {prog.jadwal}</p>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => handleOpenDetail(prog)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors"
                  >
                    <Eye size={12} /> Detail Program
                  </button>
                  <button 
                    onClick={() => handleOpenFeedback(prog)}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 transition-colors"
                  >
                    <MessageSquare size={12} /> Beri Masukan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAIL & TINDAK LANJUT INTERAKTIF */}
        <div className="lg:col-span-1">
          {selectedProgram ? (
            <Card className="h-fit border-purple-200">
              <CardHeader className="pb-3 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-50 border px-1.5 py-0.5 rounded">{selectedProgram.id}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{selectedProgram.pj}</span>
                </div>
                <CardTitle className="text-sm font-bold text-slate-800 mt-2">{selectedProgram.nama}</CardTitle>
                <div className="flex gap-1.5 mt-3 border-b">
                  <button 
                    onClick={() => setActiveTab('sub')}
                    className={`pb-2 text-xs font-bold transition-colors ${activeTab === 'sub' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-slate-400'}`}
                  >
                    Program Terkait
                  </button>
                  <button 
                    onClick={() => setActiveTab('track')}
                    className={`pb-2 text-xs font-bold transition-colors ${activeTab === 'track' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-slate-400'}`}
                  >
                    Pantau Tindak Lanjut
                  </button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 text-xs">
                {activeTab === 'sub' ? (
                  <div className="space-y-3">
                    <p className="font-bold text-slate-700">Sub-Program yang Berjalan:</p>
                    <ul className="space-y-2">
                      {selectedProgram.subPrograms.map((sub, idx) => (
                        <li key={idx} className="flex gap-2 items-start p-2 rounded-lg bg-slate-50 border border-slate-100">
                          <CheckCircle2 size={13} className="text-purple-700 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600 font-medium leading-relaxed">{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="font-bold text-slate-700">Log Pelaksanaan & Tindak Lanjut:</p>
                    <div className="relative border-l border-slate-200 pl-3.5 ml-1.5 space-y-3">
                      {selectedProgram.logs.map((log, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[20px] top-1 w-2.5 h-2.5 rounded-full bg-purple-700 border-2 border-white" />
                          <p className="text-slate-600 leading-relaxed font-medium">{log}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAMPILAN MASUKAN DARI TOKOH MASYARAKAT */}
                {feedbacksList[selectedProgram.id] && feedbacksList[selectedProgram.id].length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <p className="font-bold text-slate-700">Masukan Anda:</p>
                    <div className="space-y-1.5">
                      {feedbacksList[selectedProgram.id].map((f, i) => (
                        <p key={i} className="p-2 rounded bg-purple-50/50 text-purple-800 border border-purple-100 italic leading-relaxed">
                          "{f}"
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="h-[300px] border border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 p-5 text-center bg-white shadow-sm">
              <Milestone size={28} className="mb-2 text-slate-300" />
              <p className="font-bold text-sm text-slate-600">Pratinjau Detail & Tindak Lanjut</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Klik tombol "Detail Program" di sebelah kiri untuk mulai melacak log & program kerja terkait.</p>
            </div>
          )}
        </div>

      </div>

      {/* FEEDBACK MODAL */}
      {showFeedbackModal && selectedProgram && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[420px] overflow-hidden border">
            <div className="p-4 bg-purple-900 text-white flex justify-between items-center">
              <h3 className="font-bold text-sm">Beri Masukan: {selectedProgram.nama}</h3>
              <button onClick={() => setShowFeedbackModal(false)} className="text-purple-200 hover:text-white font-bold text-sm">✕</button>
            </div>
            <div className="p-4 space-y-4 text-xs">
              <p className="text-slate-500 leading-normal">
                Masukan Anda sebagai Tokoh Masyarakat akan langsung diteruskan kepada Penanggung Jawab program untuk bahan evaluasi RKPDes.
              </p>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">MASUKAN & REKOMENDASI ANDA:</label>
                <textarea 
                  rows={4}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Contoh: Mohon koordinasi dipercepat dengan provider XL/Telkomsel agar dusun B tidak terlewat..."
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-slate-700"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => setShowFeedbackModal(false)}
                  className="flex-1 py-2.5 rounded-lg border text-xs font-bold hover:bg-slate-50 text-slate-600"
                >
                  Batal
                </button>
                <button 
                  onClick={submitFeedback}
                  className="flex-1 py-2.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <Send size={12} /> Kirim Masukan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50 mt-1">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Terintegrasi ke Dashboard monitoring program kerja Pemdes & BPD</span>
        <span>Versi Dokumen: Roadmap SLV v2.0</span>
      </div>

    </div>
  );
}
