'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { GraduationCap, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const COLOR = '#1565c0';

interface Siswa {
  id: string;
  nisn: string;
  nama: string;
  kelas: string;
  jenjang: string;
  status: string;
}

export default function DataSiswaPage() {
  const [search, setSearch] = useState('');
  const [dataSiswa, setDataSiswa] = useState<Siswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Siswa | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/siswa');
      const result = await res.json();
      if (result.success) setDataSiswa(result.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingData(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (data: Siswa) => {
    setEditingData(data);
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const res = await fetch(`/api/siswa?id=${id}`, { method: 'DELETE' });
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
      const res = await fetch('/api/siswa', {
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

  const filtered = dataSiswa.filter(s =>
    s.nama.toLowerCase().includes(search.toLowerCase()) ||
    s.nisn.includes(search) ||
    s.jenjang.toLowerCase().includes(search.toLowerCase())
  );

  const sdCount = filtered.filter(s => s.jenjang === 'SD').length;
  const smpCount = filtered.filter(s => s.jenjang === 'SMP').length;
  const smaCount = filtered.filter(s => s.jenjang === 'SMA').length;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Siswa & Pelajar" modul="Guru / Fasilitator Belajar" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Siswa" value={filtered.length} satuan="siswa" barColor="blue" progress={90} />
        <StatCard label="Siswa SD" value={sdCount} satuan="siswa" barColor="blue" progress={filtered.length > 0 ? (sdCount / filtered.length) * 100 : 0} />
        <StatCard label="Siswa SMP" value={smpCount} satuan="siswa" barColor="purple" progress={filtered.length > 0 ? (smpCount / filtered.length) * 100 : 0} />
        <StatCard label="Siswa SMA" value={smaCount} satuan="siswa" barColor="orange" progress={filtered.length > 0 ? (smaCount / filtered.length) * 100 : 0} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <GraduationCap size={16} /> Database Siswa Terdaftar di Wilayah Desa Adat
              </CardTitle>
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                >
                  <Plus size={12} /> Tambah Data
                </button>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari siswa..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 w-48"
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
                      <th className="pb-2 pr-4">NISN</th>
                      <th className="pb-2 pr-4">Nama Siswa</th>
                      <th className="pb-2 pr-4">Kelas</th>
                      <th className="pb-2 pr-4">Jenjang</th>
                      <th className="pb-2 pr-4">Status</th>
                      <th className="pb-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s, i) => (
                      <tr key={s.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{i + 1}</td>
                        <td className="py-2.5 pr-4 font-mono text-xs text-slate-600">{s.nisn}</td>
                        <td className="py-2.5 pr-4 font-semibold text-slate-700">{s.nama}</td>
                        <td className="py-2.5 pr-4 text-slate-600 text-xs">{s.kelas}</td>
                        <td className="py-2.5 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.jenjang === 'SD' ? 'bg-blue-100 text-blue-700' :
                            s.jenjang === 'SMP' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {s.jenjang}
                          </span>
                        </td>
                        <td className="py-2.5 pr-4">
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            {s.status}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEdit(s)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(s.id)}
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
              <h2 className="font-bold text-lg">{editingData ? 'Edit Data Siswa' : 'Tambah Data Siswa'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">NISN *</label>
                <input
                  type="text"
                  required
                  value={formData.nisn || ''}
                  onChange={e => setFormData({ ...formData, nisn: e.target.value })}
                  placeholder="Masukkan NISN"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Siswa *</label>
                <input
                  type="text"
                  required
                  value={formData.nama || ''}
                  onChange={e => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Nama lengkap siswa"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kelas *</label>
                <input
                  type="text"
                  required
                  value={formData.kelas || ''}
                  onChange={e => setFormData({ ...formData, kelas: e.target.value })}
                  placeholder="Contoh: Kelas VII-A"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jenjang *</label>
                <select
                  value={formData.jenjang || 'SD'}
                  onChange={e => setFormData({ ...formData, jenjang: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                <select
                  value={formData.status || 'Aktif'}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Non-Aktif">Non-Aktif</option>
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
                  className="px-6 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
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
