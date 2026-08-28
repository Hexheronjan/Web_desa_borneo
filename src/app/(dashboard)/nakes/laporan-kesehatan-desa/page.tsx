'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/shared/StatCard';
import {
  FileText, Download, Calendar, CheckCircle2,
  Users, HeartPulse, Baby, AlertTriangle, TrendingUp, Filter
} from 'lucide-react';

const COLOR = '#e65100';

const periodeLaporan = ['Q1 2025 (Jan-Mar)', 'Q2 2025 (Apr-Jun)', 'Q3 2025 (Jul-Sep)', 'Q4 2024 (Okt-Des)'];

const rekap = {
  totalKunjunganPostyandu: 284,
  totalBalitaTerpantau: 156,
  totalIbuHamil: 38,
  kasusStunting: 12,
  kasusGizi: 7,
  imunisasiLengkap: 89,
};

const laporanList = [
  { id: '1', judul: 'Laporan Posyandu Bulanan - Maret 2025', tanggal: '31 Mar 2025', status: 'Selesai', tipe: 'Posyandu' },
  { id: '2', judul: 'Rekap Monitoring Stunting - Q1 2025', tanggal: '15 Apr 2025', status: 'Selesai', tipe: 'Stunting' },
  { id: '3', judul: 'Laporan Ibu Hamil dan ANC - Maret 2025', tanggal: '31 Mar 2025', status: 'Selesai', tipe: 'Ibu Hamil' },
  { id: '4', judul: 'Laporan SDG Desa 3 - Triwulan I 2025', tanggal: '10 Apr 2025', status: 'Selesai', tipe: 'SDGs 3' },
  { id: '5', judul: 'Laporan Penyakit Prioritas - Feb 2025', tanggal: '28 Feb 2025', status: 'Tindak Lanjut', tipe: 'Penyakit' },
  { id: '6', judul: 'Rekap Imunisasi Balita - Q1 2025', tanggal: '01 Apr 2025', status: 'Draft', tipe: 'Imunisasi' },
];

const tindakLanjut = [
  { id: '1', masalah: '12 Balita Kategori Stunting Berat', tindakan: 'Rujukan ke Puskesmas + PMT Khusus', status: 'Berjalan', prioritas: 'Tinggi' },
  { id: '2', masalah: '7 Kasus Gizi Kurang', tindakan: 'Pemberian PMT dan Konseling Gizi', status: 'Selesai', prioritas: 'Sedang' },
  { id: '3', masalah: '3 Ibu Hamil Risiko Tinggi', tindakan: 'Monitoring Intensif dan Rujukan SpOG', status: 'Berjalan', prioritas: 'Tinggi' },
  { id: '4', masalah: 'Cakupan Imunisasi < 80%', tindakan: 'Sweeping Imunisasi dan Sosialisasi', status: 'Direncanakan', prioritas: 'Sedang' },
];

const statusColor: Record<string, string> = {
  'Selesai': 'bg-green-100 text-green-700',
  'Tindak Lanjut': 'bg-amber-100 text-amber-700',
  'Draft': 'bg-slate-100 text-slate-600',
  'Berjalan': 'bg-blue-100 text-blue-700',
  'Direncanakan': 'bg-purple-100 text-purple-700',
};

const prioritasColor: Record<string, string> = {
  'Tinggi': 'bg-red-100 text-red-700 border border-red-200',
  'Sedang': 'bg-amber-100 text-amber-700 border border-amber-200',
  'Rendah': 'bg-green-100 text-green-700 border border-green-200',
};

