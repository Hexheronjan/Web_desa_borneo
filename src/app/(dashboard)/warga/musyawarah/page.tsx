'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Users, BookOpen, CheckCircle2, Send, FileText, MessageSquare,
  ArrowRight, Gavel, Calendar, Clock, AlertCircle, Lock, RefreshCw, List
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

type TabMusyawarah = 'agenda' | 'bahan' | 'peserta' | 'aspirasi' | 'masukan' | 'hasil' | 'keputusan' | 'tindaklanjut';

const TAB_LIST: { key: TabMusyawarah; label: string; icon: React.ReactNode }[] = [
  { key: 'agenda', label: 'Agenda', icon: <Calendar size={13} /> },
  { key: 'bahan', label: 'Bahan Publik', icon: <BookOpen size={13} /> },
  { key: 'peserta', label: 'Daftar Peserta', icon: <Users size={13} /> },
  { key: 'aspirasi', label: 'Aspirasi Dibahas', icon: <List size={13} /> },
  { key: 'masukan', label: 'Masukan Masyarakat', icon: <MessageSquare size={13} /> },
  { key: 'hasil', label: 'Hasil Pembahasan', icon: <FileText size={13} /> },
  { key: 'keputusan', label: 'Keputusan', icon: <Gavel size={13} /> },
  { key: 'tindaklanjut', label: 'Tindak Lanjut', icon: <ArrowRight size={13} /> },
];

const MUSYAWARAH_LIST = [
  {
    id: 'MUS-01',
    judul: 'Musyawarah Desa Penyusunan RKPDes 2026',
    tanggal: '25 Juli 2025, 09:00 WIB',
    lokasi: 'Balai Desa Lung Anai',
    status: 'Akan Datang',
    pimpinan: 'Kepala Desa & Ketua BPD',
    bahan: [
      'Draf RKPDes 2026 (Versi 0.3)',
      'Rekap Aspirasi Masyarakat 2025',
      'Laporan Realisasi APBDes Semester I 2025',
      'Peta Prioritas Program Berdasarkan Survei QoL',
    ],
    peserta: [
      { nama: 'Kepala Desa Lung Anai', jabatan: 'Pimpinan Rapat', hadir: true },
      { nama: 'Ketua BPD', jabatan: 'Wakil Pimpinan', hadir: true },
      { nama: 'Ketua LPM', jabatan: 'Unsur Masyarakat', hadir: true },
      { nama: 'Tokoh Masyarakat Adat', jabatan: 'Perwakilan Adat', hadir: false },
      { nama: 'Kader Posyandu Dusun A', jabatan: 'Perwakilan Kesehatan', hadir: true },
      { nama: 'Ketua Karang Taruna', jabatan: 'Perwakilan Pemuda', hadir: false },
    ],
    aspirasi: [
      { judul: 'Pembangunan Jembatan Gantung Dusun C', kategori: 'Infrastruktur', prioritas: 'Tinggi' },
      { judul: 'Pengadaan Apotek Desa', kategori: 'Kesehatan', prioritas: 'Mendesak' },
      { judul: 'Pengelolaan Sampah Terpadu', kategori: 'Lingkungan', prioritas: 'Sedang' },
    ],
    hasil: 'Musyawarah menetapkan 3 prioritas utama RKPDes 2026: (1) Pembangunan jembatan Dusun C, (2) Pengadaan apotek desa, dan (3) Perluasan jaringan air bersih SPAM.',
    keputusan: 'Prioritas anggaran infrastruktur sebesar 40% dari total APBDes 2026 disetujui dengan 85% suara peserta. Keputusan bersifat final dan mengikat setelah ditandatangani BPD & Kades.',
    alasan: 'Berdasarkan data QoL dan aspirasi warga, infrastruktur menjadi kebutuhan paling mendesak yang berpengaruh langsung pada produktivitas dan keselamatan warga dusun terpencil.',
    tindaklanjut: [
      { langkah: 'Sekdes menyusun dokumen RKPDes final', tenggat: '1 Agustus 2025', status: 'Menunggu' },
      { langkah: 'BPD mengesahkan dokumen RKPDes', tenggat: '7 Agustus 2025', status: 'Menunggu' },
      { langkah: 'Pelelangan konstruksi jembatan Dusun C', tenggat: '1 September 2025', status: 'Menunggu' },
    ],
    masukanList: [
      { nama: 'Tokoh Adat (Bapak Yohanes)', isi: 'Mohon program budaya adat juga dimasukkan sebagai prioritas, bukan hanya infrastruktur fisik.', tgl: '17 Jul 2025' },
    ],
  },
  {
    id: 'MUS-02',
    judul: 'Rapat Evaluasi Program Berjalan Semester I 2025',
    tanggal: '3 Juli 2025, 14:00 WIB',
    lokasi: 'Balai Desa Lung Anai',
    status: 'Selesai',
    pimpinan: 'Kepala Desa & Sekretaris',
    bahan: ['Laporan Progres 4 Program Prioritas', 'Rekap Penggunaan ADD Semester I'],
    peserta: [
      { nama: 'Kepala Desa', jabatan: 'Pimpinan', hadir: true },
      { nama: 'Sekretaris Desa', jabatan: 'Notulen', hadir: true },
      { nama: 'Kasi Pembangunan', jabatan: 'Pelaksana Program', hadir: true },
    ],
    aspirasi: [],
    hasil: 'Semua program utama berjalan sesuai jadwal kecuali pengadaan gerobak sampah yang tertunda karena ADD Tahap II belum cair.',
    keputusan: 'Diputuskan untuk memprioritaskan pencairan ADD dan merevisi jadwal program sampah ke September 2025.',
    alasan: 'Keterlambatan semata-mata karena mekanisme administrasi pencairan ADD, bukan karena permasalahan teknis.',
    tindaklanjut: [
      { langkah: 'Koordinasi percepatan pencairan ADD Tahap II ke Kecamatan', tenggat: '15 Jul 2025', status: 'Selesai' },
      { langkah: 'Revisi jadwal program sampah di RKPDes', tenggat: '20 Jul 2025', status: 'Berjalan' },
    ],
    masukanList: [],
  },
];

