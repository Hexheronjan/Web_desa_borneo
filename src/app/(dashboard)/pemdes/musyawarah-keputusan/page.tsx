'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Gavel, Calendar, Plus, CheckCircle2, FileText, Send, Clock,
  RefreshCw, Link, AlertTriangle, Users, MessageSquare, ArrowRight, UserCheck
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

type StatusKeputusan = 'diterima' | 'diterima dengan perubahan' | 'ditunda' | 'ditolak';

const STATUS_OPTIONS: StatusKeputusan[] = ['diterima', 'diterima dengan perubahan', 'ditunda', 'ditolak'];

const STATUS_COLOR: Record<StatusKeputusan, string> = {
  'diterima': 'bg-green-100 text-green-700',
  'diterima dengan perubahan': 'bg-blue-100 text-blue-700',
  'ditunda': 'bg-orange-100 text-orange-700',
  'ditolak': 'bg-red-100 text-red-700',
};

const MOCK_DSS = [
  { id: 'A08', name: 'A08 — Dasbor SDGs Desa 3, 4, dan 18 (Jonggon Jaya)', score: 0.9509 },
  { id: 'A02-KI', name: 'A02 — Penguatan Konektivitas & Perangkat (Kedang Ipil)', score: 0.9200 },
  { id: 'A02-LA', name: 'A02 — Penguatan Konektivitas & Perangkat Mode Luring (Lung Anai)', score: 0.9117 },
];

const MOCK_AGENDA = [
  {
    id: 'MUD-001',
    judul: 'Musyawarah Desa & Adat: Prioritas A02 Penguatan Konektivitas (Lung Anai)',
    tgl: '25 Juli 2026, 09:00 WITA',
    lokasi: 'Balai Desa Lung Anai, Kec. Loa Kulu',
    rekomendasiDss: ['A02 — Penguatan Konektivitas & Perangkat Mode Luring (Lung Anai)'],
    dssTerpilih: 'A02 — Penguatan Konektivitas & Perangkat Mode Luring (Lung Anai)',
    dssScore: 0.9117,
    bahan: ['Hasil DSS SAW Dataset SLV 2', 'Profil Kesiapan D2 (30,75) & D5 (89,73)'],
    peserta: ['Pemerintah Desa', 'Lembaga Adat Dayak Kenyah', 'Tokoh Masyarakat', 'Guru', 'Tenaga Kesehatan'],
    masukan: ['Utamakan mode luring-utama (offline-first), perangkat hemat daya, dan persetujuan adat untuk data budaya'],
    statusKeputusan: 'diterima dengan perubahan' as StatusKeputusan,
    alasan: 'Menyesuaikan anggaran desa dan memastikan kendali Lembaga Adat atas klasifikasi data budaya.',
    penanggungJawab: 'Pemerintah Desa & Lembaga Adat Lung Anai',
    diteruskanKeProgram: true,
  },
  {
    id: 'MUD-002',
    judul: 'Musyawarah Prioritas A08 Dasbor SDGs 3, 4, dan 18 (Jonggon Jaya)',
    tgl: '10 Agustus 2026, 10:00 WITA',
    lokasi: 'Balai Desa Jonggon Jaya, Kec. Loa Kulu',
    rekomendasiDss: ['A08 — Dasbor SDGs Desa 3, 4, dan 18 (Jonggon Jaya)'],
    dssTerpilih: 'A08 — Dasbor SDGs Desa 3, 4, dan 18 (Jonggon Jaya)',
    dssScore: 0.9509,
    bahan: ['Hasil Perhitungan SAW A08 (0,9509)', 'Evaluasi Kesenjangan D6 (58,40)'],
    peserta: ['Kepala Desa', 'Lembaga Adat', 'Puskesmas Jonggon Jaya', 'Guru/Tenaga Pendidikan'],
    masukan: [],
    statusKeputusan: 'diterima' as StatusKeputusan,
    alasan: 'Menjawab kesenjangan D6 (41,60) dengan stabilitas sensitivitas ±10% sebesar 13/13 skenario.',
    penanggungJawab: 'Pemerintah Desa Jonggon Jaya',
    diteruskanKeProgram: false,
  }
];

