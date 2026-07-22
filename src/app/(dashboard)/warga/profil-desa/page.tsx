'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { 
  Map, Users, Home, Shield, Award, HelpCircle, 
  MapPin, CheckCircle2, AlertTriangle, RefreshCw, Landmark, Building2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLOR = '#6a1b9a';

const demographicData = [
  { kelompok: 'Balita (0-5 th)', jumlah: 145 },
  { kelompok: 'Anak (6-12 th)', jumlah: 198 },
  { kelompok: 'Remaja (13-18 th)', jumlah: 167 },
  { kelompok: 'Dewasa (19-59 th)', jumlah: 512 },
  { kelompok: 'Lansia (60+ th)', jumlah: 94 },
];

const facilities = [
  { nama: 'Balai Pertemuan Adat', tipe: 'Sosial Budaya', kondisi: 'Sangat Baik' },
  { nama: 'Kantor Kepala Desa', tipe: 'Pemerintahan', kondisi: 'Baik' },
  { nama: 'Poskesdes Lung Anai', tipe: 'Kesehatan', kondisi: 'Baik' },
  { nama: 'SD Negeri Adat Lung Anai', tipe: 'Pendidikan', kondisi: 'Cukup' },
  { nama: 'Huma Betang Pintar (LMS)', tipe: 'Pendidikan/Digital', kondisi: 'Baik' },
];

export default function ProfilDesaPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Profil dan Kondisi Desa" modul="Tokoh Masyarakat" color={COLOR} />

      {/* READ ONLY BANNER */}
      <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold flex items-start gap-2.5 shadow-sm">
        <Shield size={16} className="text-purple-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Akses Terbatas: Data Publik & Agregat</p>
          <p className="text-purple-600 mt-0.5 font-medium leading-relaxed">
            Sebagai Tokoh Masyarakat, Anda hanya diperkenankan melihat data publik desa dan statistik kependudukan secara agregat demi menjaga privasi dan keamanan data pribadi penduduk.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Luas Wilayah" value="4.820" satuan="Hektar" barColor="purple" progress={100} />
        <StatCard label="Total Penduduk" value="1.116" satuan="Jiwa (Agregat)" barColor="blue" progress={100} />
        <StatCard label="Jumlah Keluarga" value="342" satuan="KK" barColor="orange" progress={100} />
        <StatCard label="Kerapatan Adat" value="100%" satuan="Sangat Kuat" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* WILAYAH GEOGRAFIS */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <MapPin size={16} /> Profil Wilayah Geografis
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-3.5">
            <div className="p-3 bg-slate-50 rounded-lg space-y-2 border border-slate-100">
              <p className="font-bold text-slate-700">Letak & Batas Administratif:</p>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li><b>Utara:</b> Hutan Lindung Adat</li>
                <li><b>Selatan:</b> Desa Loa Kulu Kota</li>
                <li><b>Timur:</b> Sungai Mahakam</li>
                <li><b>Barat:</b> Area Perkebunan Masyarakat</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-slate-700">Topografi & Pemanfaatan Lahan:</p>
              <p className="text-slate-600 leading-relaxed">
                Wilayah berbukit-bukit dengan 65% area merupakan hutan adat dan konservasi, 25% area pertanian/perkebunan, dan 10% sisanya permukiman warga Dusun Adat Lung Anai.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* DEMOGRAFI AGREGAT */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Penduduk dan Keluarga Secara Agregat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="kelompok" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                  <Bar dataKey="jumlah" fill="#6a1b9a" radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 italic">
              Grafik distribusi kelompok usia warga Desa Adat Lung Anai (Agregat SID 2026)
            </p>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* FASILITAS & LAYANAN PUBLIK */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Building2 size={16} /> Fasilitas Desa & Kondisi Fisik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5">Nama Sarana Fasilitas</th>
                    <th className="p-2.5">Tipe Layanan</th>
                    <th className="p-2.5">Kondisi Fisik</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {facilities.map((fac, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-semibold">{fac.nama}</td>
                      <td className="p-2.5">{fac.tipe}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          fac.kondisi === 'Sangat Baik' ? 'bg-green-50 text-green-700' :
                          fac.kondisi === 'Baik' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                        }`}>{fac.kondisi}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* KELEMBAGAAN & KELOMPOK */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} /> Kelembagaan & Kelompok Adat
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-3 text-slate-600">
            <div className="space-y-1.5">
              <p className="font-bold text-slate-700">Lembaga Formal & Adat:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Pemerintah Desa Lung Anai</li>
                <li>Badan Permusyawaratan Desa (BPD)</li>
                <li>Lembaga Adat Dayak Kenyah</li>
                <li>Lembaga Pemberdayaan Masyarakat (LPM)</li>
              </ul>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <p className="font-bold text-slate-700">Kelompok Kemasyarakatan:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Kelompok Tani Anyaman Rotan</li>
                <li>Karang Taruna Dayak Borneo</li>
                <li>Pemberdayaan Kesejahteraan Keluarga (PKK)</li>
                <li>Kelompok Sadar Wisata Budaya</li>
              </ul>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* POTENSI & MASALAH UTAMA */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Potensi Utama Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-3 text-slate-600">
            <div className="flex gap-3 items-start p-2.5 bg-green-50/50 rounded-lg border border-green-100">
              <CheckCircle2 size={16} className="text-green-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-900">Wisata Budaya & Seni Adat</p>
                <p className="mt-0.5 text-green-700 leading-normal">Desa Lung Anai memiliki daya tarik wisata budaya Dayak Kenyah yang kuat dengan festival tahunan adat Hudoq.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-2.5 bg-green-50/50 rounded-lg border border-green-100">
              <CheckCircle2 size={16} className="text-green-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-900">Kerajinan Tangan Khas Adat</p>
                <p className="mt-0.5 text-green-700 leading-normal">Produksi kerajinan anyaman rotan dan baju manik adat oleh kelompok wanita tani memiliki potensi ekonomi kreatif tinggi.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Masalah Utama & Hambatan
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-3 text-slate-600">
            <div className="flex gap-3 items-start p-2.5 bg-red-50/50 rounded-lg border border-red-100">
              <AlertTriangle size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900">Blank Spot / Lemah Jaringan Internet</p>
                <p className="mt-0.5 text-red-700 leading-normal">Di beberapa dusun terluar, jaringan internet dan infrastruktur digital belum terjangkau dengan baik, menghambat literasi digital.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-2.5 bg-red-50/50 rounded-lg border border-red-100">
              <AlertTriangle size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900">Kondisi Jalan Poros Rusak</p>
                <p className="mt-0.5 text-red-700 leading-normal">Jalan poros utama penghubung desa ke pusat kota mengalami kerusakan fisik di beberapa titik, menyulitkan mobilitas warga dan logistik.</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* FOOTER WAKTU PEMBARUAN */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50 mt-1">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Sumber Data: Integrasi SID (Sistem Informasi Desa) Adat Lung Anai</span>
        <span>Waktu Pembaruan Terakhir: 18 Juli 2026, 14:03 WITA</span>
      </div>

    </div>
  );
}
