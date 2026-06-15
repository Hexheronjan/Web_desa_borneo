'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { FileText, CheckCircle2, Clock, XCircle, Upload, Download } from 'lucide-react';
import { useState, useEffect } from 'react';

const COLOR = '#00695c';

interface SuratSubmission {
  id: string;
  title: string;
  category: string;
  description: string;
  valueText: string | null;
  valueBlob: string | null;
  status: string;
  createdBy: string;
  createdAt: string;
}

export default function ValidasiSuratPage() {
  const [suratList, setSuratList] = useState<SuratSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadSurat();
  }, []);

  const loadSurat = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/surat-online');
      const data = await res.json();
      if (data.success) {
        setSuratList(data.data.map((r: any) => ({
          id: r.id,
          title: r.title || 'Tanpa Judul',
          category: r.category || 'Umum',
          description: r.description || '',
          valueText: r.valueText || null,
          valueBlob: r.valueBlob || null,
          status: r.status || 'Proses Validasi',
          createdBy: r.createdBy || 'Warga',
          createdAt: new Date(r.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
        })));
      }
    } catch (error) {
      console.error('Error loading surat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleValidate = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/surat-online', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          modulePath: '/warga/surat-online',
          status: newStatus
        })
      });
      if (res.ok) {
        loadSurat();
      } else {
        alert('Gagal mengupdate status');
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    }
  };

  const handlePdfUpload = async (id: string, file: File) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('id', id);

      // Upload the file (convert to base64 and save to database)
      const uploadRes = await fetch('/api/surat-online/upload', {
        method: 'POST',
        body: formData
      });

      if (!uploadRes.ok) {
        const error = await uploadRes.json();
        throw new Error(error.error || 'Gagal mengupload file');
      }

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        throw new Error('Gagal upload file');
      }

      // Update status to 'Selesai' after successful upload
      const res = await fetch('/api/surat-online', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          modulePath: '/warga/surat-online',
          status: 'Selesai'
        })
      });

      if (res.ok) {
        loadSurat();
      } else {
        alert('Gagal mengupdate status surat');
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + (error as Error).message);
    }
  };

  const filteredSurat = filter === 'all' 
    ? suratList 
    : suratList.filter(s => s.status === filter);

  const stats = {
    total: suratList.length,
    pending: suratList.filter(s => s.status === 'Proses Validasi').length,
    validated: suratList.filter(s => s.status === 'Tervalidasi').length,
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Validasi Surat Online" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pengajuan" value={stats.total} satuan="surat" barColor="teal" progress={100} />
        <StatCard label="Menunggu Validasi" value={stats.pending} satuan="surat" barColor="orange" progress={stats.total > 0 ? (stats.pending / stats.total) * 100 : 0} />
        <StatCard label="Tervalidasi" value={stats.validated} satuan="surat" barColor="green" progress={stats.total > 0 ? (stats.validated / stats.total) * 100 : 0} />
        <StatCard label="Waktu Proses" value="2 Hari" satuan="rata-rata" barColor="blue" progress={80} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <FileText size={16} /> Daftar Pengajuan Surat Warga
            </CardTitle>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                <option value="all">Semua Status</option>
                <option value="Proses Validasi">Proses Validasi</option>
                <option value="Tervalidasi">Tervalidasi</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-xs text-slate-500 text-center py-4">Memuat data...</p>
          ) : filteredSurat.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">Tidak ada pengajuan surat</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4">No</th>
                    <th className="pb-2 pr-4">Jenis Surat</th>
                    <th className="pb-2 pr-4">Kategori</th>
                    <th className="pb-2 pr-4">Pengaju</th>
                    <th className="pb-2 pr-4">Tanggal</th>
                    <th className="pb-2 pr-4">Status</th>
                    <th className="pb-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSurat.map((surat, i) => (
                    <tr key={surat.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-3 pr-4 text-slate-400 font-mono text-xs">{i + 1}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-700">{surat.title}</td>
                      <td className="py-3 pr-4 text-xs text-slate-500">{surat.category}</td>
                      <td className="py-3 pr-4 text-xs text-slate-500">{surat.createdBy}</td>
                      <td className="py-3 pr-4 text-xs text-slate-500">{surat.createdAt}</td>
                      <td className="py-3 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          surat.status === 'Tervalidasi' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {surat.status}
                        </span>
                      </td>
                      <td className="py-3">
                        {surat.status === 'Proses Validasi' && (
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleValidate(surat.id, 'Tervalidasi')}
                              className="px-2 py-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded flex items-center gap-1"
                            >
                              <CheckCircle2 size={12} /> Validasi
                            </button>
                            <button
                              onClick={() => handleValidate(surat.id, 'Ditolak')}
                              className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded flex items-center gap-1"
                            >
                              <XCircle size={12} /> Tolak
                            </button>
                          </div>
                        )}
                        {surat.status === 'Tervalidasi' && (
                          <div className="flex gap-1">
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handlePdfUpload(surat.id, file);
                              }}
                              className="hidden"
                              id={`pdf-upload-${surat.id}`}
                            />
                            <label
                              htmlFor={`pdf-upload-${surat.id}`}
                              className="px-2 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded flex items-center gap-1 cursor-pointer"
                            >
                              <Upload size={12} /> Upload PDF
                            </label>
                          </div>
                        )}
                        {surat.status === 'Selesai' && (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle2 size={12} /> Selesai
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