export default function LaporanKesehatanDesaPage() {
  const [periode, setPeriode] = useState(periodeLaporan[0]);
  const [activeTab, setActiveTab] = useState<'laporan' | 'tindaklanjut'>('laporan');

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-start flex-wrap gap-4 border-b pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight uppercase">Laporan Bidang Kesehatan</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Laporan Rutin dan Tindak Lanjut | Tenaga Kesehatan - Smart Living Village</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Use Case: Membuat laporan bidang dan tindak lanjut (SDGs Desa 3)</p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <div className="flex items-center gap-2 text-xs border rounded-lg px-3 py-2 bg-white">
            <Filter size={14} className="text-slate-400" />
            <select className="bg-transparent text-slate-700 font-semibold outline-none text-xs" value={periode} onChange={e => setPeriode(e.target.value)}>
              {periodeLaporan.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <button className="flex items-center gap-2 text-xs px-4 py-2 rounded-lg font-bold text-white" style={{ backgroundColor: COLOR }}>
            <Download size={14} />Export Laporan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Kunjungan Posyandu" value={String(rekap.totalKunjunganPostyandu)} satuan="Kunjungan" barColor="orange" progress={85} />
        <StatCard label="Balita Terpantau" value={String(rekap.totalBalitaTerpantau)} satuan="Jiwa" barColor="blue" progress={75} />
        <StatCard label="Ibu Hamil" value={String(rekap.totalIbuHamil)} satuan="Jiwa" barColor="purple" progress={60} />
        <StatCard label="Kasus Stunting" value={String(rekap.kasusStunting)} satuan="Anak" barColor="red" progress={30} />
        <StatCard label="Kasus Gizi Kurang" value={String(rekap.kasusGizi)} satuan="Anak" barColor="yellow" progress={20} />
        <StatCard label="Imunisasi Lengkap" value={`${rekap.imunisasiLengkap}%`} satuan="Cakupan" barColor="green" progress={rekap.imunisasiLengkap} />
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'laporan' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`} onClick={() => setActiveTab('laporan')}>
          <FileText size={12} className="inline mr-1" />Arsip Laporan
        </button>
        <button className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'tindaklanjut' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`} onClick={() => setActiveTab('tindaklanjut')}>
          <CheckCircle2 size={12} className="inline mr-1" />Tindak Lanjut
        </button>
      </div>

      {activeTab === 'laporan' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Arsip Laporan Kesehatan - {periode}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b text-slate-500 bg-slate-50">
                    <th className="text-left px-3 py-2 font-semibold">Judul Laporan</th>
                    <th className="text-left px-3 py-2 font-semibold">Tipe</th>
                    <th className="text-left px-3 py-2 font-semibold">Tanggal</th>
                    <th className="text-left px-3 py-2 font-semibold">Status</th>
                    <th className="text-left px-3 py-2 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {laporanList.map(l => (
                    <tr key={l.id} className="border-b hover:bg-slate-50">
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <FileText size={14} className="text-orange-500 flex-shrink-0" />
                          <span className="font-semibold text-slate-700">{l.judul}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3"><span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded text-[10px] font-bold">{l.tipe}</span></td>
                      <td className="px-3 py-3 text-slate-500"><div className="flex items-center gap-1"><Calendar size={11} />{l.tanggal}</div></td>
                      <td className="px-3 py-3"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusColor[l.status] || ''}`}>{l.status}</span></td>
                      <td className="px-3 py-3"><button className="flex items-center gap-1 text-[10px] font-bold text-orange-600 hover:text-orange-800"><Download size={11} />Unduh</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'tindaklanjut' && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold">Tindak Lanjut Program Kesehatan - {periode}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {tindakLanjut.map(t => (
                <div key={t.id} className="border rounded-xl p-4 hover:shadow-sm bg-white">
                  <div className="flex justify-between items-start gap-3 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <AlertTriangle size={13} className="text-red-500 flex-shrink-0" />
                        <span className="font-bold text-xs text-slate-800">{t.masalah}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${prioritasColor[t.prioritas]}`}>{t.prioritas}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 ml-5"><span className="font-semibold text-slate-600">Tindakan: </span>{t.tindakan}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex-shrink-0 ${statusColor[t.status] || ''}`}>{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-xs font-bold text-slate-600 mb-3">+ Tambah Tindak Lanjut Baru</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" placeholder="Masalah / temuan kesehatan..." className="border rounded-lg px-3 py-2 text-xs outline-none focus:border-orange-400" />
                <input type="text" placeholder="Rencana tindakan..." className="border rounded-lg px-3 py-2 text-xs outline-none focus:border-orange-400" />
              </div>
              <div className="flex gap-2 mt-3">
                <select className="border rounded-lg px-3 py-2 text-xs outline-none"><option>Prioritas Tinggi</option><option>Prioritas Sedang</option><option>Prioritas Rendah</option></select>
                <button className="px-4 py-2 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: COLOR }}>Simpan Tindak Lanjut</button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
