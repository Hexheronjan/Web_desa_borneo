'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Send, CheckCircle2, Lock, ArrowRight, Filter, RefreshCw, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const COLOR = '#6a1b9a';

interface Aspirasi {
  id: string;
  kategori: string;
  judul: string;
  isi: string;
  status: string;
  createdAt: string;
}

const KATEGORI_OPTIONS = ['Infrastruktur', 'Kesehatan', 'Pendidikan', 'Budaya', 'Lainnya'];
const WILAYAH_OPTIONS = ['Dusun A (Pusat)', 'Dusun B (Tengah)', 'Dusun C (Hilir)', 'Dusun D (Ulu)'];
const PERHATIAN_OPTIONS = ['Rendah', 'Sedang', 'Tinggi'];

const STATUS_META: Record<string, { color: string; label: string }> = {
  Baru:       { color: 'bg-sky-100 text-sky-700', label: 'Baru' },
  Diperiksa:  { color: 'bg-yellow-100 text-yellow-700', label: 'Diperiksa' },
  Dibahas:    { color: 'bg-orange-100 text-orange-700', label: 'Dibahas' },
  Diproses:   { color: 'bg-blue-100 text-blue-700', label: 'Diproses' },
  Selesai:    { color: 'bg-green-100 text-green-700', label: 'Selesai' },
  Diterima:   { color: 'bg-teal-100 text-teal-700', label: 'Diterima' },
  Ditindaklanjuti: { color: 'bg-purple-100 text-purple-700', label: 'Ditindaklanjuti' },
};

// Data dummy tambahan untuk tampilan lengkap aspirasi
const EXTRA_ASPIRASI: Array<{
  id: string; judul: string; kategori: string; wilayah: string; perhatian: string;
  status: string; tanggapan: string; bukti: string; tgl: string;
}> = [
  { id: 'asp-dummy-01', judul: 'Perbaikan Jalan Poros Dusun B ke Balai Adat', kategori: 'Infrastruktur', wilayah: 'Dusun B (Tengah)', perhatian: 'Tinggi', status: 'Diproses', tanggapan: 'Sudah dimasukkan dalam RAB ADD Tahap II 2025', bukti: 'Foto Jalan Rusak (3 foto)', tgl: '20 Mei 2025' },
  { id: 'asp-dummy-02', judul: 'Penambahan Titik Lampu Jalan Solar Cell', kategori: 'Infrastruktur', wilayah: 'Dusun A (Pusat)', perhatian: 'Sedang', status: 'Diterima', tanggapan: 'Diterima dan akan dikaji bersama LPM bulan depan', bukti: '-', tgl: '18 Mei 2025' },
  { id: 'asp-dummy-03', judul: 'Pengadaan Tempat Sampah Pilah di Tiap RT', kategori: 'Infrastruktur', wilayah: 'Dusun C (Hilir)', perhatian: 'Sedang', status: 'Dibahas', tanggapan: 'Dibahas bersama Karang Taruna dan LPM', bukti: '-', tgl: '17 Mei 2025' },
  { id: 'asp-dummy-04', judul: 'Pelatihan Komputer Dasar Generasi Muda', kategori: 'Pendidikan', wilayah: 'Dusun A (Pusat)', perhatian: 'Rendah', status: 'Selesai', tanggapan: 'Sudah dilaksanakan 15 Mei 2025 bersama relawan TIK', bukti: 'Laporan Pelatihan PDF', tgl: '15 Mei 2025' },
  { id: 'asp-dummy-05', judul: 'Perbaikan Jaringan Internet di Sekolah', kategori: 'Infrastruktur', wilayah: 'Dusun A (Pusat)', perhatian: 'Tinggi', status: 'Diperiksa', tanggapan: 'Menunggu survei teknis provider', bukti: 'Foto Modem dan Router Lama', tgl: '14 Mei 2025' },
];

