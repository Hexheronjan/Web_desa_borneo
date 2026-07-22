'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  MessageSquare, Send, CheckCircle2, ChevronRight, RefreshCw,
  Plus, Users, Eye, HelpCircle, UserCheck, Gavel, FileCheck
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

type StatusAspirasi = 'Baru' | 'Diperiksa' | 'Dibahas' | 'Diproses' | 'Selesai' | 'Ditutup';

const ALUR_STATUS: StatusAspirasi[] = ['Baru', 'Diperiksa', 'Dibahas', 'Diproses', 'Selesai', 'Ditutup'];

const STATUS_COLOR: Record<StatusAspirasi, string> = {
  'Baru': 'bg-sky-100 text-sky-700',
  'Diperiksa': 'bg-yellow-100 text-yellow-700',
  'Dibahas': 'bg-orange-100 text-orange-700',
  'Diproses': 'bg-blue-100 text-blue-700',
  'Selesai': 'bg-green-100 text-green-700',
  'Ditutup': 'bg-slate-100 text-slate-650',
};

const DUMMY_ASPIRASI = [
  {
    id: 'ASP-001',
    judul: 'Perbaikan Jalan Poros RT 03 Dusun B',
    kategori: 'Infrastruktur',
    isi: 'Jalan utama di RT 03 berlubang cukup parah, membahayakan anak sekolah saat malam hari karena minim penerangan.',
    warga: 'Bapak Rudi (RT 03 Dusun B)',
    status: 'Baru' as StatusAspirasi,
    petugas: '',
    tanggapan: '',
    dibawaKeMusdes: false,
    alasan: '',
    buktiPenyelesaian: '',
    tgl: '15 Juli 2026',
  },
  {
    id: 'ASP-002',
    judul: 'Penambahan WiFi Publik di Balai Adat',
    kategori: 'Teknologi & Digital',
    isi: 'Balai adat sering digunakan berkumpul pemuda untuk belajar kelompok. Mohon ditambahkan kuota WiFi atau dipasang access point tambahan.',
    warga: 'Sdr. Hendra (Karang Taruna)',
    status: 'Diperiksa' as StatusAspirasi,
    petugas: 'Kasi Pemerintahan',
    tanggapan: 'Sedang diperiksa kuota internet bulanan balai adat.',
    dibawaKeMusdes: false,
    alasan: '',
    buktiPenyelesaian: '',
    tgl: '14 Juli 2026',
  },
  {
    id: 'ASP-003',
    judul: 'Pelatihan Anyaman Tradisional untuk Pemudi',
    kategori: 'Kebudayaan & Ekonomi',
    isi: 'Pelatihan ini diperlukan agar anyaman rotan khas Dayak Kenyah tidak punah dan pemudi desa memiliki keterampilan ekonomi tambahan.',
    warga: 'Ibu Maria (LPM)',
    status: 'Selesai' as StatusAspirasi,
    petugas: 'Kasi Kesejahteraan Rakyat',
    tanggapan: 'Program disetujui dalam Musdes anggaran Semester I.',
    dibawaKeMusdes: true,
    alasan: 'Sesuai dengan target SDG Desa 18 (Kelembagaan & Budaya).',
    buktiPenyelesaian: 'Sertifikat_Pelatihan_Anyaman_Rotan.pdf',
    tgl: '10 Juli 2026',
  },
];

