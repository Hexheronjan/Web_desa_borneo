'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart2, Filter, CheckCircle2, Clock, AlertCircle, MapPin, Calendar,
  User, Target, RefreshCw, MessageSquare, FileText
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

const BIDANG = ['Semua', 'Infrastruktur', 'Kesehatan', 'Pendidikan', 'Budaya & Adat'];
const WILAYAH = ['Semua', 'RT 01–04 Lung Anai', '17 RT Jonggon Jaya', '2 Dusun (12 RT)', '3 Desa Penelitian'];
const STATUS_LIST = ['Semua', 'Berjalan', 'Selesai', 'Persiapan', 'Ditunda'];
const PERIODE = ['Semua', 'Semester I 2026'];

type Status = 'Berjalan' | 'Selesai' | 'Persiapan' | 'Ditunda';

const STATUS_COLOR: Record<Status, string> = {
  Berjalan: 'bg-blue-100 text-blue-700',
  Selesai: 'bg-green-100 text-green-700',
  Persiapan: 'bg-yellow-100 text-yellow-700',
  Ditunda: 'bg-red-100 text-red-700',
};

const PROGRAMS = [
  { id: 'A02-LA', nama: 'Penguatan Konektivitas, Perangkat & Mode Luring (Lung Anai)', bidang: 'Infrastruktur', wilayah: 'RT 01–04 Lung Anai', tujuan: 'Konektivitas & sinkronisasi luring (D2: 30,75)', pj: 'Pemdes & Admin Sistem', lokasi: 'Desa Lung Anai, Kec. Loa Kulu', target: 'Des 2026', progres: 65, status: 'Berjalan' as Status, sumberAspirasi: 'DSS SAW #1 (0,9117) & Musdes', jadwal: 'Mei–Des 2026', hasilSementara: 'Perangkat hemat daya & mode luring diuji', periode: 'Semester I 2026', prioritas: true, dariAspirasi: true },
  { id: 'A08-JJ', nama: 'Dasbor SDGs Desa 3, 4, dan 18 (Jonggon Jaya)', bidang: 'Kesehatan', wilayah: '17 RT Jonggon Jaya', tujuan: 'Pemantauan SDGs 3, 4, 18 terpadu (D6: 58,40)', pj: 'Pemdes, Nakes & Guru', lokasi: 'Desa Jonggon Jaya, Kec. Loa Kulu', target: 'Des 2026', progres: 80, status: 'Berjalan' as Status, sumberAspirasi: 'DSS SAW #1 (0,9509)', jadwal: 'Jan–Des 2026', hasilSementara: 'KPI SDGs naik 73,81% → 81,78%', periode: 'Semester I 2026', prioritas: true, dariAspirasi: false },
  { id: 'A02-KI', nama: 'Integrasi Data & Penguatan Perangkat (Kedang Ipil)', bidang: 'Pendidikan', wilayah: '2 Dusun (12 RT)', tujuan: 'Integrasi data & standar kode (D4: 47,44)', pj: 'Pemdes & Lembaga Adat', lokasi: 'Desa Kedang Ipil, Kota Bangun Darat', target: 'Des 2026', progres: 68, status: 'Berjalan' as Status, sumberAspirasi: 'DSS SAW #1 (0,9200) & Musyawarah', jadwal: 'Jan–Des 2026', hasilSementara: 'SOP verifikasi data & persetujuan adat aktif', periode: 'Semester I 2026', prioritas: true, dariAspirasi: true },
  { id: 'PRG-04', nama: 'Penguatan Literasi Digital & Pendampingan Guru (SDG 4)', bidang: 'Pendidikan', wilayah: '3 Desa Penelitian', tujuan: 'Meningkatkan capaian KPI SDG 4 (74,90%) & UAT Guru', pj: 'Guru/Tenaga Pendidikan', lokasi: 'Sekolah & Balai Desa', target: 'Okt 2026', progres: 55, status: 'Persiapan' as Status, sumberAspirasi: 'Hasil Evaluasi RQ3', jadwal: 'Jul–Okt 2026', hasilSementara: 'Panduan tugas sederhana sedang diterapkan', periode: 'Semester I 2026', prioritas: true, dariAspirasi: true },
  { id: 'PRG-05', nama: 'Perlindungan & Klasifikasi Data Budaya (SDG 18)', bidang: 'Budaya & Adat', wilayah: '3 Desa Penelitian', tujuan: 'Klasifikasi publik/terbatas/rahasia & audit adat', pj: 'Lembaga Adat & Pemdes', lokasi: 'Balai Adat Lung Anai & Kedang Ipil', target: 'Okt 2026', progres: 87, status: 'Selesai' as Status, sumberAspirasi: 'Musyawarah Adat 2026', jadwal: 'Jan–Jul 2026', hasilSementara: 'Capaian SDG 18 mencapai 84,86% (Lung Anai 87,4%)', periode: 'Semester I 2026', prioritas: true, dariAspirasi: false },
];

