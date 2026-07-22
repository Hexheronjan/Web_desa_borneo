'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  FileText, Landmark, Calendar, Clock, Image, ArrowRight,
  ShieldCheck, CheckCircle2, User, RefreshCw, Layers, Plus
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const MOCK_DOKUMENTASI = [
  {
    id: 'DOK-001',
    kegiatan: 'Sosialisasi & Rembuk Stunting Dusun A',
    program: 'Gerakan 1000 HPK & Posyandu Digital',
    foto: 'Foto_Rembuk_Stunting.jpg',
    beritaAcara: 'BA_Rembuk_Stunting_DusunA.pdf',
    laporan: 'Laporan_Rembuk_Stunting_1000HPK.pdf',
    bukti: 'Daftar_Hadir_Sosialisasi.pdf',
    sumber: 'Kader Posyandu Dusun A',
    waktu: '12 Juli 2026, 09:00 WITA',
    klasifikasi: 'Publik', // Publik, Terbatas
    persetujuanPublik: true,
  },
  {
    id: 'DOK-002',
    kegiatan: 'Instalasi Access Point WiFi di Balai Adat',
    program: 'Pembangunan Jembatan TIK & Tower Dusun C',
    foto: 'Foto_Instalasi_WiFi_BalaiAdat.jpg',
    beritaAcara: 'BA_Instalasi_WiFi_BalaiAdat.pdf',
    laporan: 'Laporan_Realisasi_WiFi_AP.pdf',
    bukti: 'Berita_Acara_Serah_Terima_WiFi.pdf',
    sumber: 'Kasi Pemerintahan',
    waktu: '08 Juli 2026, 14:00 WITA',
    klasifikasi: 'Publik',
    persetujuanPublik: true,
  },
  {
    id: 'DOK-003',
    kegiatan: 'Penyusunan Kamus Bahasa Dayak Kenyah v1.0',
    program: 'Digitalisasi Huma Betang & Sastra Adat',
    foto: 'Foto_Penyusunan_Kamus_Adat.jpg',
    beritaAcara: 'BA_Penyusunan_Kamus_LembagaAdat.pdf',
    laporan: 'Laporan_Progres_Kamus_Digital.pdf',
    bukti: 'Draf_Kamus_Dayak_Kenyah_v1.pdf',
    sumber: 'Lembaga Adat & Pemuda Adat',
    waktu: '01 Juli 2026, 10:00 WITA',
    klasifikasi: 'Terbatas (Butuh Izin Adat)',
    persetujuanPublik: false,
  }
];

