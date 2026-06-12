'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend,
  LineChart, Line,
} from 'recharts';
import { MapPin, TrendingUp, BarChart3, Award, Globe, Compass } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const COLOR = '#0d47a1';

const mapDesaData = [
  { id: 'desa-a', name: 'Desa Borneo Adat', x: 220, y: 120, index: 78.45, readiness: 75.20, maturity: 3.25, status: 'Mandiri', color: '#2e7d32', kec: 'Kec. Kahayan Tengah' },
  { id: 'desa-b', name: 'Desa Loksado Adat', x: 290, y: 160, index: 77.10, readiness: 74.00, maturity: 3.10, status: 'Mandiri', color: '#1565c0', kec: 'Kec. Loksado' },
  { id: 'desa-c', name: 'Desa Betang Jaya', x: 180, y: 80, index: 75.60, readiness: 73.15, maturity: 3.00, status: 'Maju', color: '#00838f', kec: 'Kec. Tewah' },
  { id: 'desa-d', name: 'Desa Rungan Sari', x: 140, y: 140, index: 74.20, readiness: 71.50, maturity: 2.95, status: 'Maju', color: '#e65100', kec: 'Kec. Rungan' },
  { id: 'desa-e', name: 'Desa Mentaya Hulu', x: 80, y: 110, index: 70.80, readiness: 68.20, maturity: 2.80, status: 'Berkembang', color: '#6a1b9a', kec: 'Kec. Mentaya Hulu' }
];

const multiDesaData = [
  { desa: 'Desa A', sli: 78, readiness: 75, qol: 77 },
  { desa: 'Desa B', sli: 72, readiness: 68, qol: 71 },
  { desa: 'Desa C', sli: 65, readiness: 60, qol: 63 },
  { desa: 'Desa D', sli: 81, readiness: 79, qol: 80 },
  { desa: 'Desa E', sli: 69, readiness: 65, qol: 67 },
  { desa: 'Desa F', sli: 75, readiness: 72, qol: 74 },
];

const readinessRadar = [
  { dim: 'Teknologi', nilai: 72 },
  { dim: 'Infrastruktur', nilai: 73 },
  { dim: 'SDM', nilai: 75 },
  { dim: 'Tata Kelola', nilai: 78 },
  { dim: 'Budaya', nilai: 80 },
];

const trendRegional = [
  { bln: 'Jan', avg: 70 }, { bln: 'Feb', avg: 71 }, { bln: 'Mar', avg: 71.5 },
  { bln: 'Apr', avg: 72 }, { bln: 'Mei', avg: 72.5 }, { bln: 'Jun', avg: 73 },
  { bln: 'Jul', avg: 73.5 }, { bln: 'Agu', avg: 74 }, { bln: 'Sep', avg: 74.5 },
  { bln: 'Okt', avg: 74.8 }, { bln: 'Nov', avg: 75 }, { bln: 'Des', avg: 75.6 },
];

const benchmarkData = [
  { rank: 1, desa: 'Desa D', sli: 81, mat: 3.8, status: 'Terdepan' },
  { rank: 2, desa: 'Desa A (Percontohan)', sli: 78, mat: 3.25, status: 'Berkembang' },
  { rank: 3, desa: 'Desa F', sli: 75, mat: 3.1, status: 'Berkembang' },
  { rank: 4, desa: 'Desa B', sli: 72, mat: 2.9, status: 'Rintisan' },
  { rank: 5, desa: 'Desa E', sli: 69, mat: 2.7, status: 'Rintisan' },
];

