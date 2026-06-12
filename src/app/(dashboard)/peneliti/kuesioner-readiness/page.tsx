'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { CheckCircle2, Search, Filter } from 'lucide-react';

const COLOR = '#37474f';

const questions = [
  // Governance
  { no: 1, dim: 'Governance', text: 'Ketersediaan regulasi tertulis mengenai kedamangan adat & desa.', bobot: '4%', skor: '4.5' },
  { no: 2, dim: 'Governance', text: 'Transparansi pelaporan keuangan APBDesa kepada BPD.', bobot: '4%', skor: '4.0' },
  { no: 3, dim: 'Governance', text: 'Keaktifan rapat koordinasi berkala pemerintah desa.', bobot: '4%', skor: '3.8' },
  { no: 4, dim: 'Governance', text: 'Partisipasi warga dalam forum musyawarah perencanaan desa.', bobot: '4%', skor: '3.7' },
  { no: 5, dim: 'Governance', text: 'Kecepatan respon penanganan pengaduan aduan warga.', bobot: '4%', skor: '3.9' },
  // Technology
  { no: 6, dim: 'Technology', text: 'Ketersediaan perangkat keras server SID di kantor desa.', bobot: '4%', skor: '3.5' },
  { no: 7, dim: 'Technology', text: 'Kecepatan bandwidth internet VSAT di balai desa.', bobot: '4%', skor: '3.2' },
  { no: 8, dim: 'Technology', text: 'Kemampuan operator desa mengoperasikan portal SID.', bobot: '4%', skor: '3.8' },
  { no: 9, dim: 'Technology', text: 'Keandalan backup data server berkala otomatis.', bobot: '4%', skor: '3.0' },
  { no: 10, dim: 'Technology', text: 'Ketersediaan UPS cadangan daya kelistrikan server.', bobot: '4%', skor: '2.5' },
  // Infrastructure
  { no: 11, dim: 'Infrastructure', text: 'Akses jalan desa beraspal / layak dilewati roda 4.', bobot: '4%', skor: '3.9' },
  { no: 12, dim: 'Infrastructure', text: 'Jaringan listrik PLN menjangkau seluruh RT.', bobot: '4%', skor: '4.2' },
  { no: 13, dim: 'Infrastructure', text: 'Ketersediaan sarana air bersih layak minum (filtrasi).', bobot: '4%', skor: '4.4' },
  { no: 14, dim: 'Infrastructure', text: 'Jumlah posyandu aktif KIA terdistribusi merata.', bobot: '4%', skor: '4.5' },
  { no: 15, dim: 'Infrastructure', text: 'Kondisi fisik gedung Balai Belajar & Balai Adat.', bobot: '4%', skor: '4.0' },
  // Human Capital
  { no: 16, dim: 'Human Capital', text: 'Tingkat pendidikan minimal aparat perangkat desa.', bobot: '4%', skor: '3.8' },
  { no: 17, dim: 'Human Capital', text: 'Rasio ketersediaan bidan desa dengan jumlah balita.', bobot: '4%', skor: '4.2' },
  { no: 18, dim: 'Human Capital', text: 'Tingkat literasi komputer dasar guru sekolah dasar.', bobot: '4%', skor: '3.3' },
  { no: 19, dim: 'Human Capital', text: 'Keikutsertaan kader PKK dalam pelatihan Posyandu.', bobot: '4%', skor: '4.0' },
  { no: 20, dim: 'Human Capital', text: 'Tingkat penguasaan TIK dasar oleh remaja desa.', bobot: '4%', skor: '3.0' },
  // Culture
  { no: 21, dim: 'Culture', text: 'Kondisi keaslian arsitektur Rumah Adat Huma Betang.', bobot: '4%', skor: '4.3' },
  { no: 22, dim: 'Culture', text: 'Ketersediaan arsip digital silsilah & sejarah Dayak.', bobot: '4%', skor: '3.9' },
  { no: 23, dim: 'Culture', text: 'Konsistensi pelaksanaan ritual keagamaan Kaharingan.', bobot: '4%', skor: '4.5' },
  { no: 24, dim: 'Culture', text: 'Kepatuhan warga terhadap sanksi hukum adat Kedamangan.', bobot: '4%', skor: '4.7' },
  { no: 25, dim: 'Culture', text: 'Keterlibatan pemuda dalam sanggar kesenian tradisional.', bobot: '4%', skor: '3.4' }
];

export default function KuesionerReadinessPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Kuesioner Readiness Assessment" modul="Readiness Assessment" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Kuesioner" value={25} satuan="pertanyaan evaluasi" barColor="blue" progress={100} />
        <StatCard label="Readiness Score" value="75.20" satuan="skor akhir" barColor="teal" progress={75} />
        <StatCard label="Bobot Per Soal" value="4.0%" satuan="merata" barColor="green" progress={100} />
        <StatCard label="Jumlah Responden" value={146} satuan="warga terlibat" barColor="purple" progress={90} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle2 size={16} /> Lembar Penilaian Kesiapan (Readiness) Smart Living Village
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">Dimensi Aspek</th>
                    <th className="pb-2 pr-4">Pertanyaan Evaluasi Kesiapan</th>
                    <th className="pb-2 pr-4 text-right">Bobot</th>
                    <th className="pb-2 text-right">Rerata Skor (1.0 - 5.0)</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q, i) => (
                    <tr key={q.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{q.no}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          q.dim === 'Governance' ? 'bg-indigo-100 text-indigo-700' :
                          q.dim === 'Technology' ? 'bg-blue-100 text-blue-700' :
                          q.dim === 'Infrastructure' ? 'bg-purple-100 text-purple-700' :
                          q.dim === 'Human Capital' ? 'bg-teal-100 text-teal-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {q.dim}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 text-slate-700 text-xs md:text-sm leading-relaxed">{q.text}</td>
                      <td className="py-2.5 pr-4 text-right text-slate-500 font-mono text-xs">{q.bobot}</td>
                      <td className="py-2.5 text-right font-bold font-mono text-xs text-slate-800">{q.skor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
