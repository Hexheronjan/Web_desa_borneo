'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Info, Edit, RefreshCw, FileText, Upload, CheckCircle2, History } from 'lucide-react';

const COLOR = '#1565c0';

export default function ProfilPendidikanDesaPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Profil Pendidikan Desa" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Satuan Pendidikan" value="3" satuan="Sekolah (PAUD, SD, SMP)" barColor="blue" progress={100} />
        <StatCard label="Jumlah Tenaga Kependidikan" value="22" satuan="Orang" barColor="green" progress={80} />
        <StatCard label="Kelompok Sasaran Literasi" value="134" satuan="Siswa" barColor="orange" progress={90} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* KIRI: Informasi Profil & Kondisi (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="py-3 border-b flex flex-row justify-between items-center">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase">Profil Satuan Pendidikan</CardTitle>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 bg-blue-700 text-white px-2.5 py-1 rounded-lg font-bold hover:bg-blue-800 transition-colors">
                  <Edit size={12} /> Perbarui Profil
                </button>
                <button className="flex items-center gap-1 bg-slate-100 border text-slate-700 px-2.5 py-1 rounded-lg font-bold hover:bg-slate-200 transition-colors">
                  <History size={12} /> Lihat Riwayat
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">SDN 006 Lung Anai</h4>
                  <p className="text-slate-500">Jenis: Sekolah Dasar | Status: Negeri</p>
                  <p className="text-slate-500 mt-1">Kontak: sdn006lunganai@desa.mail.id</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">SMP Filial Lung Anai</h4>
                  <p className="text-slate-500">Jenis: Sekolah Menengah Pertama | Status: Negeri</p>
                  <p className="text-slate-500 mt-1">Kontak: smpfiliallunganai@desa.mail.id</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs mb-2">Kondisi Sarana &amp; Prasarana</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg border">
                    <p className="text-slate-450 font-bold">Ruang Belajar</p>
                    <p className="text-slate-800 font-bold mt-0.5">8 Kelas (Baik)</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border">
                    <p className="text-slate-450 font-bold">Perangkat Komputer</p>
                    <p className="text-slate-800 font-bold mt-0.5">15 Unit (Aktif)</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border">
                    <p className="text-slate-450 font-bold">Akses Internet</p>
                    <p className="text-slate-850 font-bold mt-0.5">VSAT 20 Mbps</p>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border">
                    <p className="text-slate-450 font-bold">Perpustakaan</p>
                    <p className="text-slate-800 font-bold mt-0.5">1 Unit (Cukup)</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs mb-2">Kondisi Akses Sekolah</h4>
                <div className="p-3 bg-blue-50/30 rounded-lg border border-blue-100 space-y-1.5">
                  <p><strong>Jarak &amp; Konektivitas:</strong> Rata-rata jarak rumah siswa ke sekolah adalah 1.5 km dengan konektivitas jalan berbatu.</p>
                  <p><strong>Transportasi:</strong> Sebagian besar siswa berjalan kaki atau menggunakan sepeda.</p>
                  <p><strong>Hambatan Utama:</strong> Cuaca hujan ekstrem dapat menggenangi beberapa ruas jalan akses.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KANAN: Verifikasi & Aksi Tambahan (1/3) */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase">Aksi Validasi Profil</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <button className="w-full flex items-center justify-center gap-1.5 bg-green-700 text-white py-2 rounded-lg font-bold hover:bg-green-800 transition-colors">
                <Upload size={13} /> Unggah Bukti Sarpras
              </button>
              <button className="w-full flex items-center justify-center gap-1.5 border text-slate-750 py-2 rounded-lg font-bold hover:bg-slate-50 transition-colors">
                <CheckCircle2 size={13} /> Ajukan Verifikasi Profil
              </button>

              <div className="border-t pt-3 mt-3">
                <h4 className="font-bold text-slate-800 text-[10px] uppercase mb-1">Riwayat Pembaruan Terakhir</h4>
                <div className="text-[10px] text-slate-500 space-y-1">
                  <div><strong>Tanggal:</strong> 18 Juli 2026</div>
                  <div><strong>Pengubah:</strong> Guru Fasilitator</div>
                  <div><strong>Sumber:</strong> Dapodik &amp; Observasi Fisik</div>
                  <div><strong>Verifikator:</strong> Kepala Sekolah / Pengawas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
