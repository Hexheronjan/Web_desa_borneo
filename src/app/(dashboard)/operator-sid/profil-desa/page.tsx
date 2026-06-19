'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { MapPin, Building2, Users, Phone, Mail, Edit, Save } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#00695c';

export default function ProfilDesaPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    namaDesa: 'Desa Adat Borneo',
    kodeDesa: '6201010001',
    kodePos: '74311',
    kecamatan: 'Kecamatan Tumbang Samba',
    kabupaten: 'Kabupaten Pulang Pisau',
    provinsi: 'Provinsi Kalimantan Tengah',
    luasWilayah: '125.5',
    jumlahPenduduk: '2847',
    jumlahKepalaKeluarga: '712',
    jumlahRT: '12',
    jumlahRW: '4',
    tahunBentuk: '1985',
    nipPerangkatDesa: '198501012005001',
    telepon: '(0536) 234567',
    email: 'admin@desaborneo.id',
    website: 'www.desaborneo.id',
    latitude: '-1.2345',
    longitude: '113.6789',
  });

  const handleSave = () => {
    alert('Data profil desa berhasil disimpan');
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Profil Desa" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Luas Wilayah" value="125.5" satuan="km²" barColor="green" progress={80} />
        <StatCard label="Kepadatan" value="22.7" satuan="jiwa/km²" barColor="blue" progress={65} />
        <StatCard label="Jumlah RT" value={12} satuan="RT" barColor="purple" progress={100} />
        <StatCard label="Jumlah RW" value={4} satuan="RW" barColor="orange" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Informasi Dasar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Building2 size={16} /> Informasi Administratif Desa
              </CardTitle>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1.5 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-1"
              >
                {isEditing ? <Save size={12} /> : <Edit size={12} />}
                {isEditing ? 'Simpan' : 'Edit'}
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Nama Desa</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.namaDesa}
                    onChange={(e) => setFormData({ ...formData, namaDesa: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.namaDesa}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Kode Desa</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.kodeDesa}
                    onChange={(e) => setFormData({ ...formData, kodeDesa: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800 font-mono">{formData.kodeDesa}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Kode Pos</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.kodePos}
                    onChange={(e) => setFormData({ ...formData, kodePos: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.kodePos}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Kecamatan</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.kecamatan}
                    onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.kecamatan}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Kabupaten</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.kabupaten}
                    onChange={(e) => setFormData({ ...formData, kabupaten: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.kabupaten}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Provinsi</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.provinsi}
                    onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.provinsi}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kontak */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Phone size={16} /> Informasi Kontak
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Telepon</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.telepon}
                  onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800">{formData.telepon}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800">{formData.email}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Website</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800">{formData.website}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demografi & Geografi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Data Demografi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Jumlah Penduduk</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.jumlahPenduduk}
                    onChange={(e) => setFormData({ ...formData, jumlahPenduduk: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.jumlahPenduduk} jiwa</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Kepala Keluarga</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.jumlahKepalaKeluarga}
                    onChange={(e) => setFormData({ ...formData, jumlahKepalaKeluarga: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.jumlahKepalaKeluarga} KK</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Jumlah RT</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.jumlahRT}
                    onChange={(e) => setFormData({ ...formData, jumlahRT: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.jumlahRT} RT</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Jumlah RW</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.jumlahRW}
                    onChange={(e) => setFormData({ ...formData, jumlahRW: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.jumlahRW} RW</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <MapPin size={16} /> Koordinat Geografis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Latitude</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800 font-mono">{formData.latitude}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Longitude</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800 font-mono">{formData.longitude}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-slate-500 mb-1 block">Luas Wilayah</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.luasWilayah}
                    onChange={(e) => setFormData({ ...formData, luasWilayah: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.luasWilayah} km²</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Perangkat Desa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Building2 size={16} /> Data Perangkat Desa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Tahun Terbentuk</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.tahunBentuk}
                  onChange={(e) => setFormData({ ...formData, tahunBentuk: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800">{formData.tahunBentuk}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">NIP Perangkat Desa</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.nipPerangkatDesa}
                  onChange={(e) => setFormData({ ...formData, nipPerangkatDesa: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800 font-mono">{formData.nipPerangkatDesa}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}