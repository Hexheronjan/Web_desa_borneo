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

type StatusKeputusan = 'diterima' | 'diterima dengan perubahan' | 'ditanda' | 'ditolak';

const STATUS_OPTIONS: StatusKeputusan[] = ['diterima', 'diterima dengan perubahan', 'ditanda', 'ditolak'];

const STATUS_COLOR: Record<StatusKeputusan, string> = {
  'diterima': 'bg-green-100 text-green-700',
  'diterima dengan perubahan': 'bg-blue-100 text-blue-700',
  'ditanda': 'bg-orange-100 text-orange-700', // Note: 'ditanda' is 'ditunda' in typo but matching the spec
  'ditolak': 'bg-red-100 text-red-700',
};

const MOCK_DSS = [
  { id: 'PRG-01', name: 'Peningkatan Infrastruktur Internet Dusun C', score: 0.232 },
  { id: 'PRG-02', name: 'Pengembangan Literasi & PAUD Digital', score: 0.198 },
  { id: 'PRG-03', name: 'Digitalisasi Layanan BUMDes Adat', score: 0.175 },
];

const MOCK_AGENDA = [
  {
    id: 'MUD-001',
    judul: 'Musyawarah Desa RKPDes 2026',
    tgl: '25 Juli 2026, 09:00 WITA',
    lokasi: 'Balai Desa Lung Anai',
    rekomendasiDss: ['Peningkatan Infrastruktur Internet Dusun C'],
    dssTerpilih: 'Peningkatan Infrastruktur Internet Dusun C',
    dssScore: 0.232,
    bahan: ['Draf RKPDes 2026', 'Peta Jaringan Internet Dusun C'],
    peserta: ['Kepala Desa', 'Ketua BPD', 'Ketua LPM', 'Tokoh Adat'],
    masukan: ['Minta jangkauan diperluas ke RT 03 Dusun C'],
    statusKeputusan: 'diterima dengan perubahan' as StatusKeputusan,
    alasan: 'Jangkauan internet harus mencakup seluruh RT di Dusun C untuk keadilan akses belajar anak sekolah.',
    penanggungJawab: 'Kasi Pemerintahan & Kominfo',
    diteruskanKeProgram: true,
  },
  {
    id: 'MUD-002',
    judul: 'Rapat Koordinasi BUMDes Adat',
    tgl: '10 Agustus 2026, 10:00 WITA',
    lokasi: 'Kantor BUMDes',
    rekomendasiDss: ['Digitalisasi Layanan BUMDes Adat'],
    dssTerpilih: 'Digitalisasi Layanan BUMDes Adat',
    dssScore: 0.175,
    bahan: ['Draf Rencana Bisnis BUMDes 2026'],
    peserta: ['Kepala Desa', 'Direktur BUMDes', 'Sekdes'],
    masukan: [],
    statusKeputusan: 'diterima' as StatusKeputusan,
    alasan: 'Sesuai dengan rekomendasi AHP untuk percepatan ekonomi pasca-pandemi.',
    penanggungJawab: 'Direktur BUMDes',
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
            <Card className="border-indigo-250">
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
                <div className="p-3 bg-indigo-50/50 border border-indigo-150 rounded-xl space-y-1">
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
              <Gavel size={28} className="mb-2 text-slate-350" />
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
