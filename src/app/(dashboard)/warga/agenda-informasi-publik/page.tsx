'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Calendar, Info, Megaphone, Globe, Heart, GraduationCap, Bookmark, RefreshCw, ExternalLink
} from 'lucide-react';

const COLOR = '#6a1b9a';

const AGENDA_PUBLIK = [
  { id: 'AP-01', judul: 'Musyawarah Desa RKPDes 2026', jenis: 'Musyawarah', tanggal: '25 Juli 2026', lokasi: 'Balai Desa', deskripsi: 'Penyusunan rencana kerja pemerintahan desa tahun 2026 bersama seluruh elemen masyarakat.', publik: true },
  { id: 'AP-02', judul: 'Posyandu Balita & Lansia Bulan Juli', jenis: 'Kesehatan', tanggal: '7 Juli 2026', lokasi: 'Gedung Posyandu Dusun A', deskripsi: 'Pelayanan rutin: penimbangan balita, imunisasi, dan pemeriksaan lansia.', publik: true },
  { id: 'AP-03', judul: 'Festival Adat Dayak Kenyah 2026', jenis: 'Budaya & Adat', tanggal: '20–22 Agustus 2026', lokasi: 'Lapangan Adat', deskripsi: 'Festival budaya tahunan yang menampilkan tari adat, pameran seni anyaman rotan, dan permainan tradisional.', publik: true },
  { id: 'AP-04', judul: 'Pelatihan Komputer Dasar Generasi Muda', jenis: 'Pendidikan', tanggal: '10 Agustus 2026', lokasi: 'Balai Desa', deskripsi: 'Program literasi digital bagi pemuda desa berusia 17–30 tahun. Pendaftaran dibuka hingga 7 Agustus 2026.', publik: true },
  { id: 'AP-05', judul: 'Pameran UMKM Anyaman Rotan Online', jenis: 'Ekonomi', tanggal: '1 September 2026', lokasi: 'Online + Balai Desa', deskripsi: 'Pameran produk UMKM unggulan Lung Anai di platform marketplace digital desa.', publik: true },
];

const INFO_PUBLIK = [
  { id: 'IP-01', judul: 'Laporan Realisasi APBDes Semester I 2026 Dipublikasikan', kategori: 'Keuangan Desa', tanggal: '1 Juli 2026', ringkasan: 'Realisasi belanja mencapai 62% dari total APBDes 2026. Dokumen lengkap tersedia di papan informasi Balai Desa.' },
  { id: 'IP-02', judul: 'Pengumuman Penerimaan Beasiswa Kuliah Desa 2026', kategori: 'Pendidikan', tanggal: '20 Juni 2026', ringkasan: 'Desa Lung Anai membuka 5 slot beasiswa kuliah bagi putra/putri kurang mampu. Pendaftaran 1–15 Agustus 2026.' },
  { id: 'IP-03', judul: 'Pembangunan Jembatan Dusun C Resmi Dimulai', kategori: 'Infrastruktur', tanggal: '5 Juli 2026', ringkasan: 'Peletakan batu pertama pembangunan jembatan gantung Dusun C dilakukan pada 5 Juli 2026 bersama Kepala Desa dan BPD.' },
  { id: 'IP-04', judul: 'Hasil Survei Kualitas Hidup Semester I 2026', kategori: 'Data Desa', tanggal: '30 Juni 2026', ringkasan: 'Indeks QoL Desa Lung Anai meningkat menjadi 71.28 (Baik), naik 2.50% dari semester sebelumnya.' },
  { id: 'IP-05', judul: 'Jadwal Vaksinasi Rutin Balita Bulan Juli', kategori: 'Kesehatan', tanggal: '1 Juli 2026', ringkasan: 'Vaksinasi BCG, DPT, dan Campak digelar tanggal 7 Juli 2026 di semua posyandu dusun.' },
];

const JENIS_ICON: Record<string, React.ReactNode> = {
  'Musyawarah': <Globe size={14} />,
  'Kesehatan': <Heart size={14} />,
  'Budaya & Adat': <Bookmark size={14} />,
  'Pendidikan': <GraduationCap size={14} />,
  'Ekonomi': <Megaphone size={14} />,
};

const KATEGORI_COLOR: Record<string, string> = {
  'Keuangan Desa': 'bg-teal-100 text-teal-700',
  'Pendidikan': 'bg-blue-100 text-blue-700',
  'Infrastruktur': 'bg-orange-100 text-orange-700',
  'Data Desa': 'bg-purple-100 text-purple-700',
  'Kesehatan': 'bg-red-100 text-red-700',
};

export default function AgendaInformasiPublikPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Agenda dan Informasi Publik" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Agenda Publik" value={AGENDA_PUBLIK.length} satuan="Kegiatan Mendatang" barColor="purple" progress={100} />
        <StatCard label="Info Baru" value={INFO_PUBLIK.length} satuan="Pengumuman" barColor="blue" progress={100} />
        <StatCard label="Jenis Kegiatan" value="5" satuan="Kategori" barColor="green" progress={100} />
        <StatCard label="Akses Publik" value="Terbuka" satuan="Semua Warga" barColor="orange" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* AGENDA PUBLIK */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Agenda Publik Mendatang
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {AGENDA_PUBLIK.map(ap => (
              <div key={ap.id} className="p-3 border rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded text-[10px] font-bold">
                    {JENIS_ICON[ap.jenis] || <Calendar size={11} />}
                    {ap.jenis}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{ap.tanggal}</span>
                </div>
                <p className="font-bold text-slate-800 text-xs leading-snug">{ap.judul}</p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1">📍 {ap.lokasi}</p>
                <p className="text-[11px] text-slate-600 leading-snug">{ap.deskripsi}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* INFORMASI PUBLIK */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Info size={16} /> Informasi & Pengumuman Resmi Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {INFO_PUBLIK.map(ip => (
              <div key={ip.id} className="p-3 border rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${KATEGORI_COLOR[ip.kategori] || 'bg-slate-100 text-slate-600'}`}>{ip.kategori}</span>
                  <span className="text-[10px] text-slate-400">{ip.tanggal}</span>
                </div>
                <p className="font-bold text-slate-800 text-xs leading-snug">{ip.judul}</p>
                <p className="text-[11px] text-slate-600 leading-relaxed">{ip.ringkasan}</p>
                <button className="text-[10px] text-purple-600 font-semibold flex items-center gap-1 hover:underline">
                  <ExternalLink size={10} /> Baca Selengkapnya
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Informasi dan agenda dikelola oleh Operator Desa & Sekretariat</span>
        <span>Periode: Juli 2026 — Data Simulasi Terkendali</span>
      </div>
    </div>
  );
}
