'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Wallet, Search, Filter, Download, Plus, ShoppingBag, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createUmkm, updateUmkm, deleteUmkm } from '@/actions/umkm';

const COLOR = '#00695c';

interface UmkmType {
  id: string;
  nama: string;
  pemilik: string;
  bidang: string;
  omset: string;
  status: string;
}

const initialUmkm: UmkmType[] = [
  { id: 'UMKM001', nama: 'Kerajinan Anyaman Rotan Dayak', pemilik: 'Ibu Buyung', bidang: 'Kerajinan', omset: 'Rp 4.500.000 / bln', status: 'Aktif' },
  { id: 'UMKM002', nama: 'Tenun Ikat Benang Bintik', pemilik: 'Ibu Kartini Sari', bidang: 'Tekstil', omset: 'Rp 6.200.000 / bln', status: 'Aktif' },
  { id: 'UMKM003', nama: 'Kuliner Khas Borneo Lestari', pemilik: 'Bapak Rudi', bidang: 'Kuliner', omset: 'Rp 3.800.000 / bln', status: 'Aktif' },
  { id: 'UMKM004', nama: 'Obat Herbal Pasak Bumi', pemilik: 'Bapak Hasan', bidang: 'Kesehatan', omset: 'Rp 8.500.000 / bln', status: 'Aktif' },
  { id: 'UMKM005', nama: 'Budidaya Madu Kelulut Adat', pemilik: 'Rudi Hartono', bidang: 'Pertanian', omset: 'Rp 2.900.000 / bln', status: 'Aktif' }
];

export default function DataEkonomiPage() {
  const [search, setSearch] = useState('');
  const [dataUmkm, setDataUmkm] = useState<UmkmType[]>(initialUmkm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUmkm, setEditingUmkm] = useState<UmkmType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    pemilik: '',
    bidang: '',
    omset: '',
    status: 'Aktif'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/umkm');
      const result = await res.json();
      if (result.success && result.data.length > 0) {
        setDataUmkm(result.data);
      }
    } catch (error) {
      console.log('Menggunakan data sementara');
    }
  };

  const filtered = dataUmkm.filter(u =>
    u.nama.toLowerCase().includes(search.toLowerCase()) ||
    u.pemilik.toLowerCase().includes(search.toLowerCase()) ||
    u.bidang.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingUmkm(null);
    setFormData({ nama: '', pemilik: '', bidang: '', omset: '', status: 'Aktif' });
    setIsModalOpen(true);
  };

  const handleEdit = (umkm: UmkmType) => {
    setEditingUmkm(umkm);
    setFormData({
      nama: umkm.nama,
      pemilik: umkm.pemilik,
      bidang: umkm.bidang,
      omset: umkm.omset,
      status: umkm.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const res = await deleteUmkm(id);
      if (res.success) {
        alert('Data berhasil dihapus');
        setDataUmkm(dataUmkm.filter(u => u.id !== id));
      } else {
        setDataUmkm(dataUmkm.filter(u => u.id !== id));
        alert('Data berhasil dihapus (local)');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    let res;
    if (editingUmkm) {
      res = await updateUmkm(editingUmkm.id, formData);
    } else {
      res = await createUmkm(formData);
    }

    if (res.success) {
      alert(editingUmkm ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
      setIsModalOpen(false);
      
      if (editingUmkm) {
        setDataUmkm(dataUmkm.map(u => u.id === editingUmkm.id ? { ...u, ...formData } : u));
      } else {
        setDataUmkm([...dataUmkm, { ...formData, id: Date.now().toString() }]);
      }
    } else {
      alert(editingUmkm ? 'Data berhasil diperbarui (local)' : 'Data berhasil ditambahkan (local)');
      setIsModalOpen(false);
      
      if (editingUmkm) {
        setDataUmkm(dataUmkm.map(u => u.id === editingUmkm.id ? { ...u, ...formData } : u));
      } else {
        setDataUmkm([...dataUmkm, { ...formData, id: Date.now().toString() }]);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Ekonomi & UMKM" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total UMKM" value={dataUmkm.length} satuan="unit usaha" barColor="teal" progress={80} />
        <StatCard label="Omset Rata-rata" value="4.8M" satuan="Rp per bulan" barColor="green" progress={75} />
        <StatCard label="Pekerja Terserap" value={142} satuan="warga desa" barColor="blue" progress={68} />
        <StatCard label="Bantuan Modal" value={12} satuan="UMKM penerima" barColor="purple" progress={33} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <ShoppingBag size={16} /> Registri & Database UMKM Desa
              </CardTitle>
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="px-3 py-1.5 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-1"
                >
                  <Plus size={12} /> Tambah UMKM
                </button>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari UMKM..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-teal-100">
                    <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">ID</th>
                    <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Nama Usaha</th>
                    <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Pemilik</th>
                    <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Bidang</th>
                    <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Estimasi Omset</th>
                    <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Status</th>
                    <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={item.id} className={`border-b border-slate-100 hover:bg-teal-50/50 transition-colors ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 px-3 font-mono text-xs text-indigo-700 font-bold">{item.id.slice(0, 8)}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-700">{item.nama}</td>
                      <td className="py-2.5 px-3 text-slate-600 text-xs">{item.pemilik}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                          {item.bidang}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-xs text-slate-700">{item.omset}</td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Wallet size={16} /> Pendapatan Perkapita & Ekonomi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg">
              <p className="font-bold text-teal-800 mb-1">Rata-rata Pendapatan Keluarga</p>
              <p className="text-2xl font-black text-teal-900">Rp 3.250.000 <span className="text-xs font-normal text-slate-500">/ bulan</span></p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-lg">
              <p className="font-bold text-slate-700 mb-2">Sebaran Lapangan Pekerjaan</p>
              <div className="space-y-2">
                {[
                  { job: 'Pertanian & Perkebunan', pct: 58 },
                  { job: 'Karyawan / Buruh Swasta', pct: 22 },
                  { job: 'PNS & Aparatur Desa', pct: 8 },
                  { job: 'UMKM & Perdagangan', pct: 12 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-0.5 text-[11px]">
                      <span>{item.job}</span>
                      <span className="font-bold">{item.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isModalOpen && (
        <div key="modal-form" className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#00695c] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">{editingUmkm ? 'Edit Data UMKM' : 'Tambah Data UMKM'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Usaha *</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={e => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Pemilik *</label>
                <input
                  type="text"
                  required
                  value={formData.pemilik}
                  onChange={e => setFormData({ ...formData, pemilik: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Bidang Usaha *</label>
                <input
                  type="text"
                  required
                  value={formData.bidang}
                  onChange={e => setFormData({ ...formData, bidang: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Estimasi Omset</label>
                <input
                  type="text"
                  value={formData.omset}
                  onChange={e => setFormData({ ...formData, omset: e.target.value })}
                  placeholder="Rp X.XXX.XXX / bln"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
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
                  className="px-6 py-2 text-sm bg-[#00695c] hover:bg-[#004d40] text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : (editingUmkm ? 'Simpan' : 'Tambah')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