export default function MusyawarahPage() {
  const [selectedMusyawarah, setSelectedMusyawarah] = useState(MUSYAWARAH_LIST[0]);
  const [activeTab, setActiveTab] = useState<TabMusyawarah>('agenda');
  const [masukan, setMasukan] = useState('');
  const [masukanList, setMasukanList] = useState<Record<string, { nama: string; isi: string; tgl: string }[]>>({});
  const [namaPengirim, setNamaPengirim] = useState('');

  const handleKirimMasukan = () => {
    if (!masukan || !namaPengirim) { alert('Nama dan isi masukan harus diisi.'); return; }
    const key = selectedMusyawarah.id;
    const baru = { nama: namaPengirim, isi: masukan, tgl: new Date().toLocaleDateString('id-ID') };
    setMasukanList(prev => ({ ...prev, [key]: [...(prev[key] || []), baru] }));
    setMasukan(''); setNamaPengirim('');
    alert('✅ Masukan Anda berhasil disampaikan kepada forum musyawarah!');
  };

  const gabunganMasukan = [
    ...(selectedMusyawarah.masukanList || []),
    ...(masukanList[selectedMusyawarah.id] || []),
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Musyawarah dan Partisipasi Masyarakat" modul="Tokoh Masyarakat" color={COLOR} />

      {/* RESTRICTION BANNER */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Hak Akses Tokoh Masyarakat dalam Musyawarah</p>
          <p className="text-amber-700 mt-0.5 font-medium leading-relaxed">
            Anda dapat memberi masukan dan melihat seluruh proses musyawarah. Namun, <strong>keputusan resmi tetap ditetapkan oleh pihak berwenang</strong> (Kepala Desa & BPD) dan tidak dapat diubah melalui portal ini.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Musyawarah" value={MUSYAWARAH_LIST.length} satuan="Tercatat" barColor="purple" progress={100} />
        <StatCard label="Akan Datang" value={MUSYAWARAH_LIST.filter(m => m.status === 'Akan Datang').length} satuan="Jadwal Mendatang" barColor="blue" progress={50} />
        <StatCard label="Sudah Selesai" value={MUSYAWARAH_LIST.filter(m => m.status === 'Selesai').length} satuan="Terlaksana" barColor="green" progress={50} />
        <StatCard label="Masukan Terkirim" value={Object.values(masukanList).reduce((s, arr) => s + arr.length, 0)} satuan="Dari Tokoh Masyarakat" barColor="orange" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

        {/* DAFTAR MUSYAWARAH */}
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Daftar Musyawarah</h2>
          {MUSYAWARAH_LIST.map(m => (
            <button
              key={m.id}
              onClick={() => { setSelectedMusyawarah(m); setActiveTab('agenda'); }}
              className={`w-full text-left p-3 rounded-xl border transition-all space-y-1 ${selectedMusyawarah.id === m.id ? 'border-purple-400 bg-purple-50/50 shadow-sm' : 'border-slate-200 bg-white hover:shadow-sm hover:border-slate-300'}`}
            >
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] font-mono font-bold text-slate-400">{m.id}</span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${m.status === 'Akan Datang' ? 'bg-sky-100 text-sky-700' : 'bg-green-100 text-green-700'}`}>{m.status}</span>
              </div>
              <p className="text-xs font-bold text-slate-800 leading-snug">{m.judul}</p>
              <p className="text-[10px] text-slate-500 flex items-center gap-1"><Calendar size={10} /> {m.tanggal}</p>
            </button>
          ))}
        </div>

        {/* DETAIL PANEL */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${selectedMusyawarah.status === 'Akan Datang' ? 'bg-sky-100 text-sky-700' : 'bg-green-100 text-green-700'}`}>{selectedMusyawarah.status}</span>
              <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={10} /> {selectedMusyawarah.tanggal}</span>
            </div>
            <CardTitle className="text-sm font-bold text-slate-800 leading-snug">{selectedMusyawarah.judul}</CardTitle>
            <p className="text-xs text-slate-500 mt-1">Dipimpin oleh: <strong>{selectedMusyawarah.pimpinan}</strong> • {selectedMusyawarah.lokasi}</p>

            {/* TAB NAV */}
            <div className="flex flex-wrap gap-0 mt-3 border-b -mb-px overflow-x-auto">
              {TAB_LIST.map(t => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-1.5 pb-2 px-3 text-[10px] font-bold transition-colors whitespace-nowrap ${activeTab === t.key ? 'text-purple-700 border-b-2 border-purple-700' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </CardHeader>

          <CardContent className="pt-4 text-xs">

            {/* TAB: AGENDA */}
            {activeTab === 'agenda' && (
              <div className="space-y-3">
                <p className="font-bold text-slate-700">Detail Agenda Musyawarah:</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Tanggal & Waktu', val: selectedMusyawarah.tanggal },
                    { label: 'Lokasi', val: selectedMusyawarah.lokasi },
                    { label: 'Pimpinan', val: selectedMusyawarah.pimpinan },
                    { label: 'Jumlah Peserta Terdaftar', val: `${selectedMusyawarah.peserta.length} orang` },
                  ].map((d, i) => (
                    <div key={i} className="p-2.5 border rounded-lg bg-slate-50">
                      <p className="text-[10px] text-slate-400 font-semibold">{d.label}</p>
                      <p className="font-bold text-slate-700 mt-0.5">{d.val}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl">
                  <p className="font-bold text-purple-800 text-[11px] mb-1">Pokok Bahasan:</p>
                  <ul className="space-y-1">
                    {(selectedMusyawarah.aspirasi.length > 0 ? selectedMusyawarah.aspirasi : [{ judul: 'Evaluasi Program Berjalan', kategori: 'Umum', prioritas: '-' }]).map((a, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] text-purple-700"><CheckCircle2 size={11} /> {a.judul}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB: BAHAN */}
            {activeTab === 'bahan' && (
              <div className="space-y-2">
                <p className="font-bold text-slate-700 mb-3">Bahan Publik yang Dapat Diakses:</p>
                {selectedMusyawarah.bahan.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-xl bg-slate-50/50 hover:bg-slate-50 cursor-pointer transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <FileText size={16} className="text-purple-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">{b}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Klik untuk unduh / lihat dokumen publik</p>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-slate-400" />
                  </div>
                ))}
              </div>
            )}

            {/* TAB: PESERTA */}
            {activeTab === 'peserta' && (
              <div className="space-y-2">
                <p className="font-bold text-slate-700 mb-3">Daftar Peserta Musyawarah ({selectedMusyawarah.peserta.length} orang):</p>
                <div className="overflow-x-auto rounded-lg border border-slate-100">
                  <table className="w-full text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                      <tr>
                        <th className="p-2.5">No</th>
                        <th className="p-2.5">Nama</th>
                        <th className="p-2.5">Jabatan/Perwakilan</th>
                        <th className="p-2.5">Kehadiran</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedMusyawarah.peserta.map((p, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="p-2.5 text-slate-400 font-mono">{i + 1}</td>
                          <td className="p-2.5 font-semibold text-slate-800">{p.nama}</td>
                          <td className="p-2.5 text-slate-500">{p.jabatan}</td>
                          <td className="p-2.5">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${p.hadir ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {p.hadir ? '✓ Hadir' : '✗ Tidak Hadir'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: ASPIRASI DIBAHAS */}
            {activeTab === 'aspirasi' && (
              <div className="space-y-2">
                <p className="font-bold text-slate-700 mb-3">Aspirasi Masyarakat yang Dibahas dalam Musyawarah:</p>
                {selectedMusyawarah.aspirasi.length === 0 ? (
                  <p className="text-slate-400 text-center py-6">Tidak ada aspirasi spesifik yang dibahas dalam musyawarah ini.</p>
                ) : selectedMusyawarah.aspirasi.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border rounded-xl bg-slate-50/50">
                    <div className={`px-2 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${a.prioritas === 'Tinggi' || a.prioritas === 'Mendesak' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>{a.prioritas}</div>
                    <div>
                      <p className="font-semibold text-slate-800">{a.judul}</p>
                      <p className="text-[10px] text-slate-400">{a.kategori}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: MASUKAN MASYARAKAT */}
            {activeTab === 'masukan' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="font-bold text-slate-700">Kirim Masukan ke Forum Musyawarah:</p>
                  <input type="text" value={namaPengirim} onChange={e => setNamaPengirim(e.target.value)} placeholder="Nama Anda / Perwakilan dari..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                  <textarea rows={3} value={masukan} onChange={e => setMasukan(e.target.value)} placeholder="Tuliskan masukan, pokok pikiran, atau rekomendasi untuk agenda musyawarah ini..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                  <button onClick={handleKirimMasukan} className="w-full py-2.5 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-800 flex items-center justify-center gap-1.5">
                    <Send size={12} /> Kirim Masukan
                  </button>
                </div>
                <div className="border-t pt-4 space-y-2">
                  <p className="font-bold text-slate-700">Masukan yang Sudah Disampaikan ({gabunganMasukan.length}):</p>
                  {gabunganMasukan.length === 0 ? (
                    <p className="text-slate-400 text-center py-4">Belum ada masukan yang disampaikan.</p>
                  ) : gabunganMasukan.map((m, i) => (
                    <div key={i} className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-bold text-purple-800">{m.nama}</p>
                        <p className="text-[10px] text-slate-400">{m.tgl}</p>
                      </div>
                      <p className="text-slate-600 leading-relaxed italic">"{m.isi}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: HASIL PEMBAHASAN */}
            {activeTab === 'hasil' && (
              <div className="space-y-3">
                <p className="font-bold text-slate-700">Ringkasan Hasil Pembahasan:</p>
                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl leading-relaxed text-slate-700">
                  {selectedMusyawarah.hasil}
                </div>
              </div>
            )}

            {/* TAB: KEPUTUSAN */}
            {activeTab === 'keputusan' && (
              <div className="space-y-3">
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-start gap-2">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-amber-600" />
                  <p>Keputusan berikut telah ditetapkan secara resmi oleh Kepala Desa dan BPD. Tokoh Masyarakat <strong>tidak dapat mengubah keputusan resmi</strong> ini melalui portal.</p>
                </div>
                <div className="p-4 bg-teal-50/50 border border-teal-200 rounded-xl space-y-3">
                  <p className="font-bold text-teal-800">Keputusan Resmi:</p>
                  <p className="text-slate-700 leading-relaxed">{selectedMusyawarah.keputusan}</p>
                  <div className="border-t border-teal-200 pt-3">
                    <p className="font-bold text-teal-700 mb-1">Alasan / Landasan Keputusan:</p>
                    <p className="text-slate-600 leading-relaxed">{selectedMusyawarah.alasan}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TINDAK LANJUT */}
            {activeTab === 'tindaklanjut' && (
              <div className="space-y-3">
                <p className="font-bold text-slate-700">Rencana Tindak Lanjut Keputusan:</p>
                <div className="relative border-l-2 border-purple-200 pl-5 ml-2 space-y-4">
                  {selectedMusyawarah.tindaklanjut.map((tl, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full border-2 border-purple-600 bg-white" />
                      <div className="p-3 border rounded-xl bg-slate-50/50 space-y-1.5">
                        <p className="font-semibold text-slate-800">{tl.langkah}</p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={10} /> Tenggat: {tl.tenggat}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${tl.status === 'Selesai' ? 'bg-green-100 text-green-700' : tl.status === 'Berjalan' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>{tl.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data musyawarah terintegrasi dengan arsip BPD & SID Desa</span>
        <span>Periode: Juli 2025</span>
      </div>
    </div>
  );
}
