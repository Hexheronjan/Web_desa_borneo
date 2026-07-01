'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, XCircle, FileText, Download, Upload } from 'lucide-react';

const COLOR = '#1a237e';

interface Dataset {
  id: string;
  namaDataset: string;
  jumlahData: number;
  statusValidasi: 'Valid' | 'Invalid' | 'Pending';
  tanggalUpload: string;
}

export default function ValidasiDataPage() {
  const [datasets, setDatasets] = useState<Dataset[]>([
    { id: '1', namaDataset: 'Dataset Readiness 2025', jumlahData: 247, statusValidasi: 'Valid', tanggalUpload: '2025-01-15' },
    { id: '2', namaDataset: 'Dataset Maturity 2025', jumlahData: 247, statusValidasi: 'Valid', tanggalUpload: '2025-01-15' },
    { id: '3', namaDataset: 'Dataset QoL 2025', jumlahData: 247, statusValidasi: 'Pending', tanggalUpload: '2025-01-16' },
    { id: '4', namaDataset: 'Dataset SDGs 2025', jumlahData: 247, statusValidasi: 'Invalid', tanggalUpload: '2025-01-16' },
  ]);

  const handleValidate = (id: string, status: 'Valid' | 'Invalid') => {
    setDatasets(datasets.map(d => d.id === id ? { ...d, statusValidasi: status } : d));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'bg-green-100 text-green-700';
      case 'Invalid': return 'bg-red-100 text-red-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Validasi Data" modul="Framework & Assessment" color={COLOR} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            Dataset Penelitian
          </CardTitle>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
            <Upload size={16} className="mr-2" /> Upload Dataset
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Dataset</TableHead>
                <TableHead>Jumlah Data</TableHead>
                <TableHead>Tanggal Upload</TableHead>
                <TableHead>Status Validasi</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset) => (
                <TableRow key={dataset.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText size={16} className="text-indigo-600" />
                    {dataset.namaDataset}
                  </TableCell>
                  <TableCell>{dataset.jumlahData} data</TableCell>
                  <TableCell>{dataset.tanggalUpload}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dataset.statusValidasi)}`}>
                      {dataset.statusValidasi}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {dataset.statusValidasi === 'Pending' && (
                        <>
                          <Button 
                            onClick={() => handleValidate(dataset.id, 'Valid')} 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-3"
                          >
                            <CheckCircle2 size={16} className="text-green-600 mr-1" /> Valid
                          </Button>
                          <Button 
                            onClick={() => handleValidate(dataset.id, 'Invalid')} 
                            size="sm" 
                            variant="ghost" 
                            className="h-8 px-3"
                          >
                            <XCircle size={16} className="text-red-600 mr-1" /> Invalid
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download size={16} className="text-blue-600" />
                      </Button>
                    </div>
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
