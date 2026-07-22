'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  MapPin, Building2, Users, Phone, Mail, Edit, Save, History, Landmark,
  ShieldCheck, Upload, RefreshCw, Plus, CheckCircle2, AlertTriangle, FileText
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

interface Riwayat {
  tgl: string;
  user: string;
  perubahan: string;
  status: string;
}

export default function ProfilDesaPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [submittedVerifikasi, setSubmittedVerifikasi] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  
  // Data Profil Desa sesuai ketentuan revisi 2
  const [formData, setFormData] = useState({
    // 1. Identitas Desa
    namaDesa: 'Desa Adat Lung Anai',
    kodeDesa: '6201010001',
    kodePos: '74311',
    tahunBentuk: '1985',
    telepon: '(0536) 234567',
    email: 'admin@lunganai.id',
    visi: 'Mewujudkan Desa Adat Lung Anai yang Berdaulat, Berbudaya, dan Sejahtera melalui Penerapan Smart Living Village berbasis Kearifan Lokal Dayak Borneo',
    misi: '1. Melestarikan budaya adat Dayak Borneo melalui dokumentasi dan revitalisasi Huma Betang\n2. Meningkatkan kualitas hidup masyarakat melalui pemanfaatan teknologi digital\n3. Tata kelola desa yang transparan dan akuntabel',
    
    // 2. Wilayah dan Dusun
    luasWilayah: '125.5',
    batasUtara: 'Desa Tumbang Kalang',
    batasSelatan: 'Desa Teluk Nyulo',
    jumlahDusun: '3 Dusun (Dusun A, Dusun B, Dusun C)',
    jumlahRT: '12 RT',
    
    // 3. Jumlah Penduduk dan Keluarga
    jumlahPenduduk: '2847',
    jumlahKeluarga: '742',
    kepadatan: '22.6 jiwa/km²',
    
    // 4. Kelembagaan
    lembagaPemerintah: 'Pemerintah Desa, BPD, Lembaga Adat, LPM, Karang Taruna, PKK',
    
    // 5. Sarana Kesehatan
    saranaKesehatan: '1 Puskesmas Pembantu (Pustu), 3 Posyandu Balita & Lansia',
    
    // 6. Sarana Pendidikan
    saranaPendidikan: '1 SDN Lung Anai, 1 PAUD Adat, 1 Taman Bacaan Masyarakat',
    
    // 7. Infrastruktur Digital
    infrastrukturDigital: '1 Menara BTS Mandiri, Akses WiFi Balai Desa (Fiber Optik), Sistem Informasi Desa (SID) Terintegrasi',
    
    // 8. Lembaga Adat
    lembagaAdat: 'Lembaga Adat Dayak Kenyah Lung Anai (Ketua: Bapak Yohanes Lung)',
    
    // 9. Program Aktif
    programAktif: 'Internet Desa, Posyandu Digital, Digitalisasi Layanan, Pelatihan Digital Pertanian',
    
    // 10. Sumber dan Waktu Pembaruan
    sumberData: 'Registrasi Sosial Ekonomi (Regsosek) & Profil Desa (Prodeskel)',
    waktuPembaruan: '18 Juli 2026, 10:00 WITA',
  });

  const [riwayat, setRiwayat] = useState<Riwayat[]>([
    { tgl: '18 Jul 2026, 10:00', user: 'Sekdes (Siti Nurhaliza)', perubahan: 'Pembaruan jumlah penduduk hasil Regsosek 2026', status: 'Terverifikasi' },
    { tgl: '10 Jun 2026, 14:15', user: 'Kasi Pemerintahan', perubahan: 'Update infrastruktur digital (WiFi Balai Desa)', status: 'Terverifikasi' },
    { tgl: '05 Mei 2026, 09:30', user: 'Sekdes (Siti Nurhaliza)', perubahan: 'Pembaruan data sarana kesehatan posyandu', status: 'Terverifikasi' },
  ]);

  const handleSave = () => {
    alert('✅ Profil desa berhasil diperbarui secara lokal.');
    setFormData(prev => ({
      ...prev,
      waktuPembaruan: new Date().toLocaleString('id-ID') + ' WITA',
    }));
    setIsEditing(false);
  };

  const handleUpload = () => {
    const file = prompt('Masukkan nama dokumen yang ingin diunggah (misal: SK_Penduduk_2026.pdf):');
    if (file) {
      setUploadedFiles(prev => [...prev, file]);
      alert(`✅ Dokumen "${file}" berhasil diunggah.`);
    }
  };

  const handleVerifikasi = () => {
    setSubmittedVerifikasi(true);
    alert('✅ Pengajuan verifikasi profil desa telah dikirim ke Dinas PMD Kabupaten.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Profil Desa" modul="Pemerintah Desa" color={COLOR} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-850 rounded-2xl p-6 text-white overflow-hidden shadow-md">
        <div className="relative z-10 space-y-2">
          <span className="bg-blue-800 text-blue-200 border border-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Modul Pemerintah Desa</span>
          <h1 className="text-2xl md:text-3xl font-bold">{formData.namaDesa}</h1>
          <p className="text-xs opacity-90">Kecamatan Tumbang Samba, Kabupaten Pulang Pisau, Provinsi Kalimantan Tengah</p>
          <div className="flex flex-wrap gap-2 text-[10px] pt-1">
            <span className="px-2.5 py-1 bg-white/10 rounded-full flex items-center gap-1">
              <Users size={11} /> {formData.jumlahPenduduk} Jiwa / {formData.jumlahKeluarga} KK
            </span>
            <span className="px-2.5 py-1 bg-white/10 rounded-full flex items-center gap-1">
              <MapPin size={11} /> {formData.luasWilayah} km²
            </span>
            <span className="px-2.5 py-1 bg-white/10 rounded-full flex items-center gap-1">
              <Landmark size={11} /> {formData.jumlahDusun}
            </span>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-36 h-36 opacity-10">
          <Landmark size={144} />
        </div>
      </div>

      {/* FUNGSI UTAMA / ACTION BUTTONS */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-3.5 py-2 text-xs bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          {isEditing ? <Save size={13} /> : <Edit size={13} />}
          {isEditing ? 'Simpan Profil' : 'Perbarui Profil'}
        </button>
        <button
          onClick={handleUpload}
          className="px-3.5 py-2 text-xs bg-white border border-slate-350 text-slate-700 hover:bg-slate-50 rounded-lg font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Upload size={13} /> Unggah Dokumen Pendukung
        </button>
        <button
          onClick={handleVerifikasi}
          disabled={submittedVerifikasi}
          className={`px-3.5 py-2 text-xs rounded-lg font-bold shadow-sm transition-colors flex items-center gap-1.5 ${submittedVerifikasi ? 'bg-green-100 border border-green-200 text-green-700 cursor-default' : 'bg-emerald-700 hover:bg-emerald-800 text-white'}`}
        >
          <ShieldCheck size={13} /> {submittedVerifikasi ? 'Sudah Diajukan Verifikasi' : 'Ajukan Verifikasi'}
        </button>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-3.5 py-2 text-xs bg-white border border-slate-350 text-slate-700 hover:bg-slate-50 rounded-lg font-bold shadow-sm transition-colors flex items-center gap-1.5"
        >
          <History size={13} /> Lihat Riwayat Perubahan
        </button>
      </div>

      {/* RIWAYAT PANEL */}
      {showHistory && (
        <Card className="border-indigo-200 bg-indigo-50/10">
          <CardHeader className="py-3">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <History size={14} className="text-indigo-700" /> Riwayat Pembaruan Profil Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <div className="divide-y divide-slate-200">
              {riwayat.map((r, i) => (
                <div key={i} className="py-2 flex justify-between items-center gap-4 flex-wrap">
                  <div>
                    <p className="font-semibold text-slate-800">{r.perubahan}</p>
                    <p className="text-[10px] text-slate-400">Oleh: {r.user} • {r.tgl}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-100 text-green-700">{r.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* UPLOADED FILES LIST */}
      {uploadedFiles.length > 0 && (
        <Card className="border-slate-200">
          <CardContent className="p-3 text-xs flex gap-2 flex-wrap items-center">
            <span className="font-bold text-slate-600">Dokumen Diunggah:</span>
            {uploadedFiles.map((file, i) => (
              <span key={i} className="px-2 py-1 rounded bg-slate-100 border text-slate-700 flex items-center gap-1">
                <FileText size={11} /> {file}
              </span>
            ))}
          </CardContent>
        </Card>
      )}

      {/* GRID KONTEN DETAIL PROFIL DESA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-xs">
        
        {/* IDENTITAS DESA */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider">1. Identitas Desa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-500">Nama Desa</label>
                {isEditing ? (
                  <input type="text" value={formData.namaDesa} onChange={e => setFormData({ ...formData, namaDesa: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800 text-[13px]">{formData.namaDesa}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Kode Desa</label>
                {isEditing ? (
                  <input type="text" value={formData.kodeDesa} onChange={e => setFormData({ ...formData, kodeDesa: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800 font-mono">{formData.kodeDesa}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Tahun Pembentukan</label>
                {isEditing ? (
                  <input type="text" value={formData.tahunBentuk} onChange={e => setFormData({ ...formData, tahunBentuk: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.tahunBentuk}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Kode Pos</label>
                {isEditing ? (
                  <input type="text" value={formData.kodePos} onChange={e => setFormData({ ...formData, kodePos: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800 font-mono">{formData.kodePos}</p>
                )}
              </div>
            </div>
            <div>
              <label className="font-bold text-slate-500">Visi Desa</label>
              {isEditing ? (
                <textarea rows={2} value={formData.visi} onChange={e => setFormData({ ...formData, visi: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
              ) : (
                <p className="text-slate-700 italic">"{formData.visi}"</p>
              )}
            </div>
            <div>
              <label className="font-bold text-slate-500">Misi Desa</label>
              {isEditing ? (
                <textarea rows={3} value={formData.misi} onChange={e => setFormData({ ...formData, misi: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
              ) : (
                <div className="space-y-1 text-slate-700 whitespace-pre-line">{formData.misi}</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* WILAYAH DAN DUSUN */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider">2. Wilayah dan Dusun</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-500">Luas Wilayah (km²)</label>
                {isEditing ? (
                  <input type="text" value={formData.luasWilayah} onChange={e => setFormData({ ...formData, luasWilayah: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.luasWilayah} km²</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Jumlah Dusun</label>
                {isEditing ? (
                  <input type="text" value={formData.jumlahDusun} onChange={e => setFormData({ ...formData, jumlahDusun: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.jumlahDusun}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Batas Utara</label>
                {isEditing ? (
                  <input type="text" value={formData.batasUtara} onChange={e => setFormData({ ...formData, batasUtara: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.batasUtara}</p>
                )}
              </div>
              <div>
                <label className="font-bold text-slate-500">Batas Selatan</label>
                {isEditing ? (
                  <input type="text" value={formData.batasSelatan} onChange={e => setFormData({ ...formData, batasSelatan: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.batasSelatan}</p>
                )}
              </div>
            </div>
            <div>
              <label className="font-bold text-slate-500">Rincian Rukun Tetangga (RT)</label>
              {isEditing ? (
                <input type="text" value={formData.jumlahRT} onChange={e => setFormData({ ...formData, jumlahRT: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
              ) : (
                <p className="font-semibold text-slate-800">{formData.jumlahRT}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* DATA PENDUDUK, KELEMBAGAAN & SARANA */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider">3 - 8. Statistik & Kelembagaan Desa</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-500">3. Jumlah Penduduk & Keluarga</label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <input type="text" value={formData.jumlahPenduduk} onChange={e => setFormData({ ...formData, jumlahPenduduk: e.target.value })} placeholder="Jiwa" className="w-1/2 p-2 border rounded-lg" />
                    <input type="text" value={formData.jumlahKeluarga} onChange={e => setFormData({ ...formData, jumlahKeluarga: e.target.value })} placeholder="KK" className="w-1/2 p-2 border rounded-lg" />
                  </div>
                ) : (
                  <p className="font-semibold text-slate-800">{formData.jumlahPenduduk} Jiwa / {formData.jumlahKeluarga} KK ({formData.kepadatan})</p>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-500">4. Kelembagaan Desa</label>
                {isEditing ? (
                  <input type="text" value={formData.lembagaPemerintah} onChange={e => setFormData({ ...formData, lembagaPemerintah: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.lembagaPemerintah}</p>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-500">5. Sarana Kesehatan</label>
                {isEditing ? (
                  <input type="text" value={formData.saranaKesehatan} onChange={e => setFormData({ ...formData, saranaKesehatan: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.saranaKesehatan}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-500">6. Sarana Pendidikan</label>
                {isEditing ? (
                  <input type="text" value={formData.saranaPendidikan} onChange={e => setFormData({ ...formData, saranaPendidikan: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.saranaPendidikan}</p>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-500">7. Infrastruktur Digital</label>
                {isEditing ? (
                  <input type="text" value={formData.infrastrukturDigital} onChange={e => setFormData({ ...formData, infrastrukturDigital: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.infrastrukturDigital}</p>
                )}
              </div>

              <div>
                <label className="font-bold text-slate-500">8. Lembaga Adat</label>
                {isEditing ? (
                  <input type="text" value={formData.lembagaAdat} onChange={e => setFormData({ ...formData, lembagaAdat: e.target.value })} className="w-full p-2 border rounded-lg" />
                ) : (
                  <p className="font-semibold text-slate-800">{formData.lembagaAdat}</p>
                )}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* PROGRAM AKTIF & METADATA PEMBARUAN */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-indigo-900 uppercase tracking-wider">9 - 10. Program Aktif & Pembaruan Data</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="font-bold text-slate-500">9. Program Pembangunan Desa Aktif</label>
              {isEditing ? (
                <input type="text" value={formData.programAktif} onChange={e => setFormData({ ...formData, programAktif: e.target.value })} className="w-full p-2 border rounded-lg focus:outline-none" />
              ) : (
                <p className="font-semibold text-slate-800">{formData.programAktif}</p>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-dashed text-[11px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-650 flex items-center gap-1"><RefreshCw size={12} className="animate-spin text-indigo-700" /> Sumber & Waktu Pembaruan Resmi:</p>
              <p>Sumber: <strong>{formData.sumberData}</strong></p>
              <p>Pembaruan Terakhir: <strong>{formData.waktuPembaruan}</strong></p>
            </div>

          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Data profil terikat dengan Prodeskel & Kemendagri</span>
        <span>Terakhir Diperbarui: {formData.waktuPembaruan}</span>
      </div>
    </div>
  );
}