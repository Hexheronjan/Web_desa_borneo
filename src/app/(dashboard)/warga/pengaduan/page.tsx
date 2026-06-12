'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { AlertCircle, Plus, Send } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

const initialComplaints = [
  { id: 'ADU01', tanggal: '11 Jun 2026', kategori: 'Infrastruktur', judul: 'Tiang Listrik RT 02 Roboh', status: 'Ditindaklanjuti' },
  { id: 'ADU02', tanggal: '05 Jun 2026', kategori: 'Utilitas Air', judul: 'Kebocoran Pipa Saluran Utama Huma', status: 'Selesai' }
];

export default function PengaduanPage() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Infrastruktur');
  const [deskripsi, setDeskripsi] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !deskripsi) return;

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const newComplaint = {
      id: `ADU${String(complaints.length + 1).padStart(2, '0')}`,
      tanggal: `${pad(now.getDate())} Jun 2026`,
      kategori,
      judul,
      status: 'Diterima'
    };
    setComplaints([newComplaint, ...complaints]);
    setJudul('');
    setDeskripsi('');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Portal Pengaduan Warga" modul="Warga Adat Borneo" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Aduan" value={complaints.length} satuan="laporan" barColor="purple" progress={100} />
        <StatCard label="Ditindaklanjuti" value={complaints.filter(c => c.status === 'Ditindaklanjuti').length} satuan="aduan" barColor="blue" progress={50} />
        <StatCard label="Selesai (Tuntas)" value={complaints.filter(c => c.status === 'Selesai').length} satuan="aduan" barColor="green" progress={50} />
        <StatCard label="Menunggu Respon" value={complaints.filter(c => c.status === 'Diterima').length} satuan="antrian baru" barColor="orange" progress={0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Form Pengaduan */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertCircle size={16} /> Kirim Laporan Pengaduan / Masalah Fasilitas Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">KATEGORI MASALAH:</label>
                <select
                  value={kategori}
                  onChange={e => setKategori(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="Infrastruktur">Infrastruktur (Jalan, Jembatan)</option>
                  <option value="Utilitas Air">Utilitas & Air Bersih</option>
                  <option value="Kelistrikan">Kelistrikan & Energi</option>
                  <option value="Keamanan">Keamanan Lingkungan</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">JUDUL LAPORAN:</label>
                <input
                  type="text"
                  placeholder="Contoh: Lampu Jalan RT 01 Padam"
                  value={judul}
                  onChange={e => setJudul(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">DESKRIPSI DETAIL:</label>
                <textarea
                  rows={4}
                  placeholder="Ceritakan kejadian/kendala secara lengkap..."
                  value={deskripsi}
                  onChange={e => setDeskripsi(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send size={12} /> Kirim Laporan Aduan
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Riwayat Pengaduan */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertCircle size={16} /> Daftar Riwayat Laporan Aduan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complaints.map((c, i) => (
              <div key={i} className="p-3 border rounded-xl bg-white flex justify-between items-center hover:shadow-sm transition-all">
                <div>
                  <p className="text-xs font-bold text-slate-700 leading-normal">{c.judul}</p>
                  <span className="text-[10px] text-indigo-700 font-mono font-bold block mt-0.5">{c.id} • {c.tanggal} • {c.kategori}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  c.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                  c.status === 'Ditindaklanjuti' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
