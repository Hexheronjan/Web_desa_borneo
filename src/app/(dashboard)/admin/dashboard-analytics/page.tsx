'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BarChart3, TrendingUp, Calendar, RefreshCw, Star } from 'lucide-react';

const COLOR = '#1a237e';

const kpis = [
  { indicator: 'Kepatuhan Pelayanan Publik (SOP)', target: '90%', actual: '92.4%', state: 'Melampaui', color: 'bg-green-500' },
  { indicator: 'Waktu Respon Pengaduan Warga', target: '24 jam', actual: '18.5 jam', state: 'Melampaui', color: 'bg-green-500' },
  { indicator: 'Akurasi Pengolahan Data SID', target: '95%', actual: '98.0%', state: 'Melampaui', color: 'bg-green-500' },
  { indicator: 'Persentase Layanan Online Mandiri', target: '50%', actual: '42.6%', state: 'Perlu Usaha', color: 'bg-amber-500' },
  { indicator: 'Konsistensi Database Sync', target: '99%', actual: '99.9%', state: 'Melampaui', color: 'bg-green-500' },
  { indicator: 'Keandalan Server (Uptime)', target: '99.5%', actual: '99.92%', state: 'Melampaui', color: 'bg-green-500' }
];

export default function DashboardAnalyticsPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Analytics" modul="Modul 12: KPI Smart Living Analytics" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="KPI Tercapai" value="5 / 6" satuan="indikator" barColor="green" progress={83} />
        <StatCard label="Tingkat Layanan" value="92.4%" satuan="memuaskan" barColor="blue" progress={92} />
        <StatCard label="Sync Uptime" value="99.9%" satuan="realtime" barColor="purple" progress={99} />
        <StatCard label="Feedback Negatif" value="0.2%" satuan="sangat minim" barColor="green" progress={98} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <TrendingUp size={16} /> Analisis Kinerja KPI Smart Living
              </CardTitle>
              <button className="text-xs flex items-center gap-1 text-slate-500 hover:text-indigo-700">
                <RefreshCw size={12} /> Refresh Data
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {kpis.map((k, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>{k.indicator}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    k.state === 'Melampaui' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>{k.state}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${k.color}`} style={{ width: k.actual.includes('jam') ? '85%' : k.actual }} />
                  </div>
                  <div className="w-24 text-right text-xs">
                    <span className="text-slate-400 font-medium">Target: {k.target}</span>
                    <span className="block font-black text-slate-800">{k.actual}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Jadwal Evaluasi Berkala
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { date: '15 Jul 2026', agenda: 'Evaluasi Tengah Tahun SDGs Desa', state: 'Terjadwal' },
              { date: '01 Agt 2026', agenda: 'Audit Keamanan & Penyelarasan Hak Akses', state: 'Terjadwal' },
              { date: '10 Sep 2026', agenda: 'Survei Kepuasan Warga Periode II', state: 'Persiapan' },
              { date: '30 Des 2026', agenda: 'Laporan Kinerja Smart Village Akhir Tahun', state: 'Terjadwal' }
            ].map((ev, i) => (
              <div key={i} className="p-3 border rounded-lg bg-white">
                <div className="flex justify-between items-center mb-1 text-[10px]">
                  <span className="font-mono text-indigo-700 font-bold">{ev.date}</span>
                  <span className={`font-bold px-1.5 py-0.5 rounded-full ${
                    ev.state === 'Terjadwal' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-500'
                  }`}>{ev.state}</span>
                </div>
                <p className="text-xs font-semibold text-slate-700">{ev.agenda}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
