'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BookOpen, Award, Download } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#283593';

const educationIndicators = [
  { name: 'Desa Jonggon Jaya — Capaian KPI SDGs Desa 4 (6 KPI)', target: '100%', actual: `${DESA_BAB4[0].sdgKPI.sdg4.toFixed(1)}%`, pct: DESA_BAB4[0].sdgKPI.sdg4, status: 'Baik', color: 'bg-blue-600' },
  { name: 'Desa Kedang Ipil — Capaian KPI SDGs Desa 4 (6 KPI)', target: '100%', actual: `${DESA_BAB4[1].sdgKPI.sdg4.toFixed(1)}%`, pct: DESA_BAB4[1].sdgKPI.sdg4, status: 'Baik', color: 'bg-indigo-600' },
  { name: 'Desa Lung Anai — Capaian KPI SDGs Desa 4 (6 KPI)', target: '100%', actual: `${DESA_BAB4[2].sdgKPI.sdg4.toFixed(1)}%`, pct: DESA_BAB4[2].sdgKPI.sdg4, status: 'Prioritas', color: 'bg-amber-500' },
  { name: 'Rerata Gabungan SDGs Desa 4 (18 Unit KPI — Awal 66,68%)', target: '100%', actual: '74,90%', pct: 74.9, status: '+8,22 poin', color: 'bg-emerald-600' },
];

export default function SDGs4Page() {
  const handleExport = async () => {
    const styles = StyleSheet.create({
      page: { padding: 30, fontFamily: 'Helvetica' },
      title: { fontSize: 16, fontWeight: 'bold', marginBottom: 14, color: '#283593' },
      tableRow: { flexDirection: 'row' },
      tableColHeader: { width: '25%', backgroundColor: '#283593', color: 'white', fontSize: 9, fontWeight: 'bold', padding: 6, textAlign: 'center' },
      tableCol: { width: '25%', fontSize: 9, padding: 6, textAlign: 'center', border: '1px solid #e0e0e0' },
    });

    const SDGsPDF = () => (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Laporan SDGs Desa 4 - Pendidikan Berkualitas (Bab IV)</Text>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Indikator</Text>
            <Text style={styles.tableColHeader}>Target</Text>
            <Text style={styles.tableColHeader}>Capaian</Text>
            <Text style={styles.tableColHeader}>Status</Text>
          </View>
          {educationIndicators.map((ind, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCol}>{ind.name}</Text>
              <Text style={styles.tableCol}>{ind.target}</Text>
              <Text style={styles.tableCol}>{ind.actual}</Text>
              <Text style={styles.tableCol}>{ind.status}</Text>
            </View>
          ))}
        </Page>
      </Document>
    );

    const blob = await pdf(<SDGsPDF />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sdgs_4_pendidikan_bab4_${new Date().toISOString().split('T')[0]}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="SDGs Desa 4 — Pendidikan Desa Berkualitas (Bab IV)" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Capaian Akhir SDGs 4" value="74,90%" satuan="Awal 66,68% (+8,22 poin)" barColor="blue" progress={75} />
        <StatCard label="Jonggon Jaya / Kedang Ipil" value="76,1% / 75,0%" satuan="12 Unit KPI Pendidikan" barColor="green" progress={76} />
        <StatCard label="Desa Lung Anai" value="73,6%" satuan="Fokus pendampingan" barColor="orange" progress={74} />
        <StatCard label="UAT Peran Guru (N=18)" value="79,86%" satuan="SUS 71,11 · Kualitas 3,19/5" barColor="purple" progress={80} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <BookOpen size={16} className="text-blue-500" /> Capaian 18 Unit KPI SDGs Desa 4 (Tabel 4.45 &amp; Gambar 4.23)
              </CardTitle>
              <button
                onClick={handleExport}
                className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-1"
              >
                <Download size={12} /> Export PDF
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {educationIndicators.map((ind, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>{ind.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${ind.status === 'Prioritas' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>{ind.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${ind.color}`} style={{ width: `${ind.pct}%` }} />
                  </div>
                  <div className="w-24 text-right text-xs">
                    <span className="text-slate-400 font-medium">Target: {ind.target}</span>
                    <span className="block font-black text-slate-800">{ind.actual}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Catatan Agenda Penyempurnaan Bab IV
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>
              SDGs Desa 4 mencatat kenaikan tertinggi (<strong>+8,22 poin persentase</strong>), namun capaian akhirnya (<strong>74,90%</strong>) masih paling rendah di antara ketiga tujuan SDGs yang dipantau.
            </p>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg space-y-1 text-slate-700">
              <p className="font-bold text-indigo-800">Prioritas Tindak Lanjut (Tabel 4.52):</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Penguatan mutu data pendidikan &amp; angka putus sekolah (cost indicator)</li>
                <li>Literasi digital &amp; panduan tugas sederhana bagi Guru/Tenaga Pendidikan</li>
                <li>Pendampingan intensif di Jonggon Jaya, Kedang Ipil, dan Lung Anai</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
