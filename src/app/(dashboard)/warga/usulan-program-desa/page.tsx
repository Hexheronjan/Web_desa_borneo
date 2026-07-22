'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Send, CheckCircle2, Clock, FileText, RefreshCw, AlertCircle, ChevronRight, Lock, Paperclip, Users, MapPin, Target, Heart, BookOpen
} from 'lucide-react';
import { useState, useEffect } from 'react';

const COLOR = '#6a1b9a';

type StatusAlur = 'Draf' | 'Dikirim' | 'Diperiksa' | 'Dibahas' | 'Diterima' | 'Ditunda' | 'Ditolak' | 'Ditindaklanjuti';

const STATUS_ALUR: StatusAlur[] = ['Draf', 'Dikirim', 'Diperiksa', 'Dibahas', 'Diterima', 'Ditunda', 'Ditolak', 'Ditindaklanjuti'];

const STATUS_COLOR: Record<StatusAlur, string> = {
  Draf: 'bg-slate-100 text-slate-600',
  Dikirim: 'bg-sky-100 text-sky-700',
  Diperiksa: 'bg-yellow-100 text-yellow-700',
  Dibahas: 'bg-orange-100 text-orange-700',
  Diterima: 'bg-teal-100 text-teal-700',
  Ditunda: 'bg-amber-100 text-amber-700',
  Ditolak: 'bg-red-100 text-red-700',
  Ditindaklanjuti: 'bg-purple-100 text-purple-700',
};

const KATEGORI_OPTIONS = ['Infrastruktur', 'Kesehatan', 'Pendidikan', 'Budaya & Adat', 'Ekonomi', 'Lingkungan', 'Lainnya'];
const SDG_OPTIONS = ['SDG Desa 3 (Kesehatan)', 'SDG Desa 4 (Pendidikan)', 'SDG Desa 18 (Kelembagaan Adat)'];
const DUKUNGAN_OPTIONS = ['< 25%', '25-50%', '51-75%', '> 75%'];
const KEBUTUHAN_OPTIONS = ['Sangat Mendesak', 'Mendesak', 'Sedang', 'Rendah'];

const DUMMY_USULAN = [
  { id: 'UP-001', nama: 'Pembangunan Jembatan Gantung Dusun C', kategori: 'Infrastruktur', masalah: 'Akses warga terisolir saat banjir', kelompok: 'Warga Dusun C', lokasi: 'Jl. Tepi Sungai Mahakam Kecil', kebutuhan: 'Sangat Mendesak', status: 'Dibahas' as StatusAlur, manfaat: 'Memperlancar akses ke pasar dan fasilitas kesehatan', dukungan: '> 75%', sdg: 'SDG Desa 18 (Kelembagaan Adat)', tgl: '5 Jul 2025' },
  { id: 'UP-002', nama: 'Pengadaan Apotek Desa & Obat-obatan Dasar', kategori: 'Kesehatan', masalah: 'Warga harus ke kota untuk membeli obat', kelompok: 'Ibu Rumah Tangga & Lansia', lokasi: 'Balai Desa', kebutuhan: 'Mendesak', status: 'Diterima' as StatusAlur, manfaat: 'Hemat biaya transportasi, cepat tangani penyakit ringan', dukungan: '51-75%', sdg: 'SDG Desa 3 (Kesehatan)', tgl: '2 Jul 2025' },
  { id: 'UP-003', nama: 'Beasiswa Pendidikan Tinggi Anak Kurang Mampu', kategori: 'Pendidikan', masalah: 'Banyak anak putus sekolah karena biaya', kelompok: 'Pemuda & Remaja', lokasi: 'Seluruh Desa', kebutuhan: 'Sedang', status: 'Dikirim' as StatusAlur, manfaat: 'Peningkatan SDM jangka panjang desa', dukungan: '51-75%', sdg: 'SDG Desa 4 (Pendidikan)', tgl: '28 Jun 2025' },
];