export default function MusyawarahKeputusanPage() {
  const [agendas, setAgendas] = useState(MOCK_AGENDA);
  const [selectedAgenda, setSelectedAgenda] = useState<typeof MOCK_AGENDA[0] | null>(MOCK_AGENDA[0]);

  // Form states
  const [judul, setJudul] = useState('');
  const [tgl, setTgl] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [selectedDss, setSelectedDss] = useState('');
  const [bahan, setBahan] = useState('');
  const [pesertaInput, setPesertaInput] = useState('');

  // Decision fields
  const [statusKep, setStatusKep] = useState<StatusKeputusan>('diterima');
  const [alasan, setAlasan] = useState('');
  const [pj, setPj] = useState('');
  const [masukanInput, setMasukanInput] = useState('');
  const [hasilPembahasan, setHasilPembahasan] = useState('');

  const handleCreateAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !tgl || !lokasi) { alert('Judul, Tanggal, dan Lokasi wajib diisi.'); return; }

    const baru = {
      id: `MUD-00${agendas.length + 1}`,
      judul,
      tgl,
      lokasi,
      rekomendasiDss: selectedDss ? [selectedDss] : [],
      dssTerpilih: selectedDss,
      dssScore: MOCK_DSS.find(d => d.name === selectedDss)?.score || 0,
      bahan: bahan ? [bahan] : [],
      peserta: pesertaInput ? pesertaInput.split(',').map(s => s.trim()) : [],
      masukan: [],
      statusKeputusan: 'diterima' as StatusKeputusan,
      alasan: '',
      penanggungJawab: '',
      diteruskanKeProgram: false,
    };

    setAgendas(prev => [baru, ...prev]);
    setSelectedAgenda(baru);
    
    // reset form
    setJudul(''); setTgl(''); setLokasi(''); setSelectedDss(''); setBahan(''); setPesertaInput('');
    alert('✅ Agenda musyawarah baru berhasil dibuat.');
  };

  const handleSaveDecision = () => {
    if (!selectedAgenda) return;
    
    // Validasi: jika keputusan berbeda dari rekomendasi AHP awal (misal status ditolak/ditunda) wajib tulis alasan
    const dssAwal = MOCK_DSS.find(d => d.name === selectedAgenda.dssTerpilih);
    const isDifferent = statusKep !== 'diterima';
    if (isDifferent && !alasan) {
      alert('⚠️ Perhatian: Keputusan berbeda dari rekomendasi DSS utama. Alasan harus dicatat!');
      return;
    }

    setAgendas(prev => prev.map(a => {
      if (a.id === selectedAgenda.id) {
        return {
          ...a,
          statusKeputusan: statusKep,
          alasan,
          penanggungJawab: pj,
          masukan: masukanInput ? [...a.masukan, masukanInput] : a.masukan,
        };
      }
      return a;
    }));

    alert('✅ Hasil keputusan musyawarah berhasil disimpan!');
    setMasukanInput('');
  };

  const handleForwardToProgram = (id: string) => {
    setAgendas(prev => prev.map(a => a.id === id ? { ...a, diteruskanKeProgram: true } : a));
    alert('🚀 Sukses! Keputusan resmi berhasil diteruskan menjadi Program Kerja Pembangunan Desa.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Musyawarah dan Keputusan" modul="Pemerintah Desa" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <AlertTriangle size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Ketentuan Pengambilan Keputusan</p>
          <p className="text-blue-700 mt-0.5 font-medium leading-relaxed">
            Pemerintah Desa menetapkan keputusan berdasarkan musyawarah. Apabila status keputusan berbeda dari hasil rekomendasi DSS, **alasan penyesuaian harus dicatat**. Keputusan yang diterima dapat diteruskan langsung menjadi program.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* PANEL KIRI: BUAT AGENDA */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
                <Plus size={14} /> Buat Agenda Musyawarah
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAgenda} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">JUDUL MUSDES:</label>
                  <input type="text" value={judul} onChange={e => setJudul(e.target.value)} placeholder="Musdes RKPDes 2026..." className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-indigo-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">TANGGAL & WAKTU:</label>
                  <input type="text" value={tgl} onChange={e => setTgl(e.target.value)} placeholder="25 Juli 2026, 09:00 WITA..." className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-indigo-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">LOKASI:</label>
                  <input type="text" value={lokasi} onChange={e => setLokasi(e.target.value)} placeholder="Balai Desa..." className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-indigo-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">REKOMENDASI DSS YANG DIHUBUNGKAN:</label>
                  <select value={selectedDss} onChange={e => setSelectedDss(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                    <option value="">-- Pilih Rekomendasi --</option>
                    {MOCK_DSS.map(d => <option key={d.id} value={d.name}>{d.name} ({d.score})</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">DAFTAR PESERTA (pisahkan dengan koma):</label>
                  <input type="text" value={pesertaInput} onChange={e => setPesertaInput(e.target.value)} placeholder="Kades, BPD, LPM, Tokoh Adat..." className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-indigo-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-600">BAHAN / MATERI:</label>
                  <input type="text" value={bahan} onChange={e => setBahan(e.target.value)} placeholder="Draf RKPDes 2026.pdf..." className="w-full p-2 border rounded-lg" />
                </div>
                <button type="submit" className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg text-xs">
                  Buat Agenda
                </button>
              </form>
            </CardContent>
          </Card>

          {/* LIST AGENDA */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Pilih Agenda Musyawarah</h3>
            {agendas.map(a => (
              <button
                key={a.id}
                onClick={() => setSelectedAgenda(a)}
                className={`w-full text-left p-3 border rounded-xl transition-all ${selectedAgenda?.id === a.id ? 'border-indigo-400 bg-indigo-50/50 font-bold' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
              >
                <p className="text-xs text-slate-800">{a.judul}</p>
                <p className="text-[10px] text-slate-400 mt-1">{a.tgl}</p>
              </button>
            ))}
          </div>
        </div>

        {/* PANEL TENANGA & KANAN: DETAIL & PENCATATAN KEPUTUSAN */}
        <div className="lg:col-span-2 space-y-4">
          {selectedAgenda ? (
            <Card className="border-indigo-300">
              <CardHeader className="border-b">
                <CardTitle className="text-sm font-bold text-slate-800 leading-snug">{selectedAgenda.judul}</CardTitle>
                <p className="text-xs text-slate-400">Jadwal: {selectedAgenda.tgl} | Lokasi: {selectedAgenda.lokasi}</p>
              </CardHeader>
              <CardContent className="pt-4 text-xs space-y-4">
                
                {/* PESERTA & BAHAN */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 border rounded-xl">
                    <p className="font-bold text-slate-600 mb-1 flex items-center gap-1"><Users size={12} /> Daftar Peserta:</p>
                    <div className="flex gap-1 flex-wrap">
                      {selectedAgenda.peserta.map((p, i) => <span key={i} className="bg-white border px-2 py-0.5 rounded text-[10px]">{p}</span>)}
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border rounded-xl">
                    <p className="font-bold text-slate-600 mb-1 flex items-center gap-1"><FileText size={12} /> Bahan/Materi Rapat:</p>
                    <div className="flex gap-1 flex-wrap">
                      {selectedAgenda.bahan.map((b, i) => <span key={i} className="bg-white border px-2 py-0.5 rounded text-[10px]">{b}</span>)}
                    </div>
                  </div>
                </div>

                {/* DSS TERHUBUNG */}
                <div className="p-3 bg-indigo-50/50 border border-indigo-200 rounded-xl space-y-1">
                  <p className="font-bold text-indigo-900">Rekomendasi DSS Terhubung:</p>
                  <p className="font-semibold text-slate-700">{selectedAgenda.dssTerpilih || 'Tidak ada rekomendasi DSS terhubung'}</p>
                  {selectedAgenda.dssScore > 0 && <p className="text-[10px] text-slate-400">Preferensi AHP: {selectedAgenda.dssScore}</p>}
                </div>

                {/* MASUKAN DITERIMA */}
                <div className="space-y-2">
                  <p className="font-bold text-slate-700">Masukan Masuk Selama Musyawarah:</p>
                  {selectedAgenda.masukan.map((m, i) => (
                    <div key={i} className="p-2 bg-purple-50 border border-purple-100 rounded-lg italic text-purple-800">
                      "{m}"
                    </div>
                  ))}
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={masukanInput}
                      onChange={e => setMasukanInput(e.target.value)}
                      placeholder="Catat masukan peserta musyawarah..."
                      className="flex-1 p-2 border rounded-lg focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        if (!masukanInput) return;
                        setAgendas(prev => prev.map(a => {
                          if (a.id === selectedAgenda.id) {
                            const updated = { ...a, masukan: [...a.masukan, masukanInput] };
                            setSelectedAgenda(updated);
                            return updated;
                          }
                          return a;
                        }));
                        setMasukanInput('');
                      }}
                      className="px-3 bg-purple-700 text-white rounded-lg font-bold"
                    >
                      Catat
                    </button>
                  </div>
                </div>

                {/* FORM KEPUTUSAN */}
                <div className="border-t pt-4 space-y-3">
                  <p className="font-bold text-slate-800 text-xs">Pencatatan Keputusan Resmi:</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">STATUS KEPUTUSAN:</label>
                      <select
                        value={statusKep}
                        onChange={e => setStatusKep(e.target.value as StatusKeputusan)}
                        className="w-full p-2 border rounded-lg bg-white"
                      >
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt.toUpperCase()}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-600">PENANGGUNG JAWAB:</label>
                      <input
                        type="text"
                        value={pj}
                        onChange={e => setPj(e.target.value)}
                        placeholder="Kasi Pemerintahan / Ketua BUMDes..."
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-600 flex items-center gap-1">
                      ALASAN KEPUTUSAN (Wajib jika berbeda dari Rekomendasi DSS):
                    </label>
                    <textarea
                      rows={2}
                      value={alasan}
                      onChange={e => setAlasan(e.target.value)}
                      placeholder="Jelaskan alasan jika menolak/menunda program yang direkomendasikan DSS..."
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveDecision}
                      className="flex-1 py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <Gavel size={13} /> Simpan Keputusan Musyawarah
                    </button>
                    
                    {selectedAgenda.statusKeputusan.startsWith('diterima') && (
                      <button
                        onClick={() => handleForwardToProgram(selectedAgenda.id)}
                        disabled={selectedAgenda.diteruskanKeProgram}
                        className={`flex-1 py-2.5 font-bold rounded-lg flex items-center justify-center gap-1.5 ${selectedAgenda.diteruskanKeProgram ? 'bg-green-100 text-green-700 cursor-default' : 'bg-emerald-700 hover:bg-emerald-800 text-white'}`}
                      >
                        <UserCheck size={13} /> {selectedAgenda.diteruskanKeProgram ? 'Telah Menjadi Program ✓' : 'Teruskan Menjadi Program'}
                      </button>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          ) : (
            <div className="h-[300px] border border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white">
              <Gavel size={28} className="mb-2 text-slate-400" />
              <p className="font-bold text-sm text-slate-600">Pilih Agenda</p>
            </div>
          )}
        </div>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data musyawarah disebarluaskan ke portal warga & BPD secara otomatis</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
