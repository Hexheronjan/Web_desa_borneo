'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Server, Cpu, HardDrive, Database, CheckCircle, RefreshCw } from 'lucide-react';

const COLOR = '#1a237e';

const metrics = [
  { name: 'Core Processor (CPU)', val: '48%', sub: '2.4 GHz - 4 Cores', status: 'Sehat', desc: 'Penggunaan prosesor stabil. Suhu core berkisar 42°C (Normal).', barColor: 'bg-green-500', pct: 48 },
  { name: 'Memory (RAM)', val: '65%', sub: '5.2 GB / 8.0 GB', status: 'Sehat', desc: 'Cache sistem aktif. Penggunaan memori optimal untuk Node.js.', barColor: 'bg-green-500', pct: 65 },
  { name: 'SSD Storage (Disk)', val: '58%', sub: '29 GB / 50 GB', status: 'Sehat', desc: 'Penyimpanan aman. I/O Speed berkisar 520 MB/s (Sangat Cepat).', barColor: 'bg-green-500', pct: 58 },
  { name: 'Database (PostgreSQL)', val: '120 MB', sub: 'Active Connections: 14', status: 'Sehat', desc: 'Pool koneksi aman. Transaksi read/write database lancar tanpa bottleneck.', barColor: 'bg-green-500', pct: 30 }
];

export default function MonitoringSistemPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Monitoring Sistem" modul="Modul 14: System Monitoring" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Server Status" value="Online" satuan="Uptime 99.92%" barColor="green" progress={99} />
        <StatCard label="Response Time" value="124 ms" satuan="sangat cepat" barColor="green" progress={95} />
        <StatCard label="Active Websockets" value={42} satuan="koneksi" barColor="blue" progress={42} />
        <StatCard label="Database Health" value="100%" satuan="sinkron" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {metrics.map((m, i) => (
          <Card key={i}>
            <CardHeader className="border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  {i === 0 ? <Cpu size={16} className="text-green-600" /> :
                   i === 1 ? <Server size={16} className="text-green-600" /> :
                   i === 2 ? <HardDrive size={16} className="text-green-600" /> :
                             <Database size={16} className="text-green-600" />}
                  {m.name}
                </CardTitle>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle size={10} /> {m.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-black text-slate-800 font-mono">{m.val}</span>
                <span className="text-xs text-slate-400 font-mono">{m.sub}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div className={`h-full rounded-full ${m.barColor} transition-all`} style={{ width: `${m.pct}%` }} />
              </div>
              <p className="text-xs text-slate-500 leading-normal">{m.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
