'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { FileText, Plus, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const COLOR = '#6a1b9a';

const documentTypes = [
  { name: 'Surat Keterangan Domisili', desc: 'Digunakan untuk mendaftarkan tempat tinggal warga.' },
  { name: 'Surat Keterangan Usaha (SKU)', desc: 'Untuk legalitas pendirian UMKM / usaha rakyat.' },
  { name: 'Surat Keterangan Tidak Mampu (SKTM)', desc: 'Membantu pengajuan jaminan kesehatan / bantuan sekolah.' }
];

interface SuratApplication {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function SuratOnlinePage() {
  const [apps, setApps] = useState<SuratApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await fetch('/api/surat-online');
      const data = await res.json();
      if (data.success) {
        setApps(data.data.map((r: any) => ({
          id: r.id,
          title: r.title,
          status: r.status,
          createdAt: new Date(r.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
        })));
      }
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (type: string) => {
    try {
      const res = await fetch('/api/surat-online', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: type,
          category: 'Pengajuan Surat',
          description: `Pengajuan surat ${type}`,
          status: 'Proses Validasi',
          createdBy: 'Warga'
        })
      });
      const result = await res.json();
      if (result.success) {
        loadApplications();
      } else {
        alert('Gagal mengajukan surat: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + (error as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Surat Online" modul="Warga Adat Borneo" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pengajuan" value={apps.length} satuan="surat" barColor="purple" progress={100} />
        <StatCard label="Tervalidasi" value={apps.filter(a => a.status === 'Tervalidasi').length} satuan="surat selesai" barColor="green" progress={75} />
        <StatCard label="Dalam Proses" value={apps.filter(a => a.status !== 'Tervalidasi').length} satuan="surat antrian" barColor="orange" progress={25} />
        <StatCard label="Waktu Proses Rerata" value="10 Menit" satuan="sangat cepat" barColor="green" progress={95} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Document Forms */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <FileText size={16} /> Pilih Jenis Surat yang Ingin Diajukan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {documentTypes.map((doc, i) => (
              <div key={i} className="p-4 border rounded-xl bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 text-sm md:text-base">{doc.name}</p>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">{doc.desc}</p>
                </div>
                <button
                  onClick={() => handleApply(doc.name)}
                  className="px-3.5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 flex-shrink-0"
                >
                  <Plus size={14} /> Ajukan Surat
                </button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Application History */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle2 size={16} /> Riwayat Pengajuan Surat Online
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <p className="text-xs text-slate-500 text-center py-4">Memuat data...</p>
            ) : apps.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">Belum ada pengajuan surat</p>
            ) : (
              apps.map((a, i) => (
                <div key={i} className="p-3 border rounded-xl bg-white flex justify-between items-center hover:shadow-sm transition-all">
                  <div>
                    <p className="text-xs font-bold text-slate-700 leading-normal">{a.title}</p>
                    <span className="text-[10px] text-indigo-700 font-mono font-bold block mt-0.5">{a.id} • {a.createdAt}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    a.status === 'Tervalidasi' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {a.status}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
