'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { MapPin, Landmark, ShieldCheck } from 'lucide-react';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#2e7d32';

export default function InformasiDesaPage() {
  const lungAnai = DESA_BAB4[2];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Informasi Desa (Tabel 4.3 Bab IV)" modul="Masyarakat Umum" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Seluruh data profil dan statistik di bawah mengacu pada publikasi resmi <strong>BPS Kabupaten Kutai Kartanegara (2025)</strong> (kondisi 2024) dan hasil penelitian Bab IV pada 3 desa penelitian.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Penduduk Lung Anai" value={`${lungAnai.penduduk} Jiwa`} satuan={`${lungAnai.kk} KK · ${lungAnai.rt} RT`} barColor="purple" progress={100} />
        <StatCard label="Luas Wilayah" value={`${lungAnai.luasKm2.toFixed(2)} km²`} satuan="Kec. Loa Kulu" barColor="green" progress={100} />
        <StatCard label="Skor Kesiapan SLV" value={lungAnai.skorKesiapan.toFixed(2).replace('.', ',')} satuan={`${lungAnai.kategoriKesiapan} (D5 Adat: 89,73)`} barColor="orange" progress={48} />
        <StatCard label="Wilayah Administrasi" value="Kab. Kutai Kartanegara" satuan="Provinsi Kalimantan Timur" barColor="blue" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Landmark size={14} className="text-indigo-700" /> Profil 3 Desa Penelitian Smart Living Village (Bab IV)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 leading-relaxed text-slate-700">
            <p>
              <strong>Desa Lung Anai</strong> terletak di Kecamatan Loa Kulu, Kabupaten Kutai Kartanegara, Provinsi Kalimantan Timur. Mayoritas penduduknya merupakan masyarakat <strong>Dayak Kenyah</strong> dan telah ditetapkan sebagai <strong>Desa Budaya sejak 2007</strong> dengan kekuatan utama pada dimensi partisipasi dan tata kelola adat (D5 = 89,73).
            </p>
            <p>
              Dalam implementasi <strong>Smart Living Village (SLV)</strong>, Desa Lung Anai bersama <strong>Desa Jonggon Jaya</strong> dan <strong>Desa Kedang Ipil</strong> memfokuskan layanan publik terpadu pada kesehatan (SDG Desa 3), pendidikan dan literasi digital (SDG Desa 4), serta kelembagaan dan pelestarian budaya adat (SDG Desa 18).
            </p>

            <div className="border-t pt-4 space-y-2.5">
              <p className="font-bold text-slate-800 text-xs">Ringkasan 3 Desa Penelitian (Tabel 4.3 &amp; 4.16):</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {DESA_BAB4.map((d) => (
                  <div key={d.id} className="p-2.5 border rounded-lg bg-slate-50 space-y-1">
                    <p className="font-bold text-slate-800">{d.nama}</p>
                    <p className="text-[10px] text-slate-500">Kec. {d.kecamatan}</p>
                    <p className="text-[10px] text-slate-600">{d.luasKm2.toFixed(2)} km² · {d.penduduk.toLocaleString('id-ID')} jiwa · {d.rt} RT</p>
                    <p className="text-[10px] font-bold text-emerald-700">Kesiapan: {d.skorKesiapan.toFixed(2)} ({d.kategoriKesiapan})</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="py-2.5">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <MapPin size={13} className="text-red-500" /> Akses Wilayah (Tabel 4.3)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Ke Ibu Kota Kecamatan</span>
                <span className="font-bold text-slate-800">±28 km (Loa Kulu)</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Ke Ibu Kota Kabupaten</span>
                <span className="font-bold text-slate-800">±33 km (Tenggarong)</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Status Budaya</span>
                <span className="font-bold text-slate-800">Desa Budaya (2007)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Strategi Layanan</span>
                <span className="font-bold text-emerald-700">Mode Luring-Utama</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-2.5">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Kontak &amp; Layanan Publik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 leading-normal">
              <p className="font-bold text-slate-800">Kantor &amp; Balai Desa Lung Anai</p>
              <p className="text-slate-500">Kecamatan Loa Kulu, Kab. Kutai Kartanegara, Kalimantan Timur</p>
              <p className="text-slate-500">Email: layanan@borneo.id</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
