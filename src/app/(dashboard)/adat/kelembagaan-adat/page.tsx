'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Users, Shield, Award, Landmark } from 'lucide-react';

const COLOR = '#2e7d32';

const pengurusList = [
  { nama: 'Damang Buyung', jabatan: 'Damang Kepala Adat Ngaju', wilayah: 'Dusun Kedamangan Tengah', status: 'Aktif' },
  { nama: 'Mantir Hasan', jabatan: 'Mantir Adat / Wakil Damang', wilayah: 'Dusun Betang Hilir', status: 'Aktif' },
  { nama: 'Mantir Rina', jabatan: 'Mantir Adat Bidang Perempuan', wilayah: 'Dusun Rungan Barat', status: 'Aktif' },
  { nama: 'Pangkalima Nyahu', jabatan: 'Pangkalima / Pengawal Adat', wilayah: 'Kawasan Hutan Adat', status: 'Aktif' },
  { nama: 'Mantir Budi', jabatan: 'Mantir Adat Bidang Konflik', wilayah: 'Dusun Mahakam Hulu', status: 'Aktif' }
];

export default function KelembagaanAdatPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Kelembagaan Adat" modul="Lembaga Adat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pengurus" value={24} satuan="tokoh aktif" barColor="green" progress={85} />
        <StatCard label="Damang Wilayah" value={1} satuan="kepala adat" barColor="blue" progress={100} />
        <StatCard label="Mantir Adat" value={18} satuan="perwakilan dusun" barColor="teal" progress={75} />
        <StatCard label="Pangkalima" value={5} satuan="pengawal adat" barColor="orange" progress={50} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Struktur Kepengurusan Lembaga Kedamangan Adat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4">Nama Lengkap</th>
                    <th className="pb-2 pr-4">Jabatan Adat</th>
                    <th className="pb-2 pr-4">Wilayah Tugas</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pengurusList.map((p, i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{p.nama}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-500 font-medium">{p.jabatan}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-600">{p.wilayah}</td>
                      <td className="py-2.5">
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {p.status}
                        </span>
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
              <Shield size={16} /> Peran Kedamangan Adat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>Berdasarkan Peraturan Daerah, Kedamangan Adat Dayak memiliki tugas dan fungsi konstitusional:</p>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="font-bold text-amber-800 mb-1">Fungsi Utama</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Melestarikan hukum adat lokal.</li>
                <li>Menyelesaikan perselisihan adat warga.</li>
                <li>Memberikan status legitimasi adat pada kegiatan tradisi.</li>
              </ul>
            </div>
            <p className="pt-2 border-t text-[10px] text-slate-400">
              *Keputusan hukum Kedamangan bersifat final dan mengikat secara adat di tingkat desa.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
