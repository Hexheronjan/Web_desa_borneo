'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Users, Search, Filter, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const COLOR = '#4527a0';

interface Aspirasi {
  id: string;
  kategori: string;
  judul: string;
  isi: string;
  status: string;
  createdAt: string;
  warga?: {
    nama: string;
  };
}

export default function AspirasiMasyarakatPage() {
  const [search, setSearch] = useState('');
  const [aspirasiData, setAspirasiData] = useState<Aspirasi[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Aspirasi | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/aspirasi');
      const result = await res.json();
      if (result.success) setAspirasiData(result.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data: Aspirasi) => {
    setEditingData(data);
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const res = await fetch(`/api/aspirasi?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Data berhasil dihapus');
        loadData();
      } else {
        alert('Gagal menghapus data');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingData ? 'PUT' : 'POST';
    
    try {
      const res = await fetch('/api/aspirasi', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingData ? { ...formData, id: editingData.id } : formData),
      });
      const result = await res.json();
      if (result.success) {
        alert(editingData ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
        setIsModalOpen(false);
        loadData();
      } else {
        alert('Gagal: ' + result.error);
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = aspirasiData.filter(a =>
    (a.warga?.nama || 'Warga').toLowerCase().includes(search.toLowerCase()) ||
    a.kategori.toLowerCase().includes(search.toLowerCase()) ||
    a.isi.toLowerCase().includes(search.toLowerCase())
  );

  const alertCount = filtered.filter(a => a.status === 'Ditindaklanjuti').length;
  const prosesCount = filtered.filter(a => a.status === 'Proses').length;
  const diterimaCount = filtered.filter(a => a.status === 'Diterima').length;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Aspirasi Masyarakat" modul="BPD (Badan Permusyawaratan Desa)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Aspirasi" value={filtered.length} satuan="masukan masuk" barColor="purple" progress={100} />
        <StatCard label="Ditindaklanjuti" value={alertCount} satuan="aspirasi selesai" barColor="green" progress={filtered.length > 0 ? (alertCount / filtered.length) * 100 : 0} />
        <StatCard label="Dalam Proses" value={prosesCount} satuan="aspirasi dikoordinasikan" barColor="blue" progress={filtered.length > 0 ? (prosesCount / filtered.length) * 100 : 0} />
        <StatCard label="Diterima / Baru" value={diterimaCount} satuan="aspirasi antrian" barColor="orange" progress={filtered.length > 0 ? (diterimaCount / filtered.length) * 100 : 0} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <MessageSquare size={16} /> Kotak Aduan & Aspirasi Warga Desa (Dikelola BPD)
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari aspirasi..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-xs text-slate-500 text-center py-4">Memuat data...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                      <th className="pb-2 pr-4 text-center">No</th>
                      <th className="pb-2 pr-4">Tanggal</th>
                      <th className="pb-2 pr-4">Pengirim</th>
                      <th className="pb-2 pr-4">Kategori Aspek</th>
                      <th className="pb-2 pr-4">Aspirasi / Aduan Masalah</th>
                      <th className="pb-2 pr-4">Status Tindakan BPD</th>
                      <th className="pb-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a, i) => (
                      <tr key={a.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-3 pr-4 text-center text-slate-400 font-mono text-xs">{i + 1}</td>
                        <td className="py-3 pr-4 text-xs text-slate-500 font-mono">{new Date(a.createdAt).toLocaleDateString('id-ID')}</td>
                        <td className="py-3 pr-4 font-semibold text-slate-700">{a.warga?.nama || 'Warga'}</td>
                        <td className="py-3 pr-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700">
                            {a.kategori}
                          </span>
                        </td>
                        <td className="py-3 pr-4 text-slate-600 text-xs md:text-sm leading-relaxed">{a.isi}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            a.status === 'Ditindaklanjuti' ? 'bg-green-100 text-green-700' :
                            a.status === 'Proses' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {a.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEdit(a)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(a.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
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

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-bold text-lg">{editingData ? 'Edit Status Aspirasi' : 'Tambah Aspirasi'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori *</label>
                <select
                  value={formData.kategori || 'Infrastruktur'}
                  onChange={e => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="Infrastruktur">Infrastruktur</option>
                  <option value="Ekonomi">Ekonomi / UMKM</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Layanan Publik">Layanan Publik</option>
                  <option value="Keamanan">Keamanan</option>
                  <option value="Pertanian">Pertanian</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul *</label>
                <input
                  type="text"
                  required
                  value={formData.judul || ''}
                  onChange={e => setFormData({ ...formData, judul: e.target.value })}
                  placeholder="Judul aspirasi"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Isi Aspirasi *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.isi || ''}
                  onChange={e => setFormData({ ...formData, isi: e.target.value })}
                  placeholder="Detail aspirasi..."
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                <select
                  value={formData.status || 'Diterima'}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option value="Diterima">Diterima</option>
                  <option value="Proses">Proses</option>
                  <option value="Ditindaklanjuti">Ditindaklanjuti</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
