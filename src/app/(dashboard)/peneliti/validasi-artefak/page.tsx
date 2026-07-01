'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Shield, CheckCircle2, Star, FileCheck, Clock } from 'lucide-react';

const COLOR = '#1a365d';

const artefakData = [
  {
    no: 1,
    artefak: 'Artefak 1 — Readiness Framework',
    tipe: 'Framework',
    deskripsi: 'Kerangka konseptual SLV Readiness berbasis 7 dimensi dan 20 indikator',
    validatorNilai: [92.0, 90.5, 94.0],
    rataRata: 92.17,
    status: 'Valid',
  },
  {
    no: 2,
    artefak: 'Artefak 2 — Smart Living Model',
    tipe: 'Model',
    deskripsi: 'Model arsitektur Smart Living Village berbasis DSR untuk desa adat',
    validatorNilai: [88.0, 91.0, 93.5],
    rataRata: 90.83,
    status: 'Valid',
  },
  {
    no: 3,
    artefak: 'Artefak 3 — Architecture Blueprint',
    tipe: 'Blueprint',
    deskripsi: 'Cetak biru arsitektur sistem informasi desa berbasis web dan mobile',
    validatorNilai: [95.0, 92.0, 90.0],
    rataRata: 92.33,
    status: 'Valid',
  },
  {
    no: 4,
    artefak: 'Artefak 4 — DSS Engine & Recommendation',
    tipe: 'Engine',
    deskripsi: 'Mesin DSS dengan metode AHP untuk prioritas program Smart Village',
    validatorNilai: [90.0, 94.0, 92.0],
    rataRata: 92.00,
    status: 'Valid',
  },
  {
    no: 5,
    artefak: 'Artefak 5 — Dashboard Analytics',
    tipe: 'Dashboard',
    deskripsi: 'Dashboard web analitik untuk monitoring readiness, maturity, QoL & SDGs',
    validatorNilai: [93.0, 91.0, 95.0],
    rataRata: 93.00,
    status: 'Valid',
  },
  {
    no: 6,
    artefak: 'Artefak 6 — Web Prototype',
    tipe: 'Prototype',
    deskripsi: 'APL-SLV Borneo — Aplikasi web prototype Smart Living Village terintegrasi',
    validatorNilai: [94.0, 92.0, 93.0],
    rataRata: 93.00,
    status: 'Valid',
  },
];

function NilaiValidator({ nilai }: { nilai: number[] }) {
  return (
    <div className="flex gap-1">
      {nilai.map((n, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-[9px] text-gray-400">V{i + 1}</span>
          <span className="font-mono text-[11px] font-bold text-blue-700">{n.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}

export default function ValidasiArtefakPage() {
  const totalArtefak = artefakData.length;
  const artefakValid = artefakData.filter(a => a.status === 'Valid').length;
  const rataRataTotal = (artefakData.reduce((s, a) => s + a.rataRata, 0) / artefakData.length).toFixed(2);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Nilai Valid — Validasi Artefak" modul="Validasi & Evaluasi" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Artefak', value: `${totalArtefak}`, sub: 'Artefak DSR', color: COLOR, icon: FileCheck },
          { label: 'Artefak Valid', value: `${artefakValid} / ${totalArtefak}`, sub: '100% Valid', color: '#276749', icon: CheckCircle2 },
          { label: 'Rata-rata Nilai', value: rataRataTotal, sub: 'Dari 3 Validator', color: '#2b6cb0', icon: Star },
          { label: 'Validator Aktif', value: '3', sub: 'Ahli & Pakar', color: '#553c9a', icon: Shield },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                <Icon size={18} style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{kpi.label}</p>
                <p className="text-base font-black text-gray-900 leading-tight">{kpi.value}</p>
                <p className="text-[10px] text-gray-500">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traceability Artefak */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Shield size={16} /> Traceability Artefak 1 – 6 (DSR Framework)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            {artefakData.map((a, i) => (
              <div key={i} className="flex flex-col items-center text-center p-3 rounded-xl border-2 border-green-200 bg-green-50 relative">
                <div className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center mb-2">
                  <span className="text-white text-sm font-black">{a.no}</span>
                </div>
                <p className="text-[10px] font-bold text-slate-700 leading-tight">{a.tipe}</p>
                <div className="mt-1">
                  <CheckCircle2 size={14} className="text-green-600 mx-auto" />
                </div>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-[8px] text-white font-black">✓</span>
                </div>
              </div>
            ))}
          </div>

          {/* Flow panah */}
          <div className="hidden lg:flex items-center justify-center gap-1 mb-4 text-[10px] text-gray-400">
            {artefakData.map((a, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="px-2 py-1 bg-blue-100 rounded text-blue-700 font-bold text-[10px]">A{a.no}</div>
                {i < artefakData.length - 1 && <span className="text-gray-400">→</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabel Hasil Validasi */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <FileCheck size={16} /> Hasil Validasi Artefak — Nilai Validator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">No</th>
                  <th className="text-left py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">Artefak</th>
                  <th className="text-left py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">Deskripsi</th>
                  <th className="text-center py-2.5 px-3 text-[10px] font-bold text-blue-600 uppercase">Nilai Validator</th>
                  <th className="text-center py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">Rata-rata</th>
                  <th className="text-center py-2.5 px-3 text-[10px] font-bold text-gray-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {artefakData.map((a, i) => (
                  <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}>
                    <td className="py-3 px-3 text-center">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                        <span className="text-[10px] font-black text-blue-700">{a.no}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <p className="text-[12px] font-bold text-slate-800">{a.artefak}</p>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">{a.tipe}</span>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-slate-500 leading-snug max-w-[200px]">{a.deskripsi}</td>
                    <td className="py-3 px-3 text-center">
                      <NilaiValidator nilai={a.validatorNilai} />
                    </td>
                    <td className="py-3 px-3 text-center font-black text-blue-700 text-base">{a.rataRata.toFixed(2)}</td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="text-[11px] font-bold text-green-700">{a.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-blue-50 border-t-2 border-blue-200">
                  <td colSpan={4} className="py-2.5 px-3 text-[11px] font-bold text-blue-800">Total Rata-rata Nilai Validasi</td>
                  <td className="py-2.5 px-3 text-center text-base font-black text-blue-800">{rataRataTotal}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-600 text-white">6/6 Valid</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