export default function AspirasiPartisipasiPage() {
  const [data, setData] = useState(DUMMY_ASPIRASI);
  const [selectedAsp, setSelectedAsp] = useState<typeof DUMMY_ASPIRASI[0] | null>(DUMMY_ASPIRASI[0]);

  // Form edit states
  const [kategori, setKategori] = useState('');
  const [petugas, setPetugas] = useState('');
  const [tanggapan, setTanggapan] = useState('');
  const [status, setStatus] = useState<StatusAspirasi>('Baru');
  const [alasan, setAlasan] = useState('');
  const [bukti, setBukti] = useState('');

  const handleUpdate = (id: string) => {
    setData(prev => prev.map(a => {
      if (a.id === id) {
        const updated = {
          ...a,
          kategori: kategori || a.kategori,
          petugas: petugas || a.petugas,
          tanggapan: tanggapan || a.tanggapan,
          status: status,
          alasan: alasan || a.alasan,
          buktiPenyelesaian: bukti || a.buktiPenyelesaian,
        };
        setSelectedAsp(updated);
        return updated;
      }
      return a;
    }));
    alert('✅ Aspirasi berhasil diperbarui.');
  };

  const handleBawaKeMusdes = (id: string) => {
    setData(prev => prev.map(a => {
      if (a.id === id) {
        const updated = { ...a, dibawaKeMusdes: true, status: 'Dibahas' as StatusAspirasi };
        setSelectedAsp(updated);
        return updated;
      }
      return a;
    }));
    alert('✅ Aspirasi berhasil dibawa ke forum Musyawarah Desa. Status diubah menjadi DIBAHAS.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Aspirasi dan Partisipasi Masyarakat" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Aspirasi Warga" value={data.length} satuan="Aspirasi Masuk" barColor="purple" progress={100} />
        <StatCard label="Aspirasi Baru" value={data.filter(a => a.status === 'Baru').length} satuan="Menunggu Tanggapan" barColor="orange" progress={33} />
        <StatCard label="Dibawa ke Musdes" value={data.filter(a => a.dibawaKeMusdes).length} satuan="Masuk Agenda Rapat" barColor="green" progress={33} />
        <StatCard label="Selesai & Ditutup" value={data.filter(a => ['Selesai', 'Ditutup'].includes(a.status)).length} satuan="Selesai Ditindaklanjuti" barColor="blue" progress={33} />
      </div>

      {/* STATUS ALUR */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Alur Status Penanganan Aspirasi:</p>
        <div className="flex items-center flex-wrap gap-1">
          {ALUR_STATUS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_COLOR[s]}`}>{s}</span>
              {i < ALUR_STATUS.length - 1 && <ChevronRight size={12} className="text-slate-350" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* LIST ASPIRASI WARGA */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Daftar Aspirasi Warga</h2>
          {data.map(a => (
            <button
              key={a.id}
              onClick={() => {
                setSelectedAsp(a);
                setKategori(a.kategori);
                setPetugas(a.petugas);
                setTanggapan(a.tanggapan);
                setStatus(a.status);
                setAlasan(a.alasan);
                setBukti(a.buktiPenyelesaian);
              }}
              className={`w-full text-left p-3 border rounded-xl transition-all space-y-2 ${selectedAsp?.id === a.id ? 'border-indigo-400 bg-indigo-50/50 font-bold' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
            >
              <div className="flex justify-between items-center flex-wrap gap-1">
                <span className="text-[9px] font-mono text-slate-400 font-bold">{a.id}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${STATUS_COLOR[a.status]}`}>{a.status}</span>
              </div>
              <p className="text-xs font-bold text-slate-800 leading-snug">{a.judul}</p>
              <p className="text-[10px] text-slate-400">{a.warga} • {a.tgl}</p>
            </button>
          ))}
        </div>

        {/* DETAIL & TINDAK LANJUT PEMDES */}
        <div className="lg:col-span-2">
          {selectedAsp ? (
            <Card className="border-indigo-250">
              <CardHeader className="pb-2 border-b">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400">{selectedAsp.id}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${STATUS_COLOR[selectedAsp.status]}`}>{selectedAsp.status}</span>
                </div>
                <CardTitle className="text-sm font-bold text-slate-850 mt-1">{selectedAsp.judul}</CardTitle>
                <p className="text-xs text-slate-450 font-medium">Diajukan oleh: {selectedAsp.warga} pada {selectedAsp.tgl}</p>
              </CardHeader>
              <CardContent className="pt-4 text-xs space-y-4">
                
                {/* CONTENT */}
                <div className="p-3 bg-slate-50 border rounded-xl">
                  <p className="font-bold text-slate-600 mb-1">Isi Aspirasi:</p>
                  <p className="text-slate-700 leading-relaxed italic">"{selectedAsp.isi}"</p>
                </div>

                {/* EDIT/RESPONSE FORM */}
                <div className="space-y-3 border-t pt-3.5">
                  <p className="font-bold text-slate-850 text-xs">Penanganan & Tindak Lanjut Pemdes:</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-bold text-slate-650">PENGELOMPOKAN KATEGORI:</label>
                      <input type="text" value={kategori} onChange={e => setKategori(e.target.value)} placeholder="Infrastruktur / Ekonomi..." className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-indigo-300" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-650">TETAPKAN PETUGAS PJ:</label>
                      <input type="text" value={petugas} onChange={e => setPetugas(e.target.value)} placeholder="Nama petugas pelaksana..." className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-indigo-300" />
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-650">STATUS PENANGANAN:</label>
                      <select value={status} onChange={e => setStatus(e.target.value as StatusAspirasi)} className="w-full p-2 border rounded-lg bg-white">
                        {ALUR_STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-bold text-slate-650">BUKTI PENYELESAIAN:</label>
                      <input type="text" value={bukti} onChange={e => setBukti(e.target.value)} placeholder="Nama file bukti penyelesaian..." className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-indigo-300" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-650">TANGGAPAN / CATATAN PROGRES:</label>
                    <textarea rows={2} value={tanggapan} onChange={e => setTanggapan(e.target.value)} placeholder="Tuliskan respons resmi desa..." className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-indigo-300" />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-650">ALASAN KEPUTUSAN / CATATAN ADAT:</label>
                    <textarea rows={1} value={alasan} onChange={e => setAlasan(e.target.value)} placeholder="Alasan penetapan status..." className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-indigo-300" />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(selectedAsp.id)}
                      className="flex-1 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg text-xs"
                    >
                      Simpan Perubahan
                    </button>
                    {!selectedAsp.dibawaKeMusdes && (
                      <button
                        onClick={() => handleBawaKeMusdes(selectedAsp.id)}
                        className="flex-1 py-2 bg-orange-700 hover:bg-orange-850 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1"
                      >
                        <Gavel size={12} /> Bawa ke Musdes
                      </button>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          ) : (
            <div className="h-[300px] border border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white">
              <MessageSquare size={28} className="mb-2 text-slate-350" />
              <p className="font-bold text-sm text-slate-600">Pilih Aspirasi</p>
            </div>
          )}
        </div>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Terhubung langsung dengan aplikasi pelaporan warga</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
