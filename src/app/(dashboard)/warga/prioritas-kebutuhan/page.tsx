'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Target, AlertTriangle, BarChart2, Users, MessageSquare, ChevronUp, RefreshCw, Send
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

type Urgensi = 'Sangat Mendesak' | 'Mendesak' | 'Sedang' | 'Rendah';

const URGENSI_COLOR: Record<Urgensi, string> = {
  'Sangat Mendesak': 'bg-red-100 text-red-700',
  'Mendesak': 'bg-orange-100 text-orange-700',
  'Sedang': 'bg-yellow-100 text-yellow-700',
  'Rendah': 'bg-slate-100 text-slate-600',
};

const ICON_MAP: Record<string, string> = {
  'Infrastruktur': '🏗️',
  'Teknologi & Digital': '📡',
  'Ekonomi': '💼',
  'Kesehatan': '🏥',
  'Lingkungan': '🌿',
  'Pendidikan': '📚',
  'Budaya': '🎭',
};

const PRIORITAS_DATA = [
  {
    rank: 1,
    judul: 'Perbaikan Jalan Lingkungan Dusun B dan C',
    kategori: 'Infrastruktur',
    urgensi: 'Sangat Mendesak' as Urgensi,
    dukungan: 312,
    sumberAspirasi: 15,
    sumberSurvei: 'QoL: 3.2/5 (Aspek Infrastruktur)',
    masalahLapangan: 'Jalan berlubang meningkatkan kecelakaan dan menyulitkan distribusi hasil tani',
    rekomendasiDSS: 'Prioritas Utama — Alokasikan 30% ADD',
    status: 'Dibahas dalam Musdes',
    pertimbanganSosial: '',
  },
  {
    rank: 2,
    judul: 'Akses Internet Desa dan Booster Sinyal',
    kategori: 'Teknologi & Digital',
    urgensi: 'Mendesak' as Urgensi,
    dukungan: 287,
    sumberAspirasi: 12,
    sumberSurvei: 'Readiness: 2.8/5 (Aspek Teknologi)',
    masalahLapangan: 'Blank spot sinyal di 2 dusun menghambat edukasi dan layanan digital',
    rekomendasiDSS: 'Prioritas Kedua — Koordinasi dengan provider dan Diskominfo',
    status: 'Diproses',
    pertimbanganSosial: '',
  },
  {
    rank: 3,
    judul: 'Kegiatan Pemuda & UMKM Anyaman Rotan',
    kategori: 'Ekonomi',
    urgensi: 'Sedang' as Urgensi,
    dukungan: 198,
    sumberAspirasi: 8,
    sumberSurvei: 'QoL: 3.5/5 (Aspek Ekonomi)',
    masalahLapangan: 'Pemuda tidak memiliki wadah pengembangan UMKM digital berbasis budaya lokal',
    rekomendasiDSS: 'Prioritas Ketiga — Integrasikan dengan LMS dan marketplace desa',
    status: 'Ditinjau',
    pertimbanganSosial: '',
  },
  {
    rank: 4,
    judul: 'Penguatan Posyandu Digital & Pencegahan Stunting',
    kategori: 'Kesehatan',
    urgensi: 'Sedang' as Urgensi,
    dukungan: 175,
    sumberAspirasi: 6,
    sumberSurvei: 'SDG 3: Tingkat stunting 14%',
    masalahLapangan: 'Data balita belum terpusat secara digital, pemantauan stunting masih manual',
    rekomendasiDSS: 'Segera integrasikan SID dengan sistem KIA digital',
    status: 'Berjalan',
    pertimbanganSosial: '',
  },
  {
    rank: 5,
    judul: 'Pelestarian Budaya Lokal & Digitalisasi Adat',
    kategori: 'Budaya',
    urgensi: 'Rendah' as Urgensi,
    dukungan: 145,
    sumberAspirasi: 5,
    sumberSurvei: 'SDG 18: 72% (Kelembagaan Adat)',
    masalahLapangan: 'Dokumen adat dan bahasa Kenyah berisiko tidak terdokumentasi secara digital',
    rekomendasiDSS: 'Prioritas jangka panjang — Kolaborasi dengan Lembaga Adat',
    status: 'Diusulkan',
    pertimbanganSosial: '',
  },
];

