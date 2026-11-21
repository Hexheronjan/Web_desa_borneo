'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Layers, CheckCircle2, Info } from 'lucide-react';
import { ARTEFAK_6_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a237e';

export default function EvaluasiArtefakPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Evaluasi Enam Artefak Penelitian (DSRM — Bab IV)" modul="Penelitian &amp; Evaluasi" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <Info size={15} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Sesuai Bab IV (Tabel 4.21 &amp; 4.22), penelitian menghasilkan <strong>6 Artefak terintegrasi</strong> dari RQ1 hingga RQ3 dengan pemisahan gerbang bukti antara hasil konseptual, spesifikasi arsitektur, komputasi DSS, antarmuka, dan pengujian prototipe Web Final.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Layers size={16} /> Daftar Enam Artefak Smart Living Village (A1 – A6)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="font-bold">Kode</TableHead>
                  <TableHead className="font-bold">Nama Artefak</TableHead>
                  <TableHead className="font-bold">Tahap</TableHead>
                  <TableHead className="font-bold">Struktur Utama</TableHead>
                  <TableHead className="font-bold">Fungsi Utama</TableHead>
                  <TableHead className="font-bold">Status Bukti &amp; Evaluasi (Bab IV)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ARTEFAK_6_BAB4.map((a) => (
                  <TableRow key={a.kode} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-black text-indigo-700">{a.kode}</TableCell>
                    <TableCell className="font-bold text-slate-800">
                      <span className="flex items-center gap-1.5">
                        <FileText size={14} className="text-indigo-600 flex-shrink-0" />
                        {a.nama}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">{a.tahap}</span>
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">{a.struktur}</TableCell>
                    <TableCell className="text-slate-600 max-w-xs">{a.fungsi}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
                        a.kode === 'A6' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        <CheckCircle2 size={11} className="flex-shrink-0" />
                        {a.statusBukti}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Ringkasan Keterlacakan &amp; Evaluasi DSRM (RQ1 → RQ2 → RQ3)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Total Artefak</p>
              <p className="text-2xl font-black text-indigo-900">6 Artefak</p>
              <p className="text-[11px] text-indigo-700">A1 (RQ1) &amp; A2–A6 (RQ2–RQ3)</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Keterlacakan Fitur</p>
              <p className="text-2xl font-black text-emerald-900">35 Fitur</p>
              <p className="text-[11px] text-emerald-700">7 Peran × 5 Komponen (W/F-001–035)</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Evaluasi DSS (A4)</p>
              <p className="text-2xl font-black text-blue-900">4,09 / 5</p>
              <p className="text-[11px] text-blue-700">Formatif · 39/39 Skenario Stabil</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Status Uji Prototipe (A6)</p>
              <p className="text-2xl font-black text-amber-900">86,65%</p>
              <p className="text-[11px] text-amber-700">837/966 UAT · F-029 perlu retest</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