interface UsulanForm {
  nama: string;
  masalah: string;
  kelompok: string;
  lokasi: string;
  kebutuhan: string;
  bukti: string;
  manfaat: string;
  dukungan: string;
  sdg: string;
}

export default function UsulanProgramDesaPage() {
  const [form, setForm] = useState<UsulanForm>({
    nama: '', masalah: '', kelompok: '', lokasi: '',
    kebutuhan: 'Mendesak', bukti: '', manfaat: '', dukungan: '51-75%', sdg: 'SDG Desa 3 (Kesehatan)',
  });
  const [submitted, setSubmitted] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Semua');

  const handleChange = (field: keyof UsulanForm, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.masalah) { alert('Nama usulan dan masalah harus diisi.'); return; }
    setSubmitted(true);
  };

  const filtered = filterStatus === 'Semua' ? DUMMY_USULAN : DUMMY_USULAN.filter(u => u.status === filterStatus);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Usulan Program Desa" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Usulan" value={DUMMY_USULAN.length} satuan="Usulan Masuk" barColor="purple" progress={100} />
        <StatCard label="Diterima" value={DUMMY_USULAN.filter(u => u.status === 'Diterima').length} satuan="Disetujui" barColor="green" progress={33} />
        <StatCard label="Dibahas" value={DUMMY_USULAN.filter(u => u.status === 'Dibahas').length} satuan="Dalam Musyawarah" barColor="orange" progress={33} />
        <StatCard label="Ditindaklanjuti" value={0} satuan="Dalam Eksekusi" barColor="blue" progress={0} />
      </div>

      {/* ALUR STATUS */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Alur Status Usulan Program Desa:</p>
        <div className="flex items-center flex-wrap gap-1">
          {['Draf', 'Dikirim', 'Diperiksa', 'Dibahas', 'Diterima / Ditunda / Ditolak', 'Ditindaklanjuti'].map((s, i, arr) => (
            <div key={s} className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${i === 0 ? 'bg-slate-100 text-slate-600' : i === arr.length - 1 ? 'bg-purple-100 text-purple-700' : 'bg-sky-50 text-sky-700'}`}>{s}</span>
              {i < arr.length - 1 && <ChevronRight size={12} className="text-slate-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* FORM USULAN */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <FileText size={16} /> Form Usulan Program Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={24} />
                </div>
                <p className="font-bold text-sm text-slate-800">Usulan Berhasil Dikirim!</p>
                <p className="text-xs text-slate-500">Status awal: <span className="font-bold">Dikirim</span>. Usulan akan diperiksa oleh Sekretaris Desa.</p>
                <button onClick={() => { setSubmitted(false); setForm({ nama: '', masalah: '', kelompok: '', lokasi: '', kebutuhan: 'Mendesak', bukti: '', manfaat: '', dukungan: '51-75%', sdg: 'SDG Desa 3 (Kesehatan)' }); }}
                  className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-600">
                  Buat Usulan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1"><FileText size={11} /> NAMA USULAN:</label>
                  <input type="text" value={form.nama} onChange={e => handleChange('nama', e.target.value)} placeholder="Contoh: Pembangunan Jembatan Dusun C" className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1"><AlertCircle size={11} /> MASALAH YANG INGIN DISELESAIKAN:</label>
                  <textarea rows={2} value={form.masalah} onChange={e => handleChange('masalah', e.target.value)} placeholder="Jelaskan masalah yang ada di masyarakat..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1"><Users size={11} /> KELOMPOK PENERIMA MANFAAT:</label>
                  <input type="text" value={form.kelompok} onChange={e => handleChange('kelompok', e.target.value)} placeholder="Contoh: Warga Dusun B, Ibu Hamil, Petani..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1"><MapPin size={11} /> LOKASI:</label>
                  <input type="text" value={form.lokasi} onChange={e => handleChange('lokasi', e.target.value)} placeholder="Contoh: RT 03, Jalan Poros Dusun B" className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700"><Target size={11} className="inline mr-1" />TINGKAT KEBUTUHAN:</label>
                    <select value={form.kebutuhan} onChange={e => handleChange('kebutuhan', e.target.value)} className="w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
                      {KEBUTUHAN_OPTIONS.map(k => <option key={k}>{k}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700"><Users size={11} className="inline mr-1" />DUKUNGAN MASYARAKAT:</label>
                    <select value={form.dukungan} onChange={e => handleChange('dukungan', e.target.value)} className="w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
                      {DUKUNGAN_OPTIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1"><Heart size={11} /> PERKIRAAN MANFAAT:</label>
                  <textarea rows={2} value={form.manfaat} onChange={e => handleChange('manfaat', e.target.value)} placeholder="Jelaskan manfaat yang diharapkan..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700"><BookOpen size={11} className="inline mr-1" />HUBUNGAN SDG DESA:</label>
                  <select value={form.sdg} onChange={e => handleChange('sdg', e.target.value)} className="w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
                    {SDG_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1"><Paperclip size={11} /> BUKTI / LAMPIRAN:</label>
                  <input type="text" value={form.bukti} onChange={e => handleChange('bukti', e.target.value)} placeholder="Nama file atau deskripsi bukti yang dilampirkan" className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <button type="submit" className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm">
                  <Send size={12} /> Kirim Usulan Program
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* TABEL DAFTAR USULAN */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <CheckCircle2 size={16} /> Daftar Usulan & Status Penanganan
              </CardTitle>
              <div className="flex flex-wrap gap-1">
                {['Semua', 'Dikirim', 'Diperiksa', 'Dibahas', 'Diterima', 'Ditolak'].map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)} className={`px-2 py-0.5 rounded text-[9px] font-bold cursor-pointer transition-colors ${filterStatus === s ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{s}</button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5">No</th>
                    <th className="p-2.5 min-w-[160px]">Nama Usulan</th>
                    <th className="p-2.5">Masalah</th>
                    <th className="p-2.5">Kelompok</th>
                    <th className="p-2.5">Lokasi</th>
                    <th className="p-2.5">Kebutuhan</th>
                    <th className="p-2.5">Manfaat</th>
                    <th className="p-2.5">Dukungan</th>
                    <th className="p-2.5">SDG</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Tgl</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((u, i) => (
                    <tr key={u.id} className="align-top hover:bg-slate-50/50">
                      <td className="p-2.5 text-slate-400 font-mono text-[10px]">{u.id}</td>
                      <td className="p-2.5">
                        <p className="font-semibold text-slate-800 leading-snug max-w-[160px]">{u.nama}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{u.kategori}</p>
                      </td>
                      <td className="p-2.5 max-w-[130px]"><p className="text-slate-600 leading-snug text-[10px]">{u.masalah}</p></td>
                      <td className="p-2.5 whitespace-nowrap text-[10px] text-slate-600">{u.kelompok}</td>
                      <td className="p-2.5 whitespace-nowrap text-[10px] text-slate-600">{u.lokasi}</td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${u.kebutuhan === 'Sangat Mendesak' ? 'bg-red-50 text-red-700' : u.kebutuhan === 'Mendesak' ? 'bg-orange-50 text-orange-700' : 'bg-slate-50 text-slate-500'}`}>{u.kebutuhan}</span>
                      </td>
                      <td className="p-2.5 max-w-[120px]"><p className="text-[10px] text-slate-500 leading-snug">{u.manfaat}</p></td>
                      <td className="p-2.5 whitespace-nowrap text-[10px] text-slate-600">{u.dukungan}</td>
                      <td className="p-2.5"><p className="text-[10px] text-slate-500 max-w-[100px] leading-snug">{u.sdg}</p></td>
                      <td className="p-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${STATUS_COLOR[u.status]}`}>{u.status}</span>
                      </td>
                      <td className="p-2.5 whitespace-nowrap text-[10px] text-slate-400">{u.tgl}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50 mt-1">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Terintegrasi dengan sistem RKPDes & musyawarah desa</span>
        <span>Periode: Semester I 2026</span>
      </div>
    </div>
  );
}