export default function PrioritasKebutuhanPage() {
  const [data, setData] = useState(PRIORITAS_DATA);
  const [pertimbangan, setPertimbangan] = useState<Record<number, string>>({});
  const [showForm, setShowForm] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');

  const handleKirim = (rank: number) => {
    if (!inputText) { alert('Pertimbangan sosial tidak boleh kosong.'); return; }
    setPertimbangan(prev => ({ ...prev, [rank]: inputText }));
    setShowForm(null);
    setInputText('');
    alert('✅ Pertimbangan sosial Anda berhasil disimpan. Tokoh Masyarakat tidak mengubah nilai DSS — pertimbangan ini bersifat tambahan.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Prioritas Kebutuhan Masyarakat" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <AlertTriangle size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Informasi Halaman Prioritas Kebutuhan</p>
          <p className="text-blue-700 mt-0.5 font-medium leading-relaxed">
            Halaman ini menggabungkan hasil <strong>aspirasi, survei, masalah lapangan, dan rekomendasi DSS</strong> untuk menyusun daftar prioritas kebutuhan masyarakat. Tokoh Masyarakat <strong>tidak mengubah nilai DSS</strong> — hanya dapat memberikan <em>pertimbangan sosial</em> sebagai masukan tambahan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Prioritas" value={data.length} satuan="Kebutuhan Terdaftar" barColor="purple" progress={100} />
        <StatCard label="Sangat Mendesak" value={data.filter(d => d.urgensi === 'Sangat Mendesak').length} satuan="Perlu Tindakan Segera" barColor="orange" progress={20} />
        <StatCard label="Total Dukungan" value={data.reduce((s, d) => s + d.dukungan, 0)} satuan="Suara Masyarakat" barColor="blue" progress={80} />
        <StatCard label="Sumber Aspirasi" value={data.reduce((s, d) => s + d.sumberAspirasi, 0)} satuan="Aspirasi Relevan" barColor="green" progress={70} />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Daftar Prioritas Kebutuhan — Berdasarkan Data Agregat DSS
        </h2>

        {data.map((item) => (
          <Card key={item.rank} className={`border-l-4 ${item.rank === 1 ? 'border-l-red-500' : item.rank === 2 ? 'border-l-orange-400' : item.rank === 3 ? 'border-l-yellow-400' : 'border-l-slate-300'}`}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-4">
                {/* RANK BADGE */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-sm ${item.rank <= 2 ? 'bg-red-100 text-red-700' : item.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>
                  {item.rank}
                </div>

                {/* MAIN CONTENT */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className="text-lg">{ICON_MAP[item.kategori] || '📌'}</span>
                    <h3 className="font-bold text-slate-800 text-sm">{item.judul}</h3>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${URGENSI_COLOR[item.urgensi]}`}>{item.urgensi}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{item.kategori}</span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 bg-slate-50 border rounded-lg">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Masalah Lapangan</p>
                      <p className="text-slate-700 font-medium leading-snug mt-0.5">{item.masalahLapangan}</p>
                    </div>
                    <div className="p-2 bg-purple-50/50 border border-purple-100 rounded-lg">
                      <p className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Sumber Survei</p>
                      <p className="text-slate-700 font-medium leading-snug mt-0.5">{item.sumberSurvei}</p>
                    </div>
                    <div className="p-2 bg-blue-50/50 border border-blue-100 rounded-lg">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Rekomendasi DSS</p>
                      <p className="text-slate-700 font-medium leading-snug mt-0.5">{item.rekomendasiDSS}</p>
                    </div>
                    <div className="p-2 bg-teal-50/50 border border-teal-100 rounded-lg">
                      <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Statistik Dukungan</p>
                      <p className="font-bold text-teal-700 mt-0.5">{item.dukungan} Suara</p>
                      <p className="text-[10px] text-slate-500">{item.sumberAspirasi} Aspirasi Terkait</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2.5 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-slate-500">Status Pembahasan:</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-yellow-100 text-yellow-700">{item.status}</span>
                    </div>

                    {/* PERTIMBANGAN SOSIAL */}
                    {pertimbangan[item.rank] ? (
                      <div className="text-[10px] text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1.5 rounded-lg font-medium max-w-xs">
                        💬 <em>"{pertimbangan[item.rank]}"</em>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setShowForm(item.rank); setInputText(''); }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-700 text-white text-[10px] font-bold hover:bg-purple-800 transition-colors"
                      >
                        <MessageSquare size={11} /> Tambah Pertimbangan Sosial
                      </button>
                    )}
                  </div>

                  {showForm === item.rank && (
                    <div className="mt-3 p-3 border border-purple-200 rounded-xl bg-purple-50/30 space-y-2">
                      <p className="text-[10px] font-bold text-purple-700">PERTIMBANGAN SOSIAL (tidak mengubah nilai DSS):</p>
                      <textarea
                        rows={2}
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        placeholder="Contoh: Secara sosial, warga Dusun B sangat bergantung pada jalan ini untuk kegiatan adat tahunan..."
                        className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-xs text-slate-700"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => setShowForm(null)} className="px-3 py-1.5 border rounded-lg text-[10px] font-bold hover:bg-slate-50 text-slate-600">Batal</button>
                        <button onClick={() => handleKirim(item.rank)} className="px-3 py-1.5 bg-purple-700 text-white rounded-lg text-[10px] font-bold hover:bg-purple-800 flex items-center gap-1">
                          <Send size={10} /> Simpan Pertimbangan
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data agregat bersumber dari aspirasi, survei QoL & Readiness, masalah lapangan, dan DSS</span>
        <span>Periode: Semester I 2026 — Data Simulasi Terkendali</span>
      </div>
    </div>
  );
}
