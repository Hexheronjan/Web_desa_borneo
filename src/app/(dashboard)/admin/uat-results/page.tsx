'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClipboardList, Star, MessageSquare, ShieldAlert, Award, Layers, Activity } from 'lucide-react';
import { DESA_BAB4, EVALUASI_PER_PERAN_BAB4, LOG_4_MINGGU_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a237e';

const KELOMPOK_FITUR_UAT = [
  { kode: 'F-001 – F-005', peran: 'Administrator Sistem', cakupan: 'Pengguna & akses (RBAC), operasi sistem, integrasi, kualitas data, audit & keamanan', status: 'Lulus Demonstrasi', uat: '88,89%', catatan: 'Terlacak ke W-001–W-005 & 4 diagram UML' },
  { kode: 'F-006 – F-010', peran: 'Pemerintah Desa', cakupan: 'Penilaian kesiapan/kematangan, pemantauan SDGs 3/4/18, DSS SAW, musyawarah & aspirasi', status: 'Lulus Demonstrasi', uat: '87,50%', catatan: 'Terlacak ke W-006–W-010; keputusan tetap melalui musyawarah' },
  { kode: 'F-011 – F-015', peran: 'Lembaga Adat', cakupan: 'Persetujuan data budaya, klasifikasi, verifikasi, pemantauan SDG 18, dan musyawarah adat', status: 'Lulus Demonstrasi', uat: '86,81%', catatan: 'Terlacak ke W-011–W-015; kontrol akses data budaya aktif' },
  { kode: 'F-016 – F-020', peran: 'Tokoh Masyarakat', cakupan: 'Aspirasi, kebutuhan warga, agenda, pengawasan program, dan informasi publik', status: 'Lulus Demonstrasi', uat: '84,72%', catatan: 'Terlacak ke W-016–W-020; akses agregat read-only' },
  { kode: 'F-021 – F-025', peran: 'Guru/Tenaga Pendidikan', cakupan: 'Data pendidikan, SDG 4, literasi digital, kompetensi pendidik, program & rekomendasi', status: 'Lulus (Perlu Pendampingan)', uat: '79,86%', catatan: 'Terlacak ke W-021–W-025; prioritas panduan tugas & literasi' },
  { kode: 'F-026 – F-030', peran: 'Tenaga Kesehatan', cakupan: 'Data kesehatan, SDG 3, pelayanan, stunting/ANC, program, dan DSS kesehatan', status: 'F-029 Perlu Perbaikan & Retest', uat: '91,30%', catatan: 'F-029 (validasi data agregat kesehatan) belum dinyatakan lulus sebelum retest' },
  { kode: 'F-031 – F-035', peran: 'Masyarakat Umum', cakupan: 'Dasbor publik, layanan prioritas, aspirasi, forum, agenda, dan status usulan', status: 'Lulus Demonstrasi', uat: '87,96%', catatan: 'Terlacak ke W-031–W-035; kanal aspirasi & status tindak lanjut' },
];

export default function UATResultsPage() {
  const [activeTab, setActiveTab] = useState<'peran' | 'fitur' | 'log'>('peran');

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Hasil UAT, SUS, dan Log Penggunaan 4 Minggu (RQ3 — Bab IV)" modul="Penelitian &amp; Evaluasi" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <ShieldAlert size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          ⚠️ <strong>Status Evaluasi Dataset SLV 3 v1.2 (Bab IV, Tabel 4.35–4.38):</strong> Dari <strong>1.008 catatan UAT</strong> (126 partisipan × 8 tugas; 966 tugas relevan, 42 tidak relevan), sebanyak <strong>837 tugas berhasil (86,65%)</strong>. Fitur <strong>F-029 (validasi data agregat kesehatan)</strong> masih berstatus <strong>perlu perbaikan dan uji ulang (retest)</strong> sebelum dinyatakan lulus penuh.
        </p>
      </div>

      {/* Ringkasan SUS, Kualitas & UAT sesuai Bab IV */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Rata-rata Skor SUS" value="67,58" satuan="dari 100 (α = 0,955)" barColor="blue" progress={67.58} />
        <StatCard label="Kelulusan Tugas UAT" value="86,65%" satuan="837 / 966 tugas relevan" barColor="green" progress={86.65} />
        <StatCard label="Kualitas Total (1–5)" value="3,39" satuan="Sis 3,39 · Info 3,39 · Lay 3,39 (α=0,984)" barColor="purple" progress={67.8} />
        <StatCard label="Partisipan Evaluasi" value="126 Orang" satuan="3 Desa × 42 · 7 Peran × 18" barColor="orange" progress={100} />
      </div>

      {/* Tab Navigasi */}
      <div className="flex gap-2 border-b pb-2 flex-wrap">
        <button
          onClick={() => setActiveTab('peran')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'peran' ? 'bg-indigo-700 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span className="flex items-center gap-1.5"><MessageSquare size={14} /> Evaluasi 7 Peran Sistem (Tabel 4.37)</span>
        </button>
        <button
          onClick={() => setActiveTab('fitur')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'fitur' ? 'bg-indigo-700 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span className="flex items-center gap-1.5"><Layers size={14} /> Keterlacakan 35 Kelompok Fitur (F-001–F-035)</span>
        </button>
        <button
          onClick={() => setActiveTab('log')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'log' ? 'bg-indigo-700 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span className="flex items-center gap-1.5"><Activity size={14} /> Log Penggunaan 4 Minggu (504 Catatan — Tabel 4.34)</span>
        </button>
      </div>

      {activeTab === 'peran' && (
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Star size={14} /> Ringkasan Evaluasi Menurut 7 Peran Sistem (N = 126; 18 Partisipan/Peran)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto text-xs">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-700">Peran Sistem (UML)</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">N Lengkap</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Kualitas Total (1–5)</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Skor SUS (0–100)</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Kelulusan UAT</TableHead>
                    <TableHead className="font-bold text-slate-700">Catatan Evaluasi Bab IV</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EVALUASI_PER_PERAN_BAB4.map((r) => (
                    <TableRow key={r.peran} className="hover:bg-slate-50/50">
                      <TableCell className="font-bold text-slate-800">{r.peran}</TableCell>
                      <TableCell className="text-center font-mono font-bold text-slate-600">{r.n}</TableCell>
                      <TableCell className="text-center font-mono font-bold text-indigo-700">{r.kualitasTotal.toFixed(2)}</TableCell>
                      <TableCell className="text-center font-mono font-black text-blue-700">{r.sus.toFixed(2)}</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.uat >= 85 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {r.uat.toFixed(2)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-600 max-w-xs">{r.catatan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'fitur' && (
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ClipboardList size={14} /> Pemetaan 35 Kelompok Fitur Prototipe Web &amp; Status Pengujian (Tabel 4.29)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto text-xs">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-700">Kode Fitur</TableHead>
                    <TableHead className="font-bold text-slate-700">Peran Pengguna</TableHead>
                    <TableHead className="font-bold text-slate-700">Cakupan Fungsi Inti</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">UAT Peran</TableHead>
                    <TableHead className="font-bold text-slate-700">Status</TableHead>
                    <TableHead className="font-bold text-slate-700">Catatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {KELOMPOK_FITUR_UAT.map((f) => (
                    <TableRow key={f.kode} className="hover:bg-slate-50/50">
                      <TableCell className="font-mono font-bold text-indigo-700 whitespace-nowrap">{f.kode}</TableCell>
                      <TableCell className="font-bold text-slate-800 whitespace-nowrap">{f.peran}</TableCell>
                      <TableCell className="text-slate-600 max-w-xs">{f.cakupan}</TableCell>
                      <TableCell className="text-center font-mono font-bold text-slate-800">{f.uat}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${
                          f.status.includes('F-029') ? 'bg-red-100 text-red-700' :
                          f.status.includes('Pendampingan') ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-700'
                        }`}>
                          {f.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-500 max-w-xs">{f.catatan}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'log' && (
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={14} /> Perkembangan Penggunaan Terstruktur Selama Empat Minggu (Tabel 4.34)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto text-xs">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-bold text-slate-700">Periode</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Direncanakan</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Selesai</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Tingkat Penyelesaian</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Kesalahan</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Kebutuhan Bantuan</TableHead>
                    <TableHead className="font-bold text-slate-700">Tahap Pelaksanaan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {LOG_4_MINGGU_BAB4.map((l) => (
                    <TableRow key={l.periode}>
                      <TableCell className="font-bold text-slate-800">{l.periode}</TableCell>
                      <TableCell className="text-center font-mono">{l.direncanakan}</TableCell>
                      <TableCell className="text-center font-mono font-bold text-indigo-700">{l.selesai}</TableCell>
                      <TableCell className="text-center font-mono font-black text-emerald-700">{l.tingkat.toFixed(2)}%</TableCell>
                      <TableCell className="text-center font-mono text-red-600 font-bold">{l.kesalahan}</TableCell>
                      <TableCell className="text-center font-mono text-amber-700 font-bold">{l.bantuan}</TableCell>
                      <TableCell className="text-slate-600">{l.tahap}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-indigo-50 font-bold">
                    <TableCell>Total (4 Minggu)</TableCell>
                    <TableCell className="text-center font-mono">1.008</TableCell>
                    <TableCell className="text-center font-mono text-indigo-800">915</TableCell>
                    <TableCell className="text-center font-mono text-emerald-800">90,77%</TableCell>
                    <TableCell className="text-center font-mono text-red-700">142</TableCell>
                    <TableCell className="text-center font-mono text-amber-800">194</TableCell>
                    <TableCell>Waktu aktif turun 3.051 → 1.942 menit; luring Lung Anai 2.928 menit</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ringkasan per Desa (Tabel 4.36) */}
      <Card>
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Award size={14} /> Kualitas, SUS, dan UAT Menurut Desa Penelitian (Tabel 4.36)
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {DESA_BAB4.map((d) => (
              <div key={d.id} className="p-3 rounded-xl border bg-slate-50/70 space-y-1">
                <p className="font-black text-slate-800">{d.nama} <span className="font-normal text-slate-500">({d.kecamatan})</span></p>
                <div className="flex gap-3 text-[11px] pt-1">
                  <span>Kualitas: <strong className="text-indigo-700">{d.evaluasiRQ3.kualitasTotal.toFixed(2)}</strong></span>
                  <span>SUS: <strong className="text-blue-700">{d.evaluasiRQ3.sus.toFixed(2)}</strong></span>
                  <span>UAT: <strong className="text-emerald-700">{d.evaluasiRQ3.uat.toFixed(2)}%</strong></span>
                </div>
                <p className="text-[10px] text-slate-500">Waktu luring 4 minggu: <strong>{d.evaluasiRQ3.waktuLuringMenit.toLocaleString('id-ID')} menit</strong></p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg text-xs font-semibold text-indigo-900">
            📊 Reliabilitas Internal (Tabel 4.38, N=126): Kualitas Sistem α = <strong>0,947</strong> · Informasi α = <strong>0,947</strong> · Layanan α = <strong>0,945</strong> · Kualitas Total α = <strong>0,984</strong> · SUS α = <strong>0,955</strong> (seluruhnya ≥ 0,70).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
