'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Gavel, FileText, User, Calendar, CheckCircle2, Clock, RefreshCw, MessageSquare, Send, AlertCircle
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

type StatusKeputusan = 'Menunggu' | 'Berjalan' | 'Selesai' | 'Tertunda';
const STATUS_COLOR: Record<StatusKeputusan, string> = {
  Menunggu: 'bg-slate-100 text-slate-600',
  Berjalan: 'bg-blue-100 text-blue-700',
  Selesai: 'bg-green-100 text-green-700',
  Tertunda: 'bg-red-100 text-red-700',
};

const KEPUTUSAN_DATA = [
  {
    id: 'KEP-001',
    musyawarah: 'Musyawarah Desa RKPDes 2026 — 25 Juli 2025',
    program: 'Pembangunan Jembatan Gantung Dusun C',
    pj: 'Kasi Pembangunan & Dinas PU',
    jadwal: 'September 2026 — Maret 2027',
    alasan: 'Jembatan Dusun C menjadi prioritas tertinggi berdasarkan hasil survei QoL (skor 3.2/5 aspek infrastruktur) dan 312 suara aspirasi warga. Kondisi darurat: ibu hamil dan anak sekolah terpaksa melewati sungai saat banjir.',
    status: 'Berjalan' as StatusKeputusan,
    buktiPelaksanaan: ['Dokumen Penetapan Pemenang Lelang (15 Agt 2026)', 'Peta Lokasi Pembangunan', 'Kontrak Kerja Kontraktor'],
    umpanBalik: 'Warga Dusun C sangat antusias dan sudah menyediakan lahan bantaran sungai secara sukarela.',
    tindakLanjut: [
      { langkah: 'Penetapan pemenang lelang konstruksi', tenggat: '15 Agustus 2026', status: 'Selesai' as StatusKeputusan },
      { langkah: 'Pembersihan lahan dan persiapan fondasi', tenggat: '1 September 2026', status: 'Berjalan' as StatusKeputusan },
      { langkah: 'Pembangunan struktur jembatan', tenggat: '1 Desember 2026', status: 'Menunggu' as StatusKeputusan },
      { langkah: 'Uji fungsi dan serah terima', tenggat: '1 Maret 2027', status: 'Menunggu' as StatusKeputusan },
    ],
  },
  {
    id: 'KEP-002',
    musyawarah: 'Musyawarah Desa RKPDes 2026 — 25 Juli 2025',
    program: 'Pengadaan Apotek Desa & Obat-obatan Dasar',
    pj: 'Nakes Desa & Dinas Kesehatan',
    jadwal: 'Oktober 2026 — Maret 2027',
    alasan: 'Keputusan ini berdasarkan SDG Desa 3 dengan target penurunan stunting dan peningkatan akses layanan kesehatan. Seluruh kader dan tokoh kesehatan mendukung penuh.',
    status: 'Menunggu' as StatusKeputusan,
    buktiPelaksanaan: ['Surat Rekomendasi Dinas Kesehatan'],
    umpanBalik: 'Ibu-ibu posyandu sangat mendukung, terutama untuk ketersediaan vitamin ibu hamil.',
    tindakLanjut: [
      { langkah: 'Koordinasi izin apotek dengan Dinas Kesehatan', tenggat: '1 Oktober 2026', status: 'Menunggu' as StatusKeputusan },
      { langkah: 'Pengadaan peralatan dan obat-obatan awal', tenggat: '1 Desember 2026', status: 'Menunggu' as StatusKeputusan },
    ],
  },
  {
    id: 'KEP-003',
    musyawarah: 'Rapat Evaluasi Program Semester I 2025 — 3 Juli 2025',
    program: 'Percepatan Pencairan ADD Tahap II untuk Program Sampah',
    pj: 'Sekretaris Desa & Bendahara',
    jadwal: 'Juli 2025 — Agustus 2025',
    alasan: 'Program gerobak sampah motor tertunda karena ADD Tahap II belum cair. Keputusan percepatan koordinasi ke kecamatan diambil dalam rapat evaluasi.',
    status: 'Selesai' as StatusKeputusan,
    buktiPelaksanaan: ['Surat Permohonan Percepatan ADD ke Kecamatan', 'Bukti Transfer ADD Tahap II', 'Berita Acara Pengadaan Gerobak Motor'],
    umpanBalik: 'Program kembali berjalan setelah ADD cair. Gerobak sudah beroperasi mulai Agustus 2025.',
    tindakLanjut: [
      { langkah: 'Koordinasi percepatan ADD ke Kecamatan', tenggat: '15 Jul 2025', status: 'Selesai' as StatusKeputusan },
      { langkah: 'Pencairan ADD Tahap II', tenggat: '25 Jul 2025', status: 'Selesai' as StatusKeputusan },
      { langkah: 'Pengadaan dan serah terima gerobak motor', tenggat: '5 Agustus 2025', status: 'Selesai' as StatusKeputusan },
    ],
  },
];

