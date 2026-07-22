'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Settings, Save, Server, Globe, Bell, Shield, Sliders, CheckCircle2, User } from 'lucide-react';

const COLOR = '#1a237e';

export default function KonfigurasiSistemPage() {
  const [activeTab, setActiveTab] = useState<'sistem' | 'profil'>('sistem');
  const [notification, setNotification] = useState<string | null>(null);

  const [config, setConfig] = useState({
    namaSistem: 'APL-SLV BORNEO (Smart Living Village)',
    versiSistem: 'v2.1',
    deskripsiSistem: 'Sistem evaluasi tingkat kematangan, kesiapan, dan kualitas hidup desa digital.',
    
    // Konfigurasi Desa Aktif
    desaJonggon: true,
    desaKedangIpil: true,
    desaLungAnai: true,
    
    // Periode & Regional
    periodeAktif: '2026 — Semester 1',
    zonaWaktu: 'WITA (Waktu Indonesia Tengah)',
    sessionTimeout: '30', // batas sesi (menit)
    
    // Kebijakan Kata Sandi
    minPasswordLength: '8',
    requireSpecialChar: true,
    
    // Modul Aktif (1-14)
    modulDashboard: true,
    modulFramework: true,
    modulPeriode: true,
    modulValidasi: true,
    modulIntegrasi: true,
    modulTataKelola: true,
    modulDSS: true,
    modulEvaluasi: true,
    modulPakar: true,
    modulUAT: true,
    modulRepo: true,
    modulUser: true,

    // Tampilan
    darkMode: false,
    temaWarna: 'Indigo Classic',
  });

  const [profil, setProfil] = useState({
    namaLengkap: 'Dr. Ahmad Surya',
    username: 'admin_super',
    email: 'ahmad.surya@borneo.id',
    jabatan: 'Kepala Administrator Sistem IT',
  });

  const handleSaveSistem = () => {
    setNotification('Konfigurasi sistem berhasil diperbarui & dicatat ke Jejak Audit.');
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveProfil = () => {
    setNotification('Profil pribadi berhasil diperbarui.');
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Sistem dan Pengaturan" modul="Administrasi Sistem" color={COLOR} />

      {/* Navigasi Tab: Pemisah Pengaturan Sistem & Profil */}
      <div className="flex gap-2 border-b pb-2">
        <button
          onClick={() => setActiveTab('sistem')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'sistem' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span className="flex items-center gap-1.5"><Settings size={14} /> Konfigurasi Sistem (Admin)</span>
        </button>
        <button
          onClick={() => setActiveTab('profil')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'profil' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <span className="flex items-center gap-1.5"><User size={14} /> Profil Pribadi Pengguna</span>
        </button>
      </div>

      {activeTab === 'sistem' ? (
        /* ================= KELOMPOK PENGATURAN SISTEM ================= */
        <div className="space-y-5 text-xs">
          {/* Identitas Aplikasi */}
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Globe size={14} /> Identitas Aplikasi &amp; Informasi Platform
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-750">Nama Aplikasi</Label>
                  <Input value={config.namaSistem} onChange={e => setConfig({ ...config, namaSistem: e.target.value })} className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-750">Versi Aplikasi</Label>
                  <Input value={config.versiSistem} onChange={e => setConfig({ ...config, versiSistem: e.target.value })} className="h-9 text-xs" />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="font-bold text-slate-750">Deskripsi Aplikasi</Label>
                <Textarea value={config.deskripsiSistem} onChange={e => setConfig({ ...config, deskripsiSistem: e.target.value })} className="min-h-[60px] text-xs" />
              </div>
            </CardContent>
          </Card>

          {/* Konfigurasi Desa & Regional */}
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders size={14} /> Konfigurasi Desa Aktif &amp; Regional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-750">Periode Aktif</Label>
                  <Input value={config.periodeAktif} onChange={e => setConfig({ ...config, periodeAktif: e.target.value })} className="h-9 text-xs" />
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-750">Zona Waktu Sistem</Label>
                  <select value={config.zonaWaktu} onChange={e => setConfig({ ...config, zonaWaktu: e.target.value })} className="w-full h-9 rounded-md border bg-white px-2 text-xs">
                    <option value="WIB (Waktu Indonesia Barat)">WIB (Waktu Indonesia Barat)</option>
                    <option value="WITA (Waktu Indonesia Tengah)">WITA (Waktu Indonesia Tengah)</option>
                    <option value="WIT (Waktu Indonesia Timur)">WIT (Waktu Indonesia Timur)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="font-bold text-slate-750">Batas Sesi (Session Timeout - Menit)</Label>
                  <Input type="number" value={config.sessionTimeout} onChange={e => setConfig({ ...config, sessionTimeout: e.target.value })} className="h-9 text-xs" />
                </div>
              </div>

              <div className="space-y-2 border-t pt-2.5">
                <Label className="font-bold text-slate-700 block">Daftar Desa yang Aktif di Sistem:</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                    <input type="checkbox" checked={config.desaJonggon} onChange={e => setConfig({ ...config, desaJonggon: e.target.checked })} className="rounded text-indigo-600 h-4 w-4" />
                    Desa Jonggon Jaya
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                    <input type="checkbox" checked={config.desaKedangIpil} onChange={e => setConfig({ ...config, desaKedangIpil: e.target.checked })} className="rounded text-indigo-600 h-4 w-4" />
                    Desa Kedang Ipil
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold">
                    <input type="checkbox" checked={config.desaLungAnai} onChange={e => setConfig({ ...config, desaLungAnai: e.target.checked })} className="rounded text-indigo-600 h-4 w-4" />
                    Desa Lung Anai
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kebijakan Kata Sandi & Keamanan */}
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Shield size={14} /> Kebijakan Kata Sandi &amp; Keamanan
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="font-bold text-slate-750">Panjang Minimum Kata Sandi</Label>
                <Input type="number" value={config.minPasswordLength} onChange={e => setConfig({ ...config, minPasswordLength: e.target.value })} className="h-9 text-xs" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-xl bg-slate-50 mt-4">
                <div>
                  <Label className="font-bold text-slate-750">Wajib Karakter Unik/Simbol</Label>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Password harus mengandung minimal 1 karakter unik (!@#$%)</p>
                </div>
                <Switch checked={config.requireSpecialChar} onCheckedChange={checked => setConfig({ ...config, requireSpecialChar: checked })} />
              </div>
            </CardContent>
          </Card>

          {/* Modul Sistem yang Aktif */}
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Server size={14} /> Daftar Modul Sistem yang Aktif (1-14)
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50/50 p-4 border rounded-xl">
              {[
                { label: 'Modul 1: Dashboard Kesiapan', bind: 'modulDashboard' },
                { label: 'Modul 2: Master Framework', bind: 'modulFramework' },
                { label: 'Modul 3: Versioning Kerangka', bind: 'modulFramework' },
                { label: 'Modul 4: Manajemen Periode', bind: 'modulPeriode' },
                { label: 'Modul 5: Validasi Teknis Data', bind: 'modulValidasi' },
                { label: 'Modul 6: Integrasi Data Desa', bind: 'modulIntegrasi' },
                { label: 'Modul 7: Tata Kelola Sistem', bind: 'modulTataKelola' },
                { label: 'Modul 8 & 9: Modul DSS AHP', bind: 'modulDSS' },
                { label: 'Modul 10: Evaluasi Artefak', bind: 'modulEvaluasi' },
                { label: 'Modul 11: Validasi Pakar', bind: 'modulPakar' },
                { label: 'Modul 12: Kuesioner UAT', bind: 'modulUAT' },
                { label: 'Modul 13: Repositori Riset', bind: 'modulRepo' },
                { label: 'Modul 14: Manajemen User', bind: 'modulUser' },
              ].map((m, idx) => (
                <label key={idx} className="flex items-center gap-2 cursor-pointer font-semibold text-slate-750">
                  <input type="checkbox" defaultChecked className="rounded text-indigo-600 h-4 w-4" />
                  {m.label}
                </label>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveSistem} className="bg-indigo-600 hover:bg-indigo-700 font-bold">
              <Save size={14} className="mr-1" /> Simpan Konfigurasi Sistem
            </Button>
          </div>
        </div>
      ) : (
        /* ================= PENGATURAN PROFIL PRIBADI ================= */
        <Card>
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <User size={14} /> Data Diri Pengguna (Personal Profile)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="p-3.5 bg-indigo-50 border border-indigo-200 text-indigo-950 rounded-xl font-semibold leading-normal">
              🔒 Pengaturan profil pribadi ini disimpan secara terpisah dari data konfigurasi platform dan tidak memengaruhi setelan instansi desa lain.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="font-bold text-slate-750">Nama Lengkap</Label>
                <Input value={profil.namaLengkap} onChange={e => setProfil({ ...profil, namaLengkap: e.target.value })} className="h-9 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="font-bold text-slate-750">Username</Label>
                <Input value={profil.username} disabled className="h-9 text-xs bg-slate-100 cursor-not-allowed" />
              </div>
              <div className="space-y-1">
                <Label className="font-bold text-slate-750">Email Kontak</Label>
                <Input type="email" value={profil.email} onChange={e => setProfil({ ...profil, email: e.target.value })} className="h-9 text-xs" />
              </div>
              <div className="space-y-1">
                <Label className="font-bold text-slate-750">Jabatan Operasional</Label>
                <Input value={profil.jabatan} disabled className="h-9 text-xs bg-slate-100 cursor-not-allowed" />
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t">
              <Button onClick={handleSaveProfil} className="bg-indigo-600 hover:bg-indigo-700 font-bold">
                <Save size={14} className="mr-1" /> Simpan Profil Pribadi
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {notification && (
        <div className="fixed bottom-5 right-5 z-[9999] flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border border-green-200 bg-white text-xs font-bold">
          <CheckCircle2 className="text-green-600" size={16} /> {notification}
        </div>
      )}
    </div>
  );
}
