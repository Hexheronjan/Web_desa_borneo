'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Calendar, Clock, MapPin, Landmark } from 'lucide-react';

const COLOR = '#2e7d32';

const events = [
  { date: '21 Jun 2026', time: '09:00 - 15:00 WIB', title: 'Musyawarah Adat Kerapatan Kedamangan', desc: 'Rapat koordinasi batas tanah adat ulin bersama pemerintah kecamatan.', lokasi: 'Balai Adat Utama RT 02', status: 'Rapat Adat' },
  { date: '15 Jul 2026', time: '08:00 - Selesai', title: 'Upacara Adat Tiwah Massal Borneo', desc: 'Upacara ritual rukun kematian tingkat akhir menyucikan arwah leluhur.', lokasi: 'Pemakaman Adat Suku Dayak', status: 'Ritual Budaya' },
  { date: '17 Agt 2026', time: '10:00 - 17:00 WIB', title: 'Pesta Panen Handep Hapakat', desc: 'Gotong royong syukuran panen padi dan kerajinan anyaman rotan.', lokasi: 'Lapangan Adat Desa', status: 'Festival Rakyat' }
];

const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export default function KalenderAdatPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Kalender Adat & Kegiatan Budaya" modul="Lembaga Adat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kegiatan Terjadwal" value={3} satuan="agenda terdekat" barColor="green" progress={90} />
        <StatCard label="Ritual Adat Besar" value={1} satuan="tiwah massal" barColor="teal" progress={50} />
        <StatCard label="Pesta Rakyat" value={1} satuan="festival panen" barColor="orange" progress={50} />
        <StatCard label="Rapat Koordinasi" value={1} satuan="sidang damang" barColor="blue" progress={50} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Daftar Kegiatan Adat Tahunan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((ev, i) => (
              <div key={i} className="p-4 border rounded-xl bg-slate-50/50 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 font-mono block mb-1">{ev.date}</span>
                    <p className="font-bold text-slate-800 text-sm md:text-base">{ev.title}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700">
                    {ev.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">{ev.desc}</p>
                <div className="flex flex-col md:flex-row md:items-center gap-3 text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1"><Clock size={12} /> {ev.time}</span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {ev.lokasi}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} /> Sekilas Kegiatan Adat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Kegiatan adat dipandu langsung oleh Damang Kepala Adat dan didokumentasikan di arsip desa.</p>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="font-bold text-amber-800 mb-1 flex items-center gap-1">🗓️ Agenda Rutin Bulanan</p>
              <p>Rapat Kerapatan Mantir diadakan pada minggu pertama setiap bulan di Sekretariat Adat.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