export default function HasilKeputusanPage() {
  const [selectedKep, setSelectedKep] = useState<typeof KEPUTUSAN_DATA[0] | null>(null);
  const [umpanBalikInput, setUmpanBalikInput] = useState('');
  const [submittedUB, setSubmittedUB] = useState<Record<string, boolean>>({});
  const [filterStatus, setFilterStatus] = useState('Semua');

  const filtered = filterStatus === 'Semua' ? KEPUTUSAN_DATA : KEPUTUSAN_DATA.filter(k => k.status === filterStatus);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Hasil Keputusan dan Tindak Lanjut" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <AlertCircle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-medium leading-relaxed text-amber-700">
          Semua keputusan musyawarah di bawah ini bersifat resmi dan final setelah ditandatangani oleh Kepala Desa dan BPD. Tokoh Masyarakat dapat memberikan <strong>umpan balik masyarakat</strong> namun <strong>tidak dapat mengubah keputusan resmi</strong>.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Keputusan" value={KEPUTUSAN_DATA.length} satuan="Keputusan Resmi" barColor="purple" progress={100} />
        <StatCard label="Sedang Berjalan" value={KEPUTUSAN_DATA.filter(k => k.status === 'Berjalan').length} satuan="Dalam Pelaksanaan" barColor="blue" progress={33} />
        <StatCard label="Sudah Selesai" value={KEPUTUSAN_DATA.filter(k => k.status === 'Selesai').length} satuan="Tuntas" barColor="green" progress={33} />
        <StatCard label="Menunggu" value={KEPUTUSAN_DATA.filter(k => k.status === 'Menunggu').length} satuan="Belum Dimulai" barColor="orange" progress={33} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* DAFTAR KEPUTUSAN */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Daftar Keputusan</h2>
            <div className="flex gap-1">
              {['Semua', 'Berjalan', 'Selesai', 'Menunggu'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} className={`px-2 py-0.5 rounded text-[9px] font-bold transition-colors ${filterStatus === s ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{s}</button>
              ))}
            </div>
          </div>

          {filtered.map(k => (
            <button
              key={k.id}
              onClick={() => setSelectedKep(k)}
              className={`w-full text-left p-3 rounded-xl border transition-all space-y-2 ${selectedKep?.id === k.id ? 'border-purple-400 bg-purple-50/50 shadow-sm' : 'border-slate-200 bg-white hover:shadow-sm'}`}
            >
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-mono font-bold text-slate-400">{k.id}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${STATUS_COLOR[k.status]}`}>{k.status}</span>
              </div>
              <p className="text-xs font-bold text-slate-800 leading-snug">{k.program}</p>
              <p className="text-[10px] text-slate-500 flex items-center gap-1"><User size={10} /> {k.pj}</p>
              <p className="text-[10px] text-slate-400 flex items-center gap-1"><Calendar size={10} /> {k.jadwal}</p>
            </button>
          ))}
        </div>

        {/* DETAIL KEPUTUSAN */}
        <div className="lg:col-span-2">
          {selectedKep ? (
            <Card className="border-purple-200">
              <CardHeader className="border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[9px] font-mono font-bold text-slate-400">{selectedKep.id}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${STATUS_COLOR[selectedKep.status]}`}>{selectedKep.status}</span>
                </div>
                <CardTitle className="text-sm font-bold text-slate-800 leading-snug">{selectedKep.program}</CardTitle>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1"><Gavel size={11} /> {selectedKep.musyawarah}</p>
              </CardHeader>
              <CardContent className="pt-4 text-xs space-y-4">

                {/* INFO PROGRAM */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 bg-slate-50 border rounded-lg">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Penanggung Jawab</p>
                    <p className="font-bold text-slate-700 mt-0.5">{selectedKep.pj}</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 border rounded-lg">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jadwal</p>
                    <p className="font-bold text-slate-700 mt-0.5">{selectedKep.jadwal}</p>
                  </div>
                </div>

                {/* ALASAN KEPUTUSAN */}
                <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
                  <p className="font-bold text-blue-700 text-[10px] uppercase tracking-wider mb-1.5">Alasan Keputusan:</p>
                  <p className="text-slate-700 leading-relaxed">{selectedKep.alasan}</p>
                </div>

                {/* BUKTI PELAKSANAAN */}
                <div className="space-y-1.5">
                  <p className="font-bold text-slate-700">Bukti Pelaksanaan:</p>
                  {selectedKep.buktiPelaksanaan.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 border rounded-lg">
                      <FileText size={12} className="text-purple-700 flex-shrink-0" />
                      <span className="text-slate-600 font-medium">{b}</span>
                    </div>
                  ))}
                </div>

                {/* TINDAK LANJUT TIMELINE */}
                <div>
                  <p className="font-bold text-slate-700 mb-2">Rencana Tindak Lanjut:</p>
                  <div className="relative border-l-2 border-purple-200 pl-4 ml-1.5 space-y-3">
                    {selectedKep.tindakLanjut.map((tl, i) => (
                      <div key={i} className="relative">
                        <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white ${tl.status === 'Selesai' ? 'bg-green-500' : tl.status === 'Berjalan' ? 'bg-blue-500' : 'bg-slate-300'}`} />
                        <div className="flex items-center justify-between gap-2">
                          <p className={`font-medium leading-snug ${tl.status === 'Selesai' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{tl.langkah}</p>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${STATUS_COLOR[tl.status]}`}>{tl.status}</span>
                        </div>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><Clock size={9} /> {tl.tenggat}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* UMPAN BALIK */}
                <div className="pt-3 border-t space-y-2">
                  <p className="font-bold text-slate-700">Umpan Balik Masyarakat:</p>
                  {selectedKep.umpanBalik && (
                    <div className="p-2.5 bg-purple-50/50 border border-purple-100 rounded-lg italic text-purple-800">"{selectedKep.umpanBalik}"</div>
                  )}
                  {submittedUB[selectedKep.id] ? (
                    <div className="p-2.5 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
                      <CheckCircle2 size={14} /> Umpan balik Anda telah dikirim!
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <textarea rows={2} value={umpanBalikInput} onChange={e => setUmpanBalikInput(e.target.value)} placeholder="Tambahkan umpan balik dari masyarakat terkait keputusan ini..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-slate-700" />
                      <button onClick={() => { if (!umpanBalikInput) return; setSubmittedUB(prev => ({ ...prev, [selectedKep.id]: true })); setUmpanBalikInput(''); }} className="w-full py-2 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-800 flex items-center justify-center gap-1.5 text-xs">
                        <Send size={11} /> Kirim Umpan Balik
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-[300px] border border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white shadow-sm">
              <Gavel size={28} className="mb-2 text-slate-300" />
              <p className="font-bold text-sm text-slate-600">Detail Keputusan</p>
              <p className="text-xs text-slate-400 mt-1 max-w-[220px] text-center">Pilih keputusan di panel kiri untuk melihat detail, alasan, bukti, dan tindak lanjut.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data keputusan resmi dikelola oleh BPD dan Sekretariat Desa</span>
        <span>Periode: 2025–2026 — Data Simulasi Terkendali</span>
      </div>
    </div>
  );
}