export default function PemantauanProgramDesaPage() {
  const [filterBidang, setFilterBidang] = useState('Semua');
  const [filterWilayah, setFilterWilayah] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [filterPeriode, setFilterPeriode] = useState('Semua');
  const [onlyPrioritas, setOnlyPrioritas] = useState(false);
  const [onlyAspirasi, setOnlyAspirasi] = useState(false);
  const [selectedProg, setSelectedProg] = useState<typeof PROGRAMS[0] | null>(null);
  const [masukan, setMasukan] = useState('');
  const [showMasukanModal, setShowMasukanModal] = useState(false);

  const filtered = PROGRAMS.filter(p => {
    if (filterBidang !== 'Semua' && p.bidang !== filterBidang) return false;
    if (filterWilayah !== 'Semua' && p.wilayah !== filterWilayah) return false;
    if (filterStatus !== 'Semua' && p.status !== filterStatus) return false;
    if (filterPeriode !== 'Semua' && p.periode !== filterPeriode) return false;
    if (onlyPrioritas && !p.prioritas) return false;
    if (onlyAspirasi && !p.dariAspirasi) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pemantauan Program Desa" modul="Tokoh Masyarakat" color={COLOR} />

      {/* INFO RESTRICTION */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-start gap-2.5">
        <AlertCircle size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-medium leading-relaxed text-amber-700">
          Tokoh Masyarakat <strong>tidak dapat mengubah progres resmi</strong>, tetapi dapat memberi masukan atau melaporkan kondisi lapangan melalui tombol "Beri Masukan".
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Program" value={PROGRAMS.length} satuan="Program Terdaftar" barColor="purple" progress={100} />
        <StatCard label="Berjalan" value={PROGRAMS.filter(p => p.status === 'Berjalan').length} satuan="Aktif" barColor="blue" progress={40} />
        <StatCard label="Selesai" value={PROGRAMS.filter(p => p.status === 'Selesai').length} satuan="Tuntas" barColor="green" progress={20} />
        <StatCard label="Ditunda" value={PROGRAMS.filter(p => p.status === 'Ditunda').length} satuan="Terhambat" barColor="orange" progress={20} />
      </div>

      {/* FILTER SECTION */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Filter size={16} /> Filter Program dan Status Pelaksanaan
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-600">BIDANG:</label>
            <select value={filterBidang} onChange={e => setFilterBidang(e.target.value)} className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
              {BIDANG.map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-bold text-slate-600">WILAYAH:</label>
            <select value={filterWilayah} onChange={e => setFilterWilayah(e.target.value)} className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
              {WILAYAH.map(w => <option key={w}>{w}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-bold text-slate-600">STATUS:</label>
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
              {STATUS_LIST.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-bold text-slate-600">PERIODE:</label>
            <select value={filterPeriode} onChange={e => setFilterPeriode(e.target.value)} className="w-full p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
              {PERIODE.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="col-span-2 lg:col-span-4 flex gap-4 pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={onlyPrioritas} onChange={e => setOnlyPrioritas(e.target.checked)} className="accent-purple-700" />
              <span className="font-semibold text-slate-700">Program Prioritas Saja</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={onlyAspirasi} onChange={e => setOnlyAspirasi(e.target.checked)} className="accent-purple-700" />
              <span className="font-semibold text-slate-700">Program Berdasarkan Aspirasi Saja</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* TABEL PROGRAM */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <BarChart2 size={16} /> Daftar Program & Status Pelaksanaan ({filtered.length} Program)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border border-slate-100">
            <table className="w-full text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                <tr>
                  <th className="p-2.5">ID</th>
                  <th className="p-2.5 min-w-[150px]">Nama Program</th>
                  <th className="p-2.5">Tujuan</th>
                  <th className="p-2.5">PJ</th>
                  <th className="p-2.5">Lokasi</th>
                  <th className="p-2.5">Target</th>
                  <th className="p-2.5 min-w-[100px]">Progres</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Sumber Aspirasi</th>
                  <th className="p-2.5">Jadwal</th>
                  <th className="p-2.5">Hasil Sementara</th>
                  <th className="p-2.5">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(p => (
                  <tr key={p.id} className="align-top hover:bg-slate-50/50">
                    <td className="p-2.5 font-mono text-[10px] text-slate-400">{p.id}</td>
                    <td className="p-2.5">
                      <p className="font-semibold text-slate-800 max-w-[150px] leading-snug">{p.nama}</p>
                      <div className="flex gap-1 mt-0.5 flex-wrap">
                        <span className="px-1 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-500">{p.bidang}</span>
                        {p.prioritas && <span className="px-1 py-0.5 rounded text-[9px] font-bold bg-red-50 text-red-600">Prioritas</span>}
                        {p.dariAspirasi && <span className="px-1 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-600">Dari Aspirasi</span>}
                      </div>
                    </td>
                    <td className="p-2.5 text-[10px] text-slate-600 max-w-[110px] leading-snug">{p.tujuan}</td>
                    <td className="p-2.5 text-[10px] text-slate-600 whitespace-nowrap">{p.pj}</td>
                    <td className="p-2.5 text-[10px] text-slate-600 whitespace-nowrap">{p.lokasi}</td>
                    <td className="p-2.5 text-[10px] text-slate-600 whitespace-nowrap">{p.target}</td>
                    <td className="p-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-1.5 min-w-[60px]">
                          <div className="h-1.5 rounded-full bg-purple-600" style={{ width: `${p.progres}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-700 w-8">{p.progres}%</span>
                      </div>
                    </td>
                    <td className="p-2.5">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${STATUS_COLOR[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="p-2.5 text-[10px] text-slate-500 whitespace-nowrap">{p.sumberAspirasi}</td>
                    <td className="p-2.5 text-[10px] text-slate-500 whitespace-nowrap">{p.jadwal}</td>
                    <td className="p-2.5 text-[10px] text-slate-500 max-w-[130px] leading-snug">{p.hasilSementara}</td>
                    <td className="p-2.5">
                      <button
                        onClick={() => { setSelectedProg(p); setShowMasukanModal(true); setMasukan(''); }}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-purple-700 text-white text-[9px] font-bold hover:bg-purple-800 transition-colors whitespace-nowrap"
                      >
                        <MessageSquare size={9} /> Masukan
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="text-center text-xs text-slate-400 py-6">Tidak ada program yang sesuai filter.</p>}
          </div>
        </CardContent>
      </Card>

      {/* MASUKAN MODAL */}
      {showMasukanModal && selectedProg && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-[420px] border">
            <div className="p-4 bg-purple-900 text-white flex justify-between items-center rounded-t-xl">
              <h3 className="font-bold text-sm">Masukan Lapangan: {selectedProg.nama}</h3>
              <button onClick={() => setShowMasukanModal(false)} className="text-purple-200 hover:text-white font-bold">✕</button>
            </div>
            <div className="p-4 space-y-3 text-xs">
              <p className="text-slate-500">Laporkan kondisi lapangan atau beri masukan kepada penanggung jawab program tanpa mengubah progres resmi.</p>
              <textarea rows={4} value={masukan} onChange={e => setMasukan(e.target.value)} placeholder="Contoh: Kondisi di lapangan belum sesuai rencana, jembatan masih berupa fondasi..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-slate-700" />
              <div className="flex gap-2">
                <button onClick={() => setShowMasukanModal(false)} className="flex-1 py-2.5 border rounded-lg font-bold hover:bg-slate-50 text-slate-600">Batal</button>
                <button onClick={() => { alert('Masukan lapangan berhasil dikirim ke penanggung jawab program!'); setShowMasukanModal(false); }} className="flex-1 py-2.5 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-800 transition-colors">Kirim Masukan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Terintegrasi dengan SID & sistem monitoring program kerja</span>
        <span>Periode: Semester I 2026</span>
      </div>
    </div>
  );
}