export default function WargaAspirasiPage() {
  const [aspirations, setAspirations] = useState<Aspirasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Infrastruktur');
  const [wilayah, setWilayah] = useState('Dusun A (Pusat)');
  const [perhatian, setPerhatian] = useState('Sedang');
  const [isi, setIsi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [forwardSuccess, setForwardSuccess] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/aspirasi');
      const result = await res.json();
      if (result.success) {
        setAspirations(result.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !isi) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/aspirasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kategori, judul, isi }),
      });
      const result = await res.json();
      if (result.success) {
        alert('Aspirasi berhasil dikirim ke Pemerintah Desa!');
        setJudul(''); setIsi('');
        loadData();
      } else {
        alert('Gagal: ' + result.error);
      }
    } catch (error) {
      alert('Terjadi kesalahan koneksi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForward = (id: string, judulAsp: string) => {
    if (confirm(`Teruskan aspirasi "${judulAsp}" ke BPD & Pemerintah Desa untuk dibahas dalam musyawarah?`)) {
      setForwardSuccess((prev) => ({ ...prev, [id]: true }));
      alert('✅ Aspirasi berhasil diteruskan ke BPD & Pemerintah Desa! Status diperbarui menjadi Dibahas.');
    }
  };

  const allAspirations = [
    ...EXTRA_ASPIRASI,
    ...aspirations.map((a) => ({
      id: a.id,
      judul: a.judul,
      kategori: a.kategori,
      wilayah: WILAYAH_OPTIONS[0],
      perhatian: 'Sedang',
      status: a.status,
      tanggapan: '-',
      bukti: '-',
      tgl: new Date(a.createdAt).toLocaleDateString('id-ID'),
    })),
  ];

  const filtered = filterStatus === 'Semua'
    ? allAspirations
    : allAspirations.filter((a) => a.status === filterStatus);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Aspirasi Masyarakat" modul="Tokoh Masyarakat" color={COLOR} />

      {/* RESTRICTION BANNER */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Ketentuan Hak Akses Tokoh Masyarakat</p>
          <p className="text-amber-700 mt-0.5 font-medium leading-relaxed">
            Anda dapat: (1) Melihat seluruh aspirasi warga, (2) Mengelompokkan/mengklasifikasikan kategori aspirasi, dan (3) Meneruskan aspirasi ke BPD & Pemerintah Desa.
            <br />
            <span className="text-red-700 font-bold">Anda TIDAK diperbolehkan mengubah isi asli teks usulan warga tanpa persetujuan pengirim.</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Aspirasi Masuk" value={allAspirations.length} satuan="Jumlah Baru Diterima" barColor="purple" progress={100} />
        <StatCard label="Ditindaklanjuti" value={allAspirations.filter(a => ['Diproses','Selesai','Ditindaklanjuti'].includes(a.status)).length} satuan="usulan" barColor="green" progress={50} />
        <StatCard label="Belum Ditanggapi" value={allAspirations.filter(a => ['Baru','Diperiksa'].includes(a.status)).length} satuan="Usulan Belum Ditanggapi" barColor="orange" progress={50} />
        <StatCard label="Perhatian Tinggi" value={allAspirations.filter(a => a.perhatian === 'Tinggi').length} satuan="Prioritas Mendesak" barColor="purple" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* FORM KIRIM ASPIRASI BARU */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Send size={16} /> Kirim Aspirasi ke Pemerintah Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">KATEGORI USULAN:</label>
                <select value={kategori} onChange={e => setKategori(e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white">
                  {KATEGORI_OPTIONS.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">WILAYAH / DUSUN ASAL:</label>
                <select value={wilayah} onChange={e => setWilayah(e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white">
                  {WILAYAH_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">TINGKAT PERHATIAN:</label>
                <select value={perhatian} onChange={e => setPerhatian(e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 bg-white">
                  {PERHATIAN_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">JUDUL USULAN:</label>
                <input type="text"
                  placeholder="Contoh: Pengadaan Booster Sinyal di Dusun B"
                  value={judul} onChange={e => setJudul(e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">DETAIL USULAN:</label>
                <textarea rows={4}
                  placeholder="Jelaskan secara detail aspirasi dan dampak positifnya..."
                  value={isi} onChange={e => setIsi(e.target.value)}
                  className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50">
                <Send size={12} /> {isSubmitting ? 'Mengirim...' : 'Kirim Aspirasi'}
              </button>
            </form>
          </CardContent>
        </Card>

        {/* TABEL DAFTAR ASPIRASI */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <CheckCircle2 size={16} /> Daftar Aspirasi & Status Tindak Lanjut
              </CardTitle>
              <div className="flex flex-wrap gap-1">
                {['Semua', 'Baru', 'Diperiksa', 'Dibahas', 'Diproses', 'Selesai'].map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-colors ${filterStatus === s ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-xs text-slate-500 text-center py-6">Memuat data aspirasi...</p>
            ) : filtered.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">Belum ada aspirasi pada status ini.</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-100">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                    <tr>
                      <th className="p-2.5 min-w-[160px]">Usulan</th>
                      <th className="p-2.5">Kategori</th>
                      <th className="p-2.5">Wilayah</th>
                      <th className="p-2.5">Perhatian</th>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5">Tanggapan Pemdes</th>
                      <th className="p-2.5">Bukti</th>
                      <th className="p-2.5">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filtered.map((a) => {
                      const statusMeta = STATUS_META[a.status] || { color: 'bg-gray-100 text-gray-600', label: a.status };
                      const isForwarded = forwardSuccess[a.id];
                      return (
                        <tr key={a.id} className="align-top hover:bg-slate-50/50 transition-colors">
                          <td className="p-2.5">
                            <p className="font-semibold text-slate-800 leading-snug max-w-[180px]">{a.judul}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{a.tgl}</p>
                          </td>
                          <td className="p-2.5 whitespace-nowrap">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">{a.kategori}</span>
                          </td>
                          <td className="p-2.5">
                            <p className="text-[10px] font-medium text-slate-600 whitespace-nowrap">{a.wilayah}</p>
                          </td>
                          <td className="p-2.5">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                              a.perhatian === 'Tinggi' ? 'bg-red-50 text-red-700' :
                              a.perhatian === 'Sedang' ? 'bg-yellow-50 text-yellow-700' : 'bg-slate-50 text-slate-500'
                            }`}>{a.perhatian}</span>
                          </td>
                          <td className="p-2.5">
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${statusMeta.color}`}>
                              {statusMeta.label}
                            </span>
                          </td>
                          <td className="p-2.5">
                            <p className="text-[10px] text-slate-500 max-w-[140px] leading-snug">{a.tanggapan}</p>
                          </td>
                          <td className="p-2.5">
                            <p className="text-[10px] text-slate-500">{a.bukti}</p>
                          </td>
                          <td className="p-2.5">
                            <button
                              onClick={() => handleForward(a.id, a.judul)}
                              disabled={isForwarded || a.status === 'Selesai'}
                              title="Teruskan ke BPD & Pemerintah Desa"
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold transition-colors ${
                                isForwarded || a.status === 'Selesai'
                                  ? 'bg-green-50 text-green-700 cursor-default'
                                  : 'bg-purple-700 text-white hover:bg-purple-800 cursor-pointer'
                              }`}
                            >
                              {isForwarded ? <><CheckCircle2 size={10} /> Diteruskan</> : <><ArrowRight size={10} /> Teruskan</>}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50 mt-1">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data aspirasi tersinkronisasi dari SID Desa & masukan warga secara langsung</span>
        <span>Periode: Semester I 2026</span>
      </div>

    </div>
  );
}
