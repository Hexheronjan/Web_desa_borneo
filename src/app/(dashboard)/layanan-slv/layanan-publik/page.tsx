'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  FileText, ShieldCheck, CheckCircle2, Clock, Landmark, User, Mail, Calendar, HelpCircle, Phone, Info
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface Permohonan {
  id: string;
  layanan: string;
  tanggalInput: string;
  status: 'Baru' | 'Diperiksa' | 'Dibahas' | 'Diproses' | 'Selesai';
  persyaratan: string;
  petugasPJ: string;
  kontakPJ: string;
}

const MOCK_PERMOHONAN: Permohonan[] = [
  { id: 'REQ-01', layanan: 'Surat Pengantar Pembuatan KK Baru', tanggalInput: '15 Juli 2026', status: 'Selesai', persyaratan: 'Fotokopi Buku Nikah, Surat Pengantar RT', petugasPJ: 'Sekretaris Desa (Pak Herman)', kontakPJ: '+62 813-9080-7766' },
  { id: 'REQ-02', layanan: 'Surat Keterangan Usaha (SKU) BUMDes', tanggalInput: '17 Juli 2026', status: 'Diproses', persyaratan: 'Pengantar RT, Foto Usaha, Fotokopi KTP', petugasPJ: 'Kasi Pemerintahan (Bu Neli)', kontakPJ: '+62 852-1122-3344' },
];

export default function LayananPublikDesaPage() {
  const [permohonans, setPermohonans] = useState<Permohonan[]>(MOCK_PERMOHONAN);
  
  // Form states
  const [selectedLayanan, setSelectedLayanan] = useState('');
  const [namaPemohon, setNamaPemohon] = useState('');
  const [nikPemohon, setNikPemohon] = useState('');

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLayanan || !namaPemohon || !nikPemohon) {
      alert('Semua kolom wajib diisi.');
      return;
    }

    const baru: Permohonan = {
      id: `REQ-0${permohonans.length + 1}`,
      layanan: selectedLayanan,
      tanggalInput: '18 Juli 2026',
      status: 'Baru',
      persyaratan: selectedLayanan === 'Surat Keterangan Domisili' ? 'Fotokopi KTP, Pengantar RT' : 'Pengantar RT, Fotokopi KK',
      petugasPJ: 'Sekretaris Desa (Pak Herman)',
      kontakPJ: '+62 813-9080-7766'
    };

    setPermohonans(prev => [baru, ...prev]);
    setSelectedLayanan('');
    setNamaPemohon('');
    setNikPemohon('');
    alert('✅ Permohonan layanan publik berhasil diajukan.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Layanan Publik Desa" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER PRIVASI & PERLINDUNGAN DATA */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          🔒 <strong>Perlindungan Data Publik:</strong> Seluruh berkas persyaratan dan informasi permohonan Anda dilindungi secara digital dan hanya digunakan untuk keperluan verifikasi administratif oleh Pemerintah Desa.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Permohonan Diajukan" value={permohonans.length} satuan="Dokumen" barColor="purple" progress={100} />
        <StatCard label="Layanan Diproses" value={permohonans.filter(p => p.status !== 'Selesai').length} satuan="Menunggu Verifikasi" barColor="orange" progress={50} />
        <StatCard label="Layanan Selesai" value={permohonans.filter(p => p.status === 'Selesai').length} satuan="Selesai Diambil" barColor="green" progress={50} />
        <StatCard label="Kecepatan Layanan" value="1 Hari Kerja" satuan="Rata-rata Penyelesaian" barColor="blue" progress={90} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* PANEL FORM PERMOHONAN */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Mail size={14} className="text-indigo-700" /> Pengajuan Permohonan Layanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAjukan} className="space-y-3.5">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-750">NAMA LENGKAP PEMOHON:</label>
                <input
                  type="text"
                  required
                  value={namaPemohon}
                  onChange={e => setNamaPemohon(e.target.value)}
                  placeholder="Masukkan nama sesuai KTP..."
                  className="w-full p-2 border rounded-lg bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-750">NIK PEMOHON:</label>
                <input
                  type="text"
                  required
                  value={nikPemohon}
                  onChange={e => setNikPemohon(e.target.value)}
                  placeholder="Masukkan NIK 16 digit..."
                  className="w-full p-2 border rounded-lg bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-750">PILIH DOKUMEN LAYANAN:</label>
                <select
                  required
                  value={selectedLayanan}
                  onChange={e => setSelectedLayanan(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white focus:outline-none"
                >
                  <option value="">-- Pilih Surat/Dokumen --</option>
                  <option value="Surat Keterangan Domisili">Surat Keterangan Domisili</option>
                  <option value="Surat Keterangan Usaha (SKU)">Surat Keterangan Usaha (SKU)</option>
                  <option value="Surat Pengantar Pembuatan KK Baru">Surat Pengantar Pembuatan KK Baru</option>
                  <option value="Surat Keterangan Tidak Mampu (SKTM)">Surat Keterangan Tidak Mampu (SKTM)</option>
                </select>
              </div>

              <div className="p-2.5 bg-slate-50 border rounded-lg space-y-1 text-[11px] text-slate-600">
                <p className="font-bold text-slate-700 flex items-center gap-1"><Info size={11} /> Persyaratan Dasar:</p>
                <p className="font-semibold">• Surat Pengantar RT/RW setempat</p>
                <p className="font-semibold">• Fotokopi KK &amp; KTP pemohon</p>
              </div>

              <button type="submit" className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-sm">
                Ajukan Surat Permohonan
              </button>

            </form>
          </CardContent>
        </Card>

        {/* PANEL LIST STATUS PERMOHONAN */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-655 uppercase tracking-wider">Status Permohonan Dokumen Anda</h2>

          <div className="space-y-3">
            {permohonans.map(p => (
              <Card key={p.id} className="border border-slate-200 shadow-none">
                <CardContent className="p-4 space-y-3.5">
                  
                  <div className="flex justify-between items-start gap-2 flex-wrap border-b pb-2 text-[10px]">
                    <span className="font-bold text-slate-400">{p.id} • Diajukan: {p.tanggalInput}</span>
                    <span className={`font-bold px-2 py-0.5 rounded border ${
                      p.status === 'Selesai' ? 'bg-green-50 text-green-700 border-green-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>{p.status}</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-805 text-sm">{p.layanan}</h3>
                    <p className="text-[10px] text-slate-500 mt-1">Persyaratan Dilampirkan: {p.persyaratan}</p>
                  </div>

                  <div className="border-t pt-2.5 grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] text-slate-550 leading-relaxed font-semibold">
                    <p className="flex items-center gap-1"><User size={12} /> Penanggung Jawab: {p.petugasPJ}</p>
                    <p className="flex items-center gap-1"><Phone size={12} /> Kontak Petugas: {p.kontakPJ}</p>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

          {/* INFORMASI ADMINISTRASI & JADWAL LAYANAN LURING */}
          <Card>
            <CardHeader className="py-2.5 bg-slate-50 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1"><Calendar size={13} /> Jadwal Layanan Kantor Desa (Luring)</CardTitle>
            </CardHeader>
            <CardContent className="p-3.5 space-y-2 text-[11px] text-slate-600 font-semibold leading-relaxed">
              <p>📍 <strong>Senin - Kamis:</strong> 08:00 - 15:00 WITA (Istirahat 12:00 - 13:00 WITA)</p>
              <p>📍 <strong>Jumat:</strong> 08:00 - 11:30 WITA</p>
              <p className="text-slate-450 italic border-t pt-2 mt-1">Petugas Layanan: Rian (Operator SID) &amp; Pak Herman (Sekdes)</p>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
