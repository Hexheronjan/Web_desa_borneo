'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, CheckCircle2, Eye, Download } from 'lucide-react';

const COLOR = '#1a237e';

interface Artefak {
  id: string;
  namaArtefak: string;
  jenis: 'Pedoman' | 'Hasil FGD' | 'Kuesioner' | 'Validasi' | 'Observasi' | 'APL-SLV';
  nilaiEvaluasi: number;
  kategori: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang';
  tanggalEvaluasi: string;
}

export default function EvaluasiArtefakPage() {
  const [artefaks, setArtefaks] = useState<Artefak[]>([
    { id: '1', namaArtefak: 'Pedoman Wawancara', jenis: 'Pedoman', nilaiEvaluasi: 85, kategori: 'Sangat Baik', tanggalEvaluasi: '2025-01-15' },
    { id: '2', namaArtefak: 'Hasil FGD Desa', jenis: 'Hasil FGD', nilaiEvaluasi: 78, kategori: 'Baik', tanggalEvaluasi: '2025-01-16' },
    { id: '3', namaArtefak: 'Kuesioner Readiness', jenis: 'Kuesioner', nilaiEvaluasi: 82, kategori: 'Sangat Baik', tanggalEvaluasi: '2025-01-17' },
    { id: '4', namaArtefak: 'Validasi Ahli', jenis: 'Validasi', nilaiEvaluasi: 75, kategori: 'Baik', tanggalEvaluasi: '2025-01-18' },
    { id: '5', namaArtefak: 'Observasi Desa', jenis: 'Observasi', nilaiEvaluasi: 80, kategori: 'Baik', tanggalEvaluasi: '2025-01-19' },
    { id: '6', namaArtefak: 'APL-SLV Borneo', jenis: 'APL-SLV', nilaiEvaluasi: 88, kategori: 'Sangat Baik', tanggalEvaluasi: '2025-01-20' },
  ]);

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case 'Sangat Baik': return 'bg-green-100 text-green-700';
      case 'Baik': return 'bg-blue-100 text-blue-700';
      case 'Cukup': return 'bg-yellow-100 text-yellow-700';
      case 'Kurang': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getNilaiColor = (nilai: number) => {
    if (nilai >= 85) return 'text-green-600';
    if (nilai >= 70) return 'text-blue-600';
    if (nilai >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Evaluasi Artefak" modul="Evaluation & Research" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Artefak Penelitian
          </CardTitle>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <FileText size={16} className="mr-2" /> Upload Artefak
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Artefak</TableHead>
                <TableHead>Jenis</TableHead>
                <TableHead>Nilai Evaluasi</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tanggal Evaluasi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {artefaks.map((artefak) => (
                <TableRow key={artefak.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText size={16} className="text-indigo-600" />
                    {artefak.namaArtefak}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      {artefak.jenis}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getNilaiColor(artefak.nilaiEvaluasi)}`}>
                      {artefak.nilaiEvaluasi}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKategoriColor(artefak.kategori)}`}>
                      {artefak.kategori}
                    </span>
                  </TableCell>
                  <TableCell>{artefak.tanggalEvaluasi}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Eye size={16} className="text-blue-600" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download size={16} className="text-green-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Ringkasan Evaluasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Sangat Baik</p>
              <p className="text-2xl font-bold text-green-900">3</p>
              <p className="text-xs text-green-700">Artefak</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Baik</p>
              <p className="text-2xl font-bold text-blue-900">3</p>
              <p className="text-xs text-blue-700">Artefak</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Cukup</p>
              <p className="text-2xl font-bold text-yellow-900">0</p>
              <p className="text-xs text-yellow-700">Artefak</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-slate-500 font-semibold mb-1">Kurang</p>
              <p className="text-2xl font-bold text-red-900">0</p>
              <p className="text-xs text-red-700">Artefak</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
