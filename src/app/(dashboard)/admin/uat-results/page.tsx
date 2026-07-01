'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MessageSquare, Star, TrendingUp, Download } from 'lucide-react';

const COLOR = '#1a237e';

interface UATResult {
  id: string;
  namaUser: string;
  role: string;
  susScore: number;
  kategori: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Kurang' | 'Sangat Kurang';
  feedback: string;
  tanggal: string;
  createdAt: string;
}

export default function UATResultsPage() {
  const [uatResults, setUatResults] = useState<UATResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/uat-results')
      .then(res => res.json())
      .then(data => setUatResults(data))
      .catch(err => console.error('Failed to fetch UAT results:', err))
      .finally(() => setLoading(false));
  }, []);

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case 'Sangat Baik': return 'bg-green-100 text-green-700';
      case 'Baik': return 'bg-blue-100 text-blue-700';
      case 'Cukup': return 'bg-yellow-100 text-yellow-700';
      case 'Kurang': return 'bg-orange-100 text-orange-700';
      case 'Sangat Kurang': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 68) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const averageScore = uatResults.length > 0 ? uatResults.reduce((acc, curr) => acc + curr.susScore, 0) / uatResults.length : 0;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="UAT Results (SUS & Feedback)" modul="Evaluation & Research" color={COLOR} />

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Ringkasan UAT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-center gap-2 mb-2">
                <Star size={20} className="text-indigo-600" />
                <p className="text-sm font-semibold text-indigo-800">Rata-rata SUS Score</p>
              </div>
              <p className="text-2xl font-bold text-indigo-900">{averageScore.toFixed(1)}</p>
              <p className="text-xs text-indigo-700">Skala 0-100</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={20} className="text-green-600" />
                <p className="text-sm font-semibold text-green-800">Total Responden</p>
              </div>
              <p className="text-2xl font-bold text-green-900">{uatResults.length}</p>
              <p className="text-xs text-green-700">User</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={20} className="text-blue-600" />
                <p className="text-sm font-semibold text-blue-800">Total Feedback</p>
              </div>
              <p className="text-2xl font-bold text-blue-900">{uatResults.length}</p>
              <p className="text-xs text-blue-700">Komentar</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Star size={20} className="text-purple-600" />
                <p className="text-sm font-semibold text-purple-800">Kategori Tertinggi</p>
              </div>
              <p className="text-2xl font-bold text-purple-900">Sangat Baik</p>
              <p className="text-xs text-purple-700">50% responden</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Hasil UAT & Feedback
          </CardTitle>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Download size={16} className="mr-2" /> Export Laporan
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>SUS Score</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uatResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.namaUser}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      {result.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${getScoreColor(result.susScore)}`}>
                      {result.susScore}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKategoriColor(result.kategori)}`}>
                      {result.kategori}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600 max-w-xs truncate">{result.feedback}</TableCell>
                  <TableCell>{formatDate(result.tanggal)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <MessageSquare size={16} className="text-blue-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
