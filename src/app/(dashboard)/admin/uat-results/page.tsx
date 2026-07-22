'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, Star, MessageSquare, ShieldAlert, Award, Layers } from 'lucide-react';

const COLOR = '#1a237e';

// Responden UAT (Representasi peran)
const RESPONDEN_DATA = [
  { id: 'R-01', namaUser: 'Dr. Ahmad Surya', role: 'Administrator Sistem', susScore: 85, kategori: 'Sangat Baik', umpanBalik: 'Dasbor operasional sangat informatif untuk memantau server dan log audit.' },
  { id: 'R-02', namaUser: 'Bapak Lurah Hasan', role: 'Pemerintah Desa', susScore: 82.5, kategori: 'Sangat Baik', umpanBalik: 'Pengajuan surat online dan tracking usulan sangat membantu warga.' },
  { id: 'R-03', namaUser: 'Tetua Adat Buyung', role: 'Lembaga Adat', susScore: 78, kategori: 'Baik', umpanBalik: 'Penyimpanan arsip digital budaya Dayak mudah diakses.' },
  { id: 'R-04', namaUser: 'Bidan Kartini', role: 'Tenaga Kesehatan', susScore: 88, kategori: 'Sangat Baik', umpanBalik: 'Pencatatan data stunting dan jadwal posyandu sangat user-friendly.' },
  { id: 'R-05', namaUser: 'Guru Budaya Dewi', role: 'Guru/Tenaga Pendidikan', susScore: 80, kategori: 'Baik', umpanBalik: 'Modul kelas desa dan literasi digital berjalan dengan lancar.' },
  { id: 'R-06', namaUser: 'Warga Rudi', role: 'Masyarakat Umum', susScore: 75, kategori: 'Baik', umpanBalik: 'Akses informasi desa dari HP lancar, tampilan sederhana dan responsif.' },
];

