'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Users, MapPin, Building2, Heart, GraduationCap, Globe, Landmark,
  ShieldCheck, RefreshCw, FileText, Lock, Eye, BarChart2
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

// Lintas Bidang: Kependudukan, Wilayah, Pemerintahan, Kesehatan, Pendidikan, Kebudayaan, Fasilitas, Program, Pelayanan, SDGs
const BIDANG_DATA = [
  { id: 'bd-1', nama: 'Kependudukan & Wilayah', ikon: <Users size={16} />, detail: '742 KK terbagi di 3 Dusun. Hubungan kepadatan penduduk dengan persebaran fasilitas publik.' },
  { id: 'bd-2', nama: 'Pemerintahan & Pelayanan', ikon: <Building2 size={16} />, detail: '100% layanan administratif terintegrasi secara digital dengan waktu respons rata-rata <24 jam.' },
  { id: 'bd-3', nama: 'Kesehatan & Fasilitas', ikon: <Heart size={16} />, detail: '3 Posyandu aktif mendukung program penanganan stunting nasional. Cakupan imunisasi 92%.' },
  { id: 'bd-4', nama: 'Pendidikan & Kebudayaan', ikon: <GraduationCap size={16} />, detail: 'SDN 01 Lung Anai berkolaborasi dengan Lembaga Adat dalam program kurikulum budaya Dayak Kenyah.' },
  { id: 'bd-5', nama: 'Program & SDGs Desa', ikon: <Globe size={16} />, detail: '9 Program pembangunan terikat langsung pada pencapaian target SDG Desa 3, 4, dan 18.' },
];

const HUBUNGAN_CROSS = [
  { dari: 'Wilayah & Kependudukan', ke: 'Fasilitas & Pelayanan', deskripsi: 'Peta konsentrasi warga Dusun B dan C digunakan untuk penentuan lokasi pembangunan booster internet desa.', status: 'Optimal' },
  { dari: 'Pendidikan & Kebudayaan', ke: 'Program Pembangunan', deskripsi: 'Program sekolah adat mendapatkan alokasi 10% ADD untuk pelestarian bahasa Dayak Kenyah.', status: 'Optimal' },
  { dari: 'Kesehatan & Program', ke: 'SDGs Desa 3', deskripsi: 'Program penambahan gizi ibu hamil Regsosek menurunkan angka stunting dari 18% ke 14%.', status: 'On Track' },
];

export default function DataDesaTerintegrasiPage() {
  const [selectedBidang, setSelectedBidang] = useState(BIDANG_DATA[0].id);
  const [authRequired, setAuthRequired] = useState(false);
  const [authKey, setAuthKey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleUnlockDataIndividu = () => {
    if (authKey === 'admin123') {
      setIsAuthorized(true);
      alert('🔓 Data individu berhasil dibuka berdasarkan kewenangan yang sah.');
    } else {
      alert('❌ Kunci Otorisasi salah! Data individu tetap terkunci.');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Desa Terintegrasi" modul="Pemerintah Desa" color={COLOR} />

      {/* PRIVACY WARNING BANNER */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Batasan Hak Akses Data Individu</p>
          <p className="text-amber-700 mt-0.5 font-medium leading-relaxed">
            Pemerintah Desa melihat data kesehatan dan pendidikan dalam <strong>bentuk agregat</strong>. Data individu (nama, riwayat medis, nilai siswa) hanya dapat dibuka apabila terdapat <strong>tugas, tujuan, dan kewenangan yang sah</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Bidang Terintegrasi" value={10} satuan="Kategori Lintas Bidang" barColor="blue" progress={100} />
        <StatCard label="SDGs Desa Terpenuhi" value="12/18" satuan="Indikator Tercapai" barColor="green" progress={67} />
        <StatCard label="Data Agregat" value="98%" satuan="Akurasi Data" barColor="purple" progress={98} />
        <StatCard label="Status Keamanan" value="Tinggi" satuan="Data Terenkripsi" barColor="orange" progress={90} />
      </div>

      {/* KONTEN UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* LINTAS BIDANG & HUBUNGAN */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Hubungan Lintas Bidang Data Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* TABS BIDANG */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {BIDANG_DATA.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBidang(b.id)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all text-[10px] font-bold ${selectedBidang === b.id ? 'border-indigo-400 bg-indigo-50/50 text-indigo-900 shadow-sm' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}
                >
                  {b.ikon}
                  <span>{b.nama}</span>
                </button>
              ))}
            </div>

            {/* DETAIL BIDANG */}
            <div className="p-3.5 bg-slate-50 border rounded-xl">
              <p className="font-bold text-slate-700 text-xs mb-1.5">Penjelasan Integrasi Data:</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {BIDANG_DATA.find(b => b.id === selectedBidang)?.detail}
              </p>
            </div>

            {/* TABEL HUBUNGAN LINTAS BIDANG */}
            <div>
              <p className="font-bold text-slate-700 text-xs mb-2">Tabel Hubungan Lintas Bidang:</p>
              <div className="overflow-x-auto rounded-lg border border-slate-100">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                    <tr>
                      <th className="p-2.5">Bidang A</th>
                      <th className="p-2.5">Bidang B</th>
                      <th className="p-2.5">Deskripsi Hubungan</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {HUBUNGAN_CROSS.map((h, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="p-2.5 font-bold text-slate-700">{h.dari}</td>
                        <td className="p-2.5 font-bold text-slate-700">{h.ke}</td>
                        <td className="p-2.5 text-slate-600 leading-snug">{h.deskripsi}</td>
                        <td className="p-2.5"><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700 whitespace-nowrap">{h.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* HAK AKSES DATA INDIVIDU PANEL */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Lock size={16} /> Akses Data Individu Terbatas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-slate-500 leading-relaxed">
              Data individu dilindungi undang-undang privasi. Untuk membuka data individu, masukkan Kunci Otorisasi yang sah dari Dinas PMD.
            </p>

            {isAuthorized ? (
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-xs space-y-2">
                  <div className="flex items-center gap-1.5 text-green-700 font-bold">
                    <ShieldCheck size={14} /> Akses Terbuka (Kewenangan Sah)
                  </div>
                  <p className="text-slate-600">Daftar siswa & rekam medis individu dapat diakses.</p>
                </div>
                <div className="divide-y divide-slate-200 text-xs">
                  <div className="py-2">
                    <p className="font-bold text-slate-800">Anak A (Dusun B)</p>
                    <p className="text-[10px] text-slate-400">Pendidikan: SDN 01 • Kesehatan: Stunting Ringan</p>
                  </div>
                  <div className="py-2">
                    <p className="font-bold text-slate-800">Anak B (Dusun A)</p>
                    <p className="text-[10px] text-slate-400">Pendidikan: PAUD Adat • Kesehatan: Sehat</p>
                  </div>
                </div>
                <button onClick={() => setIsAuthorized(false)} className="w-full py-2 bg-slate-200 text-slate-600 font-bold hover:bg-slate-300 rounded-lg text-xs">
                  Kunci Kembali Data
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500">KUNCI OTORISASI DINAS:</label>
                  <input
                    type="password"
                    value={authKey}
                    onChange={e => setAuthKey(e.target.value)}
                    placeholder="Masukkan kunci (coba: admin123)..."
                    className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300 text-xs"
                  />
                </div>
                <button
                  onClick={handleUnlockDataIndividu}
                  className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5"
                >
                  <Eye size={13} /> Buka Data Individu
                </button>
              </div>
            )}
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Terintegrasi dengan SDGs Desa dan Regsosek Kemendagri</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
