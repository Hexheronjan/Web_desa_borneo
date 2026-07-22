'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { GraduationCap, BookOpen, Monitor, Calendar, AlertCircle, RefreshCw, Lock } from 'lucide-react';

const COLOR = '#6a1b9a';

const PROGRAM_PENDIDIKAN = [
  { nama: 'Kelas Digital Dasar Pemuda Desa', jenis: 'Pelatihan', jadwal: '10 Agustus 2025', lokasi: 'Balai Desa', status: 'Akan Datang', capaian: '-' },
  { nama: 'Perpustakaan Digital SID Desa', jenis: 'Literasi Digital', jadwal: 'Ongoing', lokasi: 'Online & Balai Desa', status: 'Berjalan', capaian: '45 buku digital tersedia' },
  { nama: 'Beasiswa Kuliah Bagi Anak Kurang Mampu', jenis: 'Program Pendidikan', jadwal: 'Pendaftaran: 1–15 Agst 2025', lokasi: 'Kantor Desa', status: 'Buka', capaian: 'Kuota: 5 orang/tahun' },
  { nama: 'Pelatihan Anyaman Rotan & Pemasaran Online', jenis: 'Pelatihan', jadwal: '10 Juli 2025 — Selesai', lokasi: 'Gedung Serbaguna', status: 'Selesai', capaian: '28 peserta bersertifikat' },
];

const KEBUTUHAN_AGREGAT = [
  { aspek: 'Literasi Komputer/HP', persen: 74, keterangan: 'Masih ada 26% warga yang membutuhkan pendampingan dasar' },
  { aspek: 'Akses Internet untuk Belajar', persen: 62, keterangan: '38% pelajar kesulitan mengakses materi daring' },
  { aspek: 'Ketersediaan Buku Teks Pelajaran', persen: 88, keterangan: 'Sudah terpenuhi melalui BOS & Perpusdes' },
  { aspek: 'Pendidikan Vokasional & Keterampilan', persen: 45, keterangan: '55% pemuda belum mendapat pelatihan keterampilan kerja' },
];

const AGENDA_SEKOLAH = [
  { nama: 'MPLS SDN Lung Anai 01 T.A. 2025/2026', tgl: '14 Juli 2025', jenis: 'Agenda Sekolah' },
  { nama: 'Sosialisasi BOS & PIP Semester I', tgl: '20 Juli 2025', jenis: 'Agenda Desa' },
  { nama: 'Lomba Cerdas Cermat Tingkat Kecamatan', tgl: '2 Agustus 2025', jenis: 'Agenda Sekolah' },
];

export default function InformasiPendidikanPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Informasi Pendidikan dan SDG Desa 4" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-medium leading-relaxed text-amber-700">
          Tokoh Masyarakat <strong>tidak dapat melihat data peserta didik secara individual</strong> (nilai, absensi, atau data pribadi siswa). Hanya data agregat dan informasi program publik yang ditampilkan.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Program Pendidikan" value={PROGRAM_PENDIDIKAN.length} satuan="Program Terdaftar" barColor="purple" progress={100} />
        <StatCard label="Capaian Literasi" value="74%" satuan="Melek Digital" barColor="blue" progress={74} />
        <StatCard label="Target SDG Desa 4" value="On Track" satuan="Pendidikan Berkualitas" barColor="green" progress={75} />
        <StatCard label="Peserta Terlatih" value={28} satuan="Bersertifikat 2025" barColor="orange" progress={56} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* PROGRAM PENDIDIKAN */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <GraduationCap size={16} /> Program Pendidikan & Pelatihan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5 min-w-[150px]">Nama Program</th>
                    <th className="p-2.5">Jenis</th>
                    <th className="p-2.5">Jadwal</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Capaian Dipublikasikan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PROGRAM_PENDIDIKAN.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-semibold text-slate-800 leading-snug">{p.nama}</td>
                      <td className="p-2.5"><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-700 whitespace-nowrap">{p.jenis}</span></td>
                      <td className="p-2.5 text-[10px] text-slate-500">{p.jadwal}</td>
                      <td className="p-2.5"><span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${p.status === 'Selesai' ? 'bg-green-100 text-green-700' : p.status === 'Berjalan' ? 'bg-blue-100 text-blue-700' : p.status === 'Buka' ? 'bg-teal-100 text-teal-700' : 'bg-sky-100 text-sky-700'}`}>{p.status}</span></td>
                      <td className="p-2.5 text-[10px] text-slate-500">{p.capaian}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* KEBUTUHAN AGREGAT */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BookOpen size={16} /> Kebutuhan Pendidikan Agregat Masyarakat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {KEBUTUHAN_AGREGAT.map((k, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{k.aspek}</span>
                  <span className="font-bold text-purple-700">{k.persen}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="h-1.5 rounded-full" style={{ width: `${k.persen}%`, backgroundColor: '#6a1b9a' }} />
                </div>
                <p className="text-[10px] text-slate-400">{k.keterangan}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AGENDA SEKOLAH & DESA */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Agenda Pendidikan Sekolah & Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5 text-xs">
            {AGENDA_SEKOLAH.map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 border rounded-lg bg-slate-50/50">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-purple-700" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 leading-snug">{a.nama}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{a.tgl} • {a.jenis}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* SDG Desa 4 INFO */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Monitor size={16} /> Capaian SDG Desa 4 — Pendidikan Berkualitas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>Desa Lung Anai berada pada jalur pencapaian SDG Desa 4 dengan progres angka melek huruf mencapai <strong>96.8%</strong> dari target 100%.</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'APK SD', val: '98%' }, { label: 'APK SMP', val: '87%' },
                { label: 'Melek Huruf Dewasa', val: '96.8%' }, { label: 'Akses Belajar Digital', val: '62%' }
              ].map((d, i) => (
                <div key={i} className="p-2 border rounded-lg bg-slate-50 text-center">
                  <p className="font-bold text-purple-700 text-sm">{d.val}</p>
                  <p className="text-[10px] text-slate-500">{d.label}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 border-t pt-2"><AlertCircle size={10} className="inline mr-1 text-amber-500" />Data peserta didik individual tidak dapat diakses oleh Tokoh Masyarakat.</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data agregat bersumber dari Dapodik & SID Desa</span>
        <span>SDG Desa 4 — Pendidikan Berkualitas</span>
      </div>
    </div>
  );
}