export default function DinasPMDDashboardPage() {
  const [hoveredDesa, setHoveredDesa] = useState<any>(null);
  const [selectedDesa, setSelectedDesa] = useState<any>(mapDesaData[0]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Regional Dinas PMD" modul="Monitoring Multi Desa — Kalimantan" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Rata-rata SLI" value="72,35" satuan="indeks regional" barColor="blue" progress={72}
          sparkData={[70,71,71.5,72,72.5,73,73.5,74,74.5,74.8,75,72.35]} trend="up" />
        <StatCard label="Maturity Level" value="3,10" satuan="level rata-rata" barColor="purple" progress={62} />
        <StatCard label="Readiness Score" value="75,60" satuan="skor kesiapan" barColor="green" progress={75} />
        <StatCard label="Desa Terpantau" value={24} satuan="dari 24 target" barColor="teal" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Interactive map */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Compass size={16} /> Peta Geospasial Interaktif Sebaran Desa Adat (Kalimantan Tengah)
              </CardTitle>
              <Link href="/dinas-pmd/monitoring-multi-desa" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Lihat Selengkapnya →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-[2/1] md:aspect-[3/2] bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
              {/* Map grid lines overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
              
              <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Custom glowing filters */}
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#0f172a" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#312e81" stopOpacity="0.25" />
                  </linearGradient>
                </defs>

                {/* Stylized island of Central Kalimantan */}
                <path
                  d="M 50,110 C 45,90 60,60 90,50 C 130,35 180,30 220,45 C 270,60 310,35 340,70 C 370,100 350,140 330,165 C 290,195 250,215 210,210 C 170,205 120,190 90,175 C 65,160 55,130 50,110 Z"
                  fill="url(#mapGrad)"
                  stroke="#1d4ed8"
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  className="opacity-75 animate-pulse"
                />

                {/* Outer styling glow outline */}
                <path
                  d="M 50,110 C 45,90 60,60 90,50 C 130,35 180,30 220,45 C 270,60 310,35 340,70 C 370,100 350,140 330,165 C 290,195 250,215 210,210 C 170,205 120,190 90,175 C 65,160 55,130 50,110 Z"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  className="opacity-40"
                />

                {/* Rivers / Regional boundaries */}
                <path d="M 220,45 L 210,120 L 210,210" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-50" />
                <path d="M 130,35 L 140,110 L 90,175" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-50" />
                <path d="M 270,60 L 260,130 L 330,165" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-50" />

                {/* Pins */}
                {mapDesaData.map((d) => {
                  const isHovered = hoveredDesa?.id === d.id;
                  const isSelected = selectedDesa?.id === d.id;
                  return (
                    <g
                      key={d.id}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredDesa(d)}
                      onMouseLeave={() => setHoveredDesa(null)}
                      onClick={() => setSelectedDesa(d)}
                    >
                      {/* Pulse Circle */}
                      <circle
                        cx={d.x}
                        cy={d.y}
                        r={isSelected ? "14" : "10"}
                        className={`animate-ping opacity-25`}
                        fill={d.color}
                      />
                      
                      {/* Interactive pin circle */}
                      <circle
                        cx={d.x}
                        cy={d.y}
                        r={isSelected ? "8" : "6"}
                        fill={d.color}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        filter={isHovered || isSelected ? "url(#glow)" : ""}
                        className="transition-all duration-300"
                      />
                      
                      {/* Small center core */}
                      <circle
                        cx={d.x}
                        cy={d.y}
                        r="2.5"
                        fill="#ffffff"
                      />

                      {/* Text label */}
                      <text
                        x={d.x}
                        y={d.y - 12}
                        textAnchor="middle"
                        fill={isSelected ? "#ffffff" : "#cbd5e1"}
                        fontSize="9"
                        fontWeight={isSelected ? "bold" : "normal"}
                        className="pointer-events-none select-none bg-slate-900 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                      >
                        {d.name.replace('Desa ', '')}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend overlay */}
              <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-400 space-y-1">
                <p className="font-bold text-slate-200">Keterangan Status:</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-600 border border-white" />
                  <span>Mandiri</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-white" />
                  <span>Maju</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 border border-white" />
                  <span>Berkembang</span>
                </div>
              </div>

              {/* Selected Village Detail Card Overlay */}
              {selectedDesa && (
                <div className="absolute top-3 right-3 w-44 md:w-52 bg-slate-950/95 backdrop-blur-sm p-3 rounded-lg border border-slate-800 text-xs text-slate-300 shadow-xl space-y-2">
                  <div className="border-b border-slate-800 pb-1.5">
                    <h4 className="font-black text-slate-100 text-sm truncate">{selectedDesa.name}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{selectedDesa.kec}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-y-1 text-[10px]">
                    <span className="text-slate-500">SLV Index:</span>
                    <span className="font-bold text-indigo-400 text-right">{selectedDesa.index.toFixed(2)}</span>
                    <span className="text-slate-500">Readiness:</span>
                    <span className="font-bold text-blue-400 text-right">{selectedDesa.readiness.toFixed(2)}</span>
                    <span className="text-slate-500">Maturity:</span>
                    <span className="font-bold text-purple-400 text-right">Lvl {selectedDesa.maturity.toFixed(2)}</span>
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[9px]">
                    <span className={`px-1.5 py-0.5 rounded-full font-black text-white`} style={{ backgroundColor: selectedDesa.color }}>
                      {selectedDesa.status}
                    </span>
                    <Link href="/dinas-pmd/monitoring-multi-desa" className="text-blue-400 hover:underline">
                      Detail →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Radar Readiness */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <TrendingUp size={16} /> Profil Readiness 5 Dimensi Regional
              </CardTitle>
              <Link href="/dinas-pmd/readiness-dashboard" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Detail →
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center items-center h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={readinessRadar}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 8, fill: '#94a3b8' }} />
                <Radar name="Nilai Regional" dataKey="nilai" stroke="#0d47a1" fill="#0d47a1" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Multi-desa Bar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <BarChart3 size={16} /> Perbandingan SLI Antar Desa
              </CardTitle>
              <Link href="/dinas-pmd/monitoring-multi-desa" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Lihat Selengkapnya →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={multiDesaData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="desa" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[55, 90]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="sli" name="Smart Living Index" fill="#0d47a1" radius={[3,3,0,0]} />
                <Bar dataKey="readiness" name="Readiness Score" fill="#1565c0" radius={[3,3,0,0]} />
                <Bar dataKey="qol" name="QoL Index" fill="#90caf9" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tren Regional */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <TrendingUp size={16} /> Tren Rata-rata Smart Living Index Regional (12 Bulan)
              </CardTitle>
              <Link href="/dinas-pmd/benchmarking-desa" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Lihat Selengkapnya →
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendRegional} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="bln" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[68, 78]} tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(v: number) => [`${v}`, 'SLI Avg']} />
                <Line type="monotone" dataKey="avg" name="SLI Regional" stroke="#0d47a1" strokeWidth={3} dot={{ r: 3, fill: '#0d47a1' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Benchmarking Ranking */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Benchmarking Peringkat Desa
            </CardTitle>
            <Link href="/dinas-pmd/benchmarking-desa" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Lihat Selengkapnya →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-xs text-slate-500 uppercase tracking-wider">
                  <th className="pb-2 pr-4 text-center">Rank</th>
                  <th className="pb-2 pr-4">Desa</th>
                  <th className="pb-2 pr-4 text-right">SLI</th>
                  <th className="pb-2 pr-4 text-right">Maturity</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {benchmarkData.map((b, i) => (
                  <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                    <td className="py-2.5 pr-4 text-center">
                      <span className={`w-6 h-6 inline-flex items-center justify-center rounded-full text-xs font-black text-white ${i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-slate-400' : i === 2 ? 'bg-amber-700' : 'bg-slate-200 !text-slate-600'}`}>
                        {b.rank}
                      </span>
                    </td>
                    <td className="py-2.5 pr-4 font-semibold text-slate-700">{b.desa}</td>
                    <td className="py-2.5 pr-4 text-right font-mono font-bold text-indigo-700">{b.sli}</td>
                    <td className="py-2.5 pr-4 text-right font-mono text-slate-600">{b.mat}</td>
                    <td className="py-2.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${b.status === 'Terdepan' ? 'bg-green-100 text-green-700' : b.status === 'Berkembang' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
