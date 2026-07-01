'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, Database, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const COLOR = '#1a237e';

interface DataSource {
  id: string;
  namaSumber: string;
  tipe: 'API' | 'Database' | 'File';
  apiEndpoint?: string;
  status: 'Terhubung' | 'Tidak Terhubung' | 'Sinkronisasi';
  terakhirSinkronisasi: string;
}

export default function IntegrasiDataDesaPage() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    { id: '1', namaSumber: 'Sistem Informasi Desa (SID)', tipe: 'API', apiEndpoint: 'https://api.sid.go.id', status: 'Terhubung', terakhirSinkronisasi: '2025-01-20 10:30' },
    { id: '2', namaSumber: 'Data SDGs Nasional', tipe: 'API', apiEndpoint: 'https://api.sdgs.go.id', status: 'Terhubung', terakhirSinkronisasi: '2025-01-20 10:30' },
    { id: '3', namaSumber: 'Database Desa Adat', tipe: 'Database', status: 'Terhubung', terakhirSinkronisasi: '2025-01-20 10:30' },
    { id: '4', namaSumber: 'File Excel Kecamatan', tipe: 'File', status: 'Tidak Terhubung', terakhirSinkronisasi: '-' },
  ]);

  const handleSync = (id: string) => {
    setDataSources(dataSources.map(ds => 
      ds.id === id ? { ...ds, status: 'Sinkronisasi' as const } : ds
    ));
    
    setTimeout(() => {
      setDataSources(dataSources.map(ds => 
        ds.id === id ? { ...ds, status: 'Terhubung' as const, terakhirSinkronisasi: new Date().toLocaleString('id-ID') } : ds
      ));
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Terhubung': return <CheckCircle2 size={16} className="text-green-600" />;
      case 'Tidak Terhubung': return <AlertCircle size={16} className="text-red-600" />;
      case 'Sinkronisasi': return <Clock size={16} className="text-yellow-600 animate-spin" />;
      default: return <Database size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terhubung': return 'bg-green-100 text-green-700';
      case 'Tidak Terhubung': return 'bg-red-100 text-red-700';
      case 'Sinkronisasi': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Integrasi Data Desa" modul="Framework & Assessment" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Sumber Data & Sinkronisasi
          </CardTitle>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <RefreshCw size={16} className="mr-2" /> Sinkronisasi Semua
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Sumber Data</TableHead>
                <TableHead>Tipe</TableHead>
                <TableHead>API Endpoint</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terakhir Sinkronisasi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Database size={16} className="text-indigo-600" />
                    {source.namaSumber}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium">
                      {source.tipe}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{source.apiEndpoint || '-'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(source.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(source.status)}`}>
                        {source.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{source.terakhirSinkronisasi}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      onClick={() => handleSync(source.id)} 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 px-3"
                      disabled={source.status === 'Sinkronisasi'}
                    >
                      <RefreshCw size={16} className={`mr-1 ${source.status === 'Sinkronisasi' ? 'animate-spin' : ''}`} /> 
                      Sinkronisasi
                    </Button>
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
            Status Integrasi Database
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={20} className="text-green-600" />
                <p className="text-sm font-semibold text-green-800">Database Terintegrasi</p>
              </div>
              <p className="text-2xl font-bold text-green-900">247</p>
              <p className="text-xs text-green-700">Desa terhubung</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Database size={20} className="text-blue-600" />
                <p className="text-sm font-semibold text-blue-800">Total Data Tersinkronisasi</p>
              </div>
              <p className="text-2xl font-bold text-blue-900">1,234,567</p>
              <p className="text-xs text-blue-700">Record data</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={20} className="text-purple-600" />
                <p className="text-sm font-semibold text-purple-800">Terakhir Update</p>
              </div>
              <p className="text-2xl font-bold text-purple-900">10:30</p>
              <p className="text-xs text-purple-700">Hari ini</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