// Simulasi 56 Skenario Pengujian UAT (Daftar Sampel Utama Skenario yang Terlaksana)
const SKENARIO_UAT = [
  { id: 'UAT-SC-01', modul: 'Modul 1: Dashboard', deskripsi: 'Menampilkan widget visualisasi kesiapan, tingkat kematangan, dan kualitas hidup desa', peran: 'Masyarakat Umum', status: 'Berhasil', sus: 85, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-02', modul: 'Modul 2: Master Framework', deskripsi: 'Uji tambah framework baru dengan status Draf dan submit ke peninjau', peran: 'Administrator Sistem', status: 'Berhasil', sus: 88, masalah: 'Penulisan bobot desimal terlalu panjang', prioritas: 'Medium', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-03', modul: 'Modul 3: Versioning', deskripsi: 'Pemeriksaan riwayat versi kerangka lama (terkunci dari penghapusan)', peran: 'Administrator Sistem', status: 'Berhasil', sus: 90, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-04', modul: 'Modul 4: Periode', deskripsi: 'Uji coba penutupan periode dan pemblokiran edit data secara otomatis', peran: 'Administrator Sistem', status: 'Berhasil', sus: 84, masalah: 'Pesan error pemblokiran kurang spesifik', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-05', modul: 'Modul 5: Validasi Teknis', deskripsi: 'Pemeriksaan validasi format data, kolom wajib, dan duplikasi kode wilayah', peran: 'Administrator Sistem', status: 'Berhasil', sus: 87, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-06', modul: 'Modul 5: Validasi Substantif', deskripsi: 'Verifikasi kesesuaian data kesehatan oleh Tenaga Kesehatan', peran: 'Tenaga Kesehatan', status: 'Berhasil', sus: 89, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-07', modul: 'Modul 6: Integrasi Data', deskripsi: 'Sinkronisasi data real-time dengan API SID Nasional', peran: 'Administrator Sistem', status: 'Berhasil', sus: 86, masalah: 'Timeout API jika server pusat down', prioritas: 'High', penyelesaian: 'Selesai (Ditambahkan retry handler)' },
  { id: 'UAT-SC-08', modul: 'Modul 7: Tata Kelola', deskripsi: 'Konfigurasi hak akses kepemilikan data dan klasifikasi data rahasia', peran: 'Administrator Sistem', status: 'Berhasil', sus: 83, masalah: 'Istilah hak akses membingungkan', prioritas: 'Medium', penyelesaian: 'Selesai (Diterjemahkan ke Indonesia)' },
  { id: 'UAT-SC-09', modul: 'Modul 8: DSS KB', deskripsi: 'Uji CRUD basis pengetahuan dan aturan AHP-SAW', peran: 'Administrator Sistem', status: 'Berhasil', sus: 88, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-10', modul: 'Modul 9: DSS Rec', deskripsi: 'Uji coba monitoring rekomendasi alternatif program pembangunan desa', peran: 'Pemerintah Desa', status: 'Berhasil', sus: 80, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-11', modul: 'Modul 10: Evaluasi Artefak', deskripsi: 'Unggah laporan FGD kesiapan dan evaluasi kuesioner', peran: 'Tokoh Masyarakat', status: 'Berhasil', sus: 78, masalah: 'Loading upload file besar lambat', prioritas: 'Medium', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-12', modul: 'Modul 11: Validasi Pakar', deskripsi: 'Pakar mengisi nilai validitas instrumen penelitian', peran: 'Lembaga Adat', status: 'Berhasil', sus: 82, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-13', modul: 'Modul 12: UAT', deskripsi: 'Pengisian feedback kuesioner SUS langsung di sistem', peran: 'Masyarakat Umum', status: 'Berhasil', sus: 85, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-14', modul: 'Modul 13: Repositori', deskripsi: 'Uji coba unduh instrumen, laporan pengujian, dan metadata berkas', peran: 'Masyarakat Umum', status: 'Berhasil', sus: 81, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-15', modul: 'Modul 14: Manajemen User', deskripsi: 'Pembuatan akun baru dan penetapan 7 peran final', peran: 'Administrator Sistem', status: 'Berhasil', sus: 92, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-16', modul: 'Modul 14: Keamanan', deskripsi: 'Uji coba penguncian akun otomatis setelah 3x salah password', peran: 'Administrator Sistem', status: 'Berhasil', sus: 91, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-17', modul: 'Jejak Audit', deskripsi: 'Pencatatan tindakan penting pengguna ke dalam log audit', peran: 'Administrator Sistem', status: 'Berhasil', sus: 88, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-18', modul: 'Pencadangan', deskripsi: 'Simulasi pemulihan database terjadwal dan manual', peran: 'Administrator Sistem', status: 'Berhasil', sus: 89, masalah: 'Butuh konfirmasi ganda', prioritas: 'Medium', penyelesaian: 'Selesai' },
  { id: 'UAT-SC-19', modul: 'Notifikasi', deskripsi: 'Mengirim email notifikasi jika terjadi sinkronisasi gagal', peran: 'Administrator Sistem', status: 'Berhasil', sus: 87, masalah: 'Tidak ada', prioritas: 'Low', penyelesaian: 'Selesai' },
];

const totalSUS = RESPONDEN_DATA.reduce((acc, curr) => acc + curr.susScore, 0);
const rataRataSUS = totalSUS / RESPONDEN_DATA.length;

export default function UATResultsPage() {
  const [activeTab, setActiveTab] = useState<'skenario' | 'responden'>('skenario');

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Hasil UAT, SUS, dan Umpan Balik" modul="Penelitian &amp; Evaluasi" color={COLOR} />

      {/* Ringkasan SUS & UAT */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Rata-rata Skor SUS" value={rataRataSUS.toFixed(1)} satuan="dari skala 100" barColor="green" progress={rataRataSUS} />
        <StatCard label="Total Skenario UAT" value="56 Skenario" satuan="pengujian sistem" barColor="blue" progress={100} />
        <StatCard label="Status Keberhasilan" value="100%" satuan="seluruh skenario" barColor="purple" progress={100} />
        <StatCard label="Umpan Balik Pengguna" value={`${RESPONDEN_DATA.length} Peran`} satuan="responden aktif" barColor="orange" progress={85} />
      </div>

      {/* Tab Navigasi */}
      <div className="flex gap-2 border-b pb-2">
        <button
          onClick={() => setActiveTab('skenario')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'skenario' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span className="flex items-center gap-1.5"><Layers size={14} /> 56 Skenario Pengujian UAT ({SKENARIO_UAT.length} Sampel Utama)</span>
        </button>
        <button
          onClick={() => setActiveTab('responden')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'responden' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span className="flex items-center gap-1.5"><MessageSquare size={14} /> Hasil SUS &amp; Umpan Balik Per Peran</span>
        </button>
      </div>

      {activeTab === 'skenario' ? (
        /* Tabel 56 Skenario UAT */
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardList size={14} /> Detail Pengujian Skenario UAT (Total 56 Skenario Terlaksana)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto text-xs">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-700">Kode SC</TableHead>
                    <TableHead className="font-bold text-slate-700">Modul</TableHead>
                    <TableHead className="font-bold text-slate-700">Skenario Pengujian</TableHead>
                    <TableHead className="font-bold text-slate-700">Penguji (Peran)</TableHead>
                    <TableHead className="font-bold text-slate-700">Status</TableHead>
                    <TableHead className="font-bold text-slate-700">Nilai SUS</TableHead>
                    <TableHead className="font-bold text-slate-700">Masalah Antarmuka</TableHead>
                    <TableHead className="font-bold text-slate-700">Prioritas</TableHead>
                    <TableHead className="font-bold text-slate-700">Status Penyelesaian</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SKENARIO_UAT.map((sc) => (
                    <TableRow key={sc.id} className="hover:bg-slate-50/50">
                      <td className="font-mono font-bold text-slate-500 px-3 py-2.5">{sc.id}</td>
                      <td className="font-bold text-slate-700 px-3 py-2.5">{sc.modul}</td>
                      <td className="px-3 py-2.5 text-slate-600 max-w-[200px]" title={sc.deskripsi}>{sc.deskripsi}</td>
                      <td className="px-3 py-2.5 font-semibold text-slate-700">{sc.peran}</td>
                      <td className="px-3 py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                          {sc.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 font-mono font-bold text-indigo-700 text-center">{sc.sus}</td>
                      <td className="px-3 py-2.5 text-slate-500">{sc.masalah}</td>
                      <td className="px-3 py-2.5">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          sc.prioritas === 'High' ? 'bg-red-100 text-red-700' :
                          sc.prioritas === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {sc.prioritas}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 font-bold text-slate-700">{sc.penyelesaian}</td>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Hasil SUS & Umpan Balik Per Peran */
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Star size={14} /> Nilai SUS dan Umpan Balik Kualitatif Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto text-xs">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-700">ID</TableHead>
                    <TableHead className="font-bold text-slate-700">Nama Responden</TableHead>
                    <TableHead className="font-bold text-slate-700">Peran Pengguna</TableHead>
                    <TableHead className="font-bold text-slate-700">Skor SUS</TableHead>
                    <TableHead className="font-bold text-slate-700">Kategori</TableHead>
                    <TableHead className="font-bold text-slate-700">Umpan Balik</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {RESPONDEN_DATA.map((r) => (
                    <TableRow key={r.id} className="hover:bg-slate-50/50">
                      <TableCell className="font-mono font-bold text-slate-500">{r.id}</TableCell>
                      <TableCell className="font-bold text-slate-800">{r.namaUser}</TableCell>
                      <TableCell className="font-semibold text-indigo-750">{r.role}</TableCell>
                      <TableCell>
                        <span className={`font-black text-lg ${r.susScore >= 80 ? 'text-green-700' : 'text-blue-700'}`}>
                          {r.susScore}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border bg-green-50 text-green-700 border-green-200`}>
                          {r.kategori}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600 max-w-[300px] leading-normal">{r.umpanBalik}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interpretasi SUS */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Award size={14} /> Interpretasi Skor SUS (System Usability Scale)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs text-center">
            {[
              { range: '≥ 85', label: 'Excellent (Sangat Baik)', color: 'bg-green-100 text-green-850 border-green-200' },
              { range: '70 – 84', label: 'Good (Baik)', color: 'bg-blue-100 text-blue-850 border-blue-200' },
              { range: '50 – 69', label: 'OK (Cukup)', color: 'bg-amber-100 text-amber-850 border-amber-200' },
              { range: '25 – 49', label: 'Poor (Kurang)', color: 'bg-orange-100 text-orange-850 border-orange-200' },
              { range: '< 25', label: 'Awful (Sangat Kurang)', color: 'bg-red-100 text-red-850 border-red-200' },
            ].map((s, i) => (
              <div key={i} className={`p-2 rounded-lg border font-bold ${s.color}`}>
                <p className="text-base">{s.range}</p>
                <p className="text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg text-xs font-semibold text-indigo-900">
            📊 Rata-rata SUS APL-SLV Borneo: <strong>{rataRataSUS.toFixed(1)}</strong> — masuk kategori <strong>{rataRataSUS >= 85 ? 'Excellent' : 'Good'}</strong>. Semua 56 skenario UAT dinyatakan sukses terimplementasi.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
