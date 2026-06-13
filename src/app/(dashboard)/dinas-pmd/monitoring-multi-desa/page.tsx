'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Landmark, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const COLOR = '#0d47a1';

interface MonitoringDesa {
  id: string;
  namaDesa: string;
  kecamatan: string;
  index: number;
  readiness: number;
  maturity: number;
  status: string;
}

export default function MonitoringMultiDesaPage() {
  const [search, setSearch] = useState('');
  const [dataDesa, setDataDesa] = useState<MonitoringDesa[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<MonitoringDesa | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/monitoring-desa');
      const result = await res.json();
      if (result.success) setDataDesa(result.data);
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

  const handleEdit = (data: MonitoringDesa) => {
    setEditingData(data);
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const res = await fetch(`/api/monitoring-desa?id=${id}`, { method: 'DELETE' });
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
      const res = await fetch('/api/monitoring-desa', {
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

  const filtered = dataDesa.filter(d =>
    d.namaDesa.toLowerCase().includes(search.toLowerCase()) ||
    d.kecamatan.toLowerCase().includes(search.toLowerCase())
  );

  const mandiriCount = filtered.filter(d => d.status === 'Mandiri').length;
  const majuCount = filtered.filter(d => d.status === 'Maju').length;
  const berkembangCount = filtered.filter(d => d.status === 'Berkembang').length;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Monitoring Multi Desa" modul="Monitoring Regional" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Desa Dimonitor" value={filtered.length} satuan="desa evaluasi" barColor="blue" progress={100} />
        <StatCard label="Status Mandiri" value={mandiriCount} satuan="desa" barColor="green" progress={filtered.length > 0 ? (mandiriCount / filtered.length) * 100 : 0} />
        <StatCard label="Status Maju" value={majuCount} satuan="desa" barColor="blue" progress={filtered.length > 0 ? (majuCount / filtered.length) * 100 : 0} />
        <StatCard label="Status Berkembang" value={berkembangCount} satuan="desa" barColor="orange" progress={filtered.length > 0 ? (berkembangCount / filtered.length) * 100 : 0} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Landmark size={16} /> Lembar Pemantauan Indikator Smart Living Lintas Wilayah
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
                    placeholder="Cari desa..."
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
                      <th className="pb-2 pr-4">Nama Desa Adat</th>
                      <th className="pb-2 pr-4">Wilayah Kecamatan</th>
                      <th className="pb-2 pr-4 text-right">Smart Living Index</th>
                      <th className="pb-2 pr-4 text-right">Readiness Score</th>
                      <th className="pb-2 pr-4 text-right">Maturity Level</th>
                      <th className="pb-2 text-center">Status IDM</th>
                      <th className="pb-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((d, i) => (
                      <tr key={d.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{i + 1}</td>
                        <td className="py-2.5 pr-4 font-semibold text-slate-700">{d.namaDesa}</td>
                        <td className="py-2.5 pr-4 text-xs text-slate-500">{d.kecamatan}</td>
                        <td className="py-2.5 pr-4 text-right font-bold font-mono text-xs text-indigo-700">{d.index.toFixed(2)}</td>
                        <td className="py-2.5 pr-4 text-right font-mono text-xs text-slate-600">{d.readiness.toFixed(2)}</td>
                        <td className="py-2.5 pr-4 text-right font-mono text-xs text-slate-600">{d.maturity.toFixed(2)}</td>
                        <td className="py-2.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            d.status === 'Mandiri' ? 'bg-green-100 text-green-700' :
                            d.status === 'Maju' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEdit(d)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(d.id)}
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
              <h2 className="font-bold text-lg">{editingData ? 'Edit Data Desa' : 'Tambah Data Desa'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Desa *</label>
                <input
                  type="text"
                  required
                  value={formData.namaDesa || ''}
                  onChange={e => setFormData({ ...formData, namaDesa: e.target.value })}
                  placeholder="Nama desa"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kecamatan *</label>
                <input
                  type="text"
                  required
                  value={formData.kecamatan || ''}
                  onChange={e => setFormData({ ...formData, kecamatan: e.target.value })}
                  placeholder="Kecamatan"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Smart Living Index *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.index || ''}
                  onChange={e => setFormData({ ...formData, index: parseFloat(e.target.value) })}
                  placeholder="0.00"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Readiness Score *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.readiness || ''}
                  onChange={e => setFormData({ ...formData, readiness: parseFloat(e.target.value) })}
                  placeholder="0.00"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Maturity Level *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.maturity || ''}
                  onChange={e => setFormData({ ...formData, maturity: parseFloat(e.target.value) })}
                  placeholder="0.00"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status *</label>
                <select
                  value={formData.status || 'Berkembang'}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="Mandiri">Mandiri</option>
                  <option value="Maju">Maju</option>
                  <option value="Berkembang">Berkembang</option>
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