export default function DokumentasiKegiatanPage() {
  const [data, setData] = useState(MOCK_DOKUMENTASI);
  const [selectedDok, setSelectedDok] = useState<typeof MOCK_DOKUMENTASI[0] | null>(MOCK_DOKUMENTASI[0]);

  // Form states
  const [kegiatan, setKegiatan] = useState('');
  const [program, setProgram] = useState('');
  const [foto, setFoto] = useState('');
  const [beritaAcara, setBeritaAcara] = useState('');
  const [laporan, setLaporan] = useState('');
  const [bukti, setBukti] = useState('');
  const [sumber, setSumber] = useState('');
  const [waktu, setWaktu] = useState('');
  const [klasifikasi, setKlasifikasi] = useState('Publik');
  const [persetujuanPublik, setPersetujuanPublik] = useState(true);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kegiatan || !program || !sumber) { alert('Kegiatan, Program, dan Sumber data wajib diisi.'); return; }

    const baru = {
      id: `DOK-00${data.length + 1}`,
      kegiatan,
      program,
      foto: foto || 'default_foto.jpg',
      beritaAcara: beritaAcara || 'BA_Dokumentasi.pdf',
      laporan: laporan || 'Laporan_Kegiatan.pdf',
      bukti: bukti || 'Daftar_Hadir.pdf',
      sumber,
      waktu: waktu || new Date().toLocaleString('id-ID') + ' WITA',
      klasifikasi,
      persetujuanPublik,
    };

    setData(prev => [baru, ...prev]);
    setSelectedDok(baru);

    // reset
    setKegiatan(''); setProgram(''); setFoto(''); setBeritaAcara(''); setLaporan(''); setBukti(''); setSumber(''); setWaktu('');
    alert('✅ Dokumentasi kegiatan berhasil disimpan.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dokumentasi Kegiatan" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Dokumentasi" value={data.length} satuan="Kegiatan" barColor="purple" progress={100} />
        <StatCard label="Klasifikasi Publik" value={data.filter(d => d.persetujuanPublik).length} satuan="Kegiatan Terbuka" barColor="green" progress={67} />
        <StatCard label="Klasifikasi Terbatas" value={data.filter(d => !d.persetujuanPublik).length} satuan="Akses Adat/Internal" barColor="orange" progress={33} />
        <StatCard label="Lampiran File" value="12 Dokumen" satuan="Bukti Terintegrasi" barColor="blue" progress={90} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* FORM TAMBAH DOKUMENTASI */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Plus size={16} /> Catat Dokumentasi Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700">NAMA KEGIATAN:</label>
                <input type="text" value={kegiatan} onChange={e => setKegiatan(e.target.value)} placeholder="Nama kegiatan desa..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">PROGRAM KERJA TERKAIT:</label>
                <input type="text" value={program} onChange={e => setProgram(e.target.value)} placeholder="Internet Desa / Rembuk Stunting..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">SUMBER LAPORAN:</label>
                <input type="text" value={sumber} onChange={e => setSumber(e.target.value)} placeholder="Kader Posyandu / Kasi Pem..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">FOTO KEGIATAN (NAMA FILE):</label>
                <input type="text" value={foto} onChange={e => setFoto(e.target.value)} placeholder="Foto_Rembuk_Stunting.jpg..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">BERITA ACARA:</label>
                <input type="text" value={beritaAcara} onChange={e => setBeritaAcara(e.target.value)} placeholder="BA_Rembuk_Stunting.pdf..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">LAPORAN KEGIATAN:</label>
                <input type="text" value={laporan} onChange={e => setLaporan(e.target.value)} placeholder="Laporan_Kegiatan.pdf..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">BUKTI PENDUKUNG LAIN:</label>
                <input type="text" value={bukti} onChange={e => setBukti(e.target.value)} placeholder="Daftar_Hadir_Sosialisasi.pdf..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-700">WAKTU KEGIATAN:</label>
                <input type="text" value={waktu} onChange={e => setWaktu(e.target.value)} placeholder="18 Juli 2026, 10:00 WITA..." className="w-full p-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-2 border-t pt-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">KLASIFIKASI:</label>
                  <select value={klasifikasi} onChange={e => setKlasifikasi(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                    <option value="Publik">Publik</option>
                    <option value="Terbatas">Terbatas (Adat)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">PERSETUJUAN PUBLIK:</label>
                  <select value={persetujuanPublik ? 'Ya' : 'Tidak'} onChange={e => setPersetujuanPublik(e.target.value === 'Ya')} className="w-full p-2 border rounded-lg bg-white">
                    <option value="Ya">Diberikan</option>
                    <option value="Tidak">Ditolak</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm">
                Catat Dokumentasi
              </button>
            </form>
          </CardContent>
        </Card>

        {/* LIST DOKUMENTASI & PREVIEW */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Daftar Dokumentasi Terdaftar</h2>

          {data.map(d => (
            <Card key={d.id} onClick={() => setSelectedDok(d)} className={`cursor-pointer border transition-all ${selectedDok?.id === d.id ? 'border-indigo-400 bg-indigo-50/20 shadow-sm' : 'border-slate-200 hover:bg-slate-50/50'}`}>
              <CardContent className="p-4 space-y-3.5 text-xs">
                
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-mono font-bold text-slate-400">{d.id}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${d.persetujuanPublik ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {d.klasifikasi}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-xs leading-snug">{d.kegiatan}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold">Program: {d.program}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[10px] text-slate-500 border-t pt-2">
                  <p className="flex items-center gap-0.5"><Image size={11} className="text-indigo-700" /> Foto: <strong>{d.foto}</strong></p>
                  <p className="flex items-center gap-0.5"><FileText size={11} className="text-indigo-700" /> Berita Acara: <strong>{d.beritaAcara}</strong></p>
                  <p className="flex items-center gap-0.5"><FileText size={11} className="text-indigo-700" /> Laporan: <strong>{d.laporan}</strong></p>
                  <p className="flex items-center gap-0.5"><ShieldCheck size={11} className="text-indigo-700" /> Bukti: <strong>{d.bukti}</strong></p>
                </div>

                <div className="flex justify-between items-center text-[9px] text-slate-400 border-t pt-1.5">
                  <span>Sumber: {d.sumber}</span>
                  <span>Waktu: {d.waktu}</span>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Seluruh file dokumentasi divalidasi oleh Lembaga Adat dan Sekdes</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
