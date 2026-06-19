'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { MapPin, Building2, Users, Phone, Mail, Edit, Save, History, Target, Award, Landmark } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

export default function ProfilDesaPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    namaDesa: 'Desa Adat Lung Anai',
    kodeDesa: '6201010001',
    kodePos: '74311',
    kecamatan: 'Kecamatan Tumbang Samba',
    kabupaten: 'Kabupaten Pulang Pisau',
    provinsi: 'Provinsi Kalimantan Tengah',
    luasWilayah: '125.5',
    jumlahPenduduk: '2847',
    tahunBentuk: '1985',
    telepon: '(0536) 234567',
    email: 'admin@lunganai.id',
    visi: 'Mewujudkan Desa Adat Lung Anai yang Berdaulat, Berbudaya, dan Sejahtera melalui Penerapan Smart Living Village berbasis Kearifan Lokal Dayak Borneo',
    misi: '1. Melestarikan budaya adat Dayak Borneo melalui dokumentasi dan revitalisasi Huma Betang\n2. Meningkatkan kualitas hidup masyarakat melalui pemanfaatan teknologi digital yang sesuai dengan kearifan lokal\n3. Mewujudkan tata kelola desa yang transparan, akuntabel, dan partisipatif\n4. Mengembangkan ekonomi desa berbasis potensi lokal dan budaya adat\n5. Menjaga keberlanjutan lingkungan melalui pengelolaan hutan adat yang berkelanjutan',
    sejarah: 'Desa Adat Lung Anai berdiri pada tahun 1985 sebagai pemekaran dari desa induk. Nama "Lung Anai" diambil dari nama sungai yang mengalir di wilayah desa, yang dalam bahasa Dayak Ngaju berarti "air yang mengalir tenang". Desa ini terkenal dengan keberadaan Rumah Betang tradisional yang masih terawat dengan baik dan menjadi simbol kearifan lokal suku Dayak.',
    budayaUnggulan: 'Huma Betang Tradisional, Tari Gantar, Anyaman Rotan, Tenun Ikat, Musik Tradisional Karungut',
    potensiWisata: 'Wisata Budaya Dayak, Ekowisata Hutan Adat, Festival Tiwah, Wisata Bahari Kahayan',
    perangkatDesa: {
      kepalaDesa: 'Damang Buyung',
      nipKepalaDesa: '198501012005001',
      sekretarisDesa: 'Ibu Siti Nurhaliza',
      nipSekretaris: '199001012010001',
    },
  });

  const handleSave = () => {
    alert('Data profil desa berhasil disimpan');
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Profil Desa Lung Anai" modul="Pemerintah Desa" color={COLOR} />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-blue-800 rounded-2xl p-6 md:p-8 text-white overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{formData.namaDesa}</h1>
          <p className="text-sm md:text-base opacity-90 mb-4">{formData.kabupaten}, {formData.provinsi}</p>
          <div className="flex flex-wrap gap-3 text-xs">
            <span className="px-3 py-1 bg-white/20 rounded-full flex items-center gap-1">
              <Users size={12} /> {formData.jumlahPenduduk} Jiwa
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full flex items-center gap-1">
              <MapPin size={12} /> {formData.luasWilayah} km²
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full flex items-center gap-1">
              <History size={12} /> Berdiri {formData.tahunBentuk}
            </span>
          </div>
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 opacity-10">
          <Landmark size={128} />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Indeks Smart Living" value="78.5" satuan="skor" barColor="green" progress={78} />
        <StatCard label="Maturity Level" value="3.2" satuan="level 5" barColor="blue" progress={64} />
        <StatCard label="Quality of Life" value="76.8" satuan="skor" barColor="purple" progress={77} />
        <StatCard label="Keuangan Desa" value="Rp 1.25M" satuan="APBDes 2025" barColor="orange" progress={85} />
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1"
        >
          {isEditing ? <Save size={14} /> : <Edit size={14} />}
          {isEditing ? 'Simpan Perubahan' : 'Edit Profil'}
        </button>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Target size={16} /> Visi Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <textarea
                value={formData.visi}
                onChange={(e) => setFormData({ ...formData, visi: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 min-h-[100px]"
              />
            ) : (
              <p className="text-sm text-slate-700 leading-relaxed italic">{formData.visi}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Misi Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <textarea
                value={formData.misi}
                onChange={(e) => setFormData({ ...formData, misi: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 min-h-[150px]"
              />
            ) : (
              <div className="text-sm text-slate-700 leading-relaxed space-y-2">
                {formData.misi.split('\n').map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sejarah & Budaya */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <History size={16} /> Sejarah Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <textarea
                value={formData.sejarah}
                onChange={(e) => setFormData({ ...formData, sejarah: e.target.value })}
                className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 min-h-[150px]"
              />
            ) : (
              <p className="text-sm text-slate-700 leading-relaxed">{formData.sejarah}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} /> Budaya Unggulan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Budaya Unggulan</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.budayaUnggulan}
                    onChange={(e) => setFormData({ ...formData, budayaUnggulan: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.budayaUnggulan}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Potensi Wisata</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.potensiWisata}
                    onChange={(e) => setFormData({ ...formData, potensiWisata: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                ) : (
                  <p className="text-sm font-semibold text-slate-800">{formData.potensiWisata}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informasi Administratif */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Building2 size={16} /> Informasi Administratif
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Kode Desa</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.kodeDesa}
                  onChange={(e) => setFormData({ ...formData, kodeDesa: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800 font-mono">{formData.kodeDesa}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Kecamatan</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.kecamatan}
                  onChange={(e) => setFormData({ ...formData, kecamatan: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800">{formData.provinsi}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Telepon</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.telepon}
                  onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
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
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800">{formData.email}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Perangkat Desa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Users size={16} /> Perangkat Desa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Kepala Desa</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.perangkatDesa.kepalaDesa}
                  onChange={(e) => setFormData({ ...formData, perangkatDesa: { ...formData.perangkatDesa, kepalaDesa: e.target.value } })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800">{formData.perangkatDesa.kepalaDesa}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">NIP Kepala Desa</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.perangkatDesa.nipKepalaDesa}
                  onChange={(e) => setFormData({ ...formData, perangkatDesa: { ...formData.perangkatDesa, nipKepalaDesa: e.target.value } })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800 font-mono">{formData.perangkatDesa.nipKepalaDesa}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Sekretaris Desa</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.perangkatDesa.sekretarisDesa}
                  onChange={(e) => setFormData({ ...formData, perangkatDesa: { ...formData.perangkatDesa, sekretarisDesa: e.target.value } })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800">{formData.perangkatDesa.sekretarisDesa}</p>
              )}
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">NIP Sekretaris</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.perangkatDesa.nipSekretaris}
                  onChange={(e) => setFormData({ ...formData, perangkatDesa: { ...formData.perangkatDesa, nipSekretaris: e.target.value } })}
                  className="w-full px-3 py-2 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ) : (
                <p className="text-sm font-semibold text-slate-800 font-mono">{formData.perangkatDesa.nipSekretaris}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}