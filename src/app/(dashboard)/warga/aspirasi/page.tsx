'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Send, Search, ListOrdered, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

const initialAspirasi = [
  { no: 1, tanggal: '11 Jun 2026', kategori: 'Infrastruktur', judul: 'Penggantian Kayu Ulin Jembatan RT 03', status: 'Ditindaklanjuti' },
  { no: 2, tanggal: '08 Jun 2026', kategori: 'Kebudayaan', judul: 'Pelatihan Seni Musik Kecapi Dayak untuk Pemuda', status: 'Diterima' }
];

export default function WargaAspirasiPage() {
  const [aspirations, setAspirations] = useState(initialAspirasi);
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Infrastruktur');
  const [isi, setIsi] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !isi) return;

    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, '0');
    const newAsp = {
      no: aspirations.length + 1,
      tanggal: `${pad(now.getDate())} Jun 2026`,
      kategori,
      judul,
      status: 'Diterima'
    };
    setAspirations([newAsp, ...aspirations]);
    setJudul('');
    setIsi('');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Aspirasi Masyarakat" modul="Warga Adat Borneo" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Aspirasi Dikirim" value={aspirations.length} satuan="usulan" barColor="purple" progress={100} />
        <StatCard label="Ditindaklanjuti" value={aspirations.filter(a => a.status === 'Ditindaklanjuti').length} satuan="usulan" barColor="green" progress={50} />
        <StatCard label="Menunggu Kajian" value={aspirations.filter(a => a.status === 'Diterima').length} satuan="usulan" barColor="orange" progress={50} />
        <StatCard label="Fungsi Legislasi BPD" value="Aktif" satuan="pengawasan" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Form Input Aspirasi */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Send size={16} /> Kirim Usulan & Aspirasi Pembangunan Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">KATEGORI USULAN:</label>
                <select
                  value={kategori}
                  onChange={e => setKategori(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="Infrastruktur">Infrastruktur & Prasarana</option>
                  <option value="Kebudayaan">Kebudayaan & Adat Dayak</option>
                  <option value="Kesehatan">Kesehatan & Posyandu</option>
                  <option value="Pendidikan">Pendidikan & Literasi Digital</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">JUDUL USULAN / IDE:</label>
                <input
                  type="text"
                  placeholder="Contoh: Pengadaan Alat Pelatihan Anyaman Rotan"
                  value={judul}
                  onChange={e => setJudul(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">DETAIL USULAN:</label>
                <textarea
                  rows={4}
                  placeholder="Jelaskan secara detail ide usulan Anda dan dampak positifnya bagi warga desa..."
                  value={isi}
                  onChange={e => setIsi(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send size={12} /> Kirim Usulan
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Daftar Aspirasi */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle2 size={16} /> Riwayat Usulan Anda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aspirations.map((a, i) => (
              <div key={i} className="p-3 border rounded-xl bg-white flex justify-between items-center hover:shadow-sm transition-all">
                <div>
                  <p className="text-xs font-bold text-slate-700 leading-normal">{a.judul}</p>
                  <span className="text-[10px] text-indigo-700 font-mono font-bold block mt-0.5">{a.tanggal} • {a.kategori}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  a.status === 'Ditindaklanjuti' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {a.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
