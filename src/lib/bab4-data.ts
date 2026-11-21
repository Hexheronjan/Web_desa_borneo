// Sumber data terpusat hasil penelitian Bab IV (Dataset SLV 1, SLV 2, SLV 3 v1.2)
// Lokus: Desa Jonggon Jaya, Desa Kedang Ipil, Desa Lung Anai — Kab. Kutai Kartanegara, Kalimantan Timur

export interface IndikatorBab4 {
  kode: string;
  dimensiKode: 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6';
  dimensiNama: string;
  nama: string;
  definisi: string;
  bobotDimensi: number;
  bobotLokal: number;
  bobotGlobal: number;
  status: 'Aktif';
}

export const DESA_BAB4 = [
  {
    kodeDesa: '6402032005',
    id: 'jonggon-jaya',
    nama: 'Desa Jonggon Jaya',
    kecamatan: 'Loa Kulu',
    kabupaten: 'Kutai Kartanegara',
    provinsi: 'Kalimantan Timur',
    luasKm2: 105.07,
    penduduk: 2553,
    kk: 825,
    rt: 17,
    dusun: 'Wilayah RT 01–17',
    akses: '±58 km ke ibu kota kecamatan; ±52 km ke ibu kota kabupaten',
    konteks: 'Wilayah relatif luas dengan jumlah penduduk dan RT terbesar; memiliki Puskesmas Jonggon Jaya; fokus pada koordinasi data, integrasi layanan, dan pemantauan SDGs Desa.',
    skorKesiapan: 68.04,
    kategoriKesiapan: 'Tinggi',
    kesenjangan: 31.96,
    kekuatanRelatif: 'D1 — Tata Kelola dan Kepemimpinan Digital (76,03)',
    prioritasPerbaikan: 'D6 — Pemantauan SDGs, Dukungan Keputusan, dan Kualitas Hidup (58,40)',
    dimensi: { D1: 76.03, D2: 69.92, D3: 65.75, D4: 63.98, D5: 73.05, D6: 58.40 },
    dssPrioritas: { kode: 'A08', nama: 'Dasbor SDGs Desa 3, 4, dan 18', skorSAW: 0.950907, biayaJuta: 220, stabilitas: '13/13 skenario stabil' },
    kematanganPra: 2.21,
    kematanganPasca: 2.68,
    kematanganDelta: 0.47,
    kematanganTertinggi: 'M4 Data & Sistem Informasi (2,81)',
    kematanganTerendah: 'M5 Layanan & Kualitas Hidup (2,51)',
    sdgKPI: { awal: 73.81, akhir: 81.78, delta: 7.97, sdg3: 85.5, sdg4: 76.1, sdg18: 83.7 },
    evaluasiRQ3: { kualitasTotal: 3.41, sus: 66.19, uat: 89.44, waktuLuringMenit: 915 },
    prePostDelta: { readiness: -1.53, maturity: 0.49, dataIntegration: 6.20, sdgMonitoring: 7.39, decisionQuality: 6.71, qol: 1.47 },
  },
  {
    kodeDesa: '6402192002',
    id: 'kedang-ipil',
    nama: 'Desa Kedang Ipil',
    kecamatan: 'Kota Bangun Darat',
    kabupaten: 'Kutai Kartanegara',
    provinsi: 'Kalimantan Timur',
    luasKm2: 169.00,
    penduduk: 1505,
    kk: 458,
    rt: 12,
    dusun: '2 Dusun (12 RT)',
    akses: '±0,1 km ke ibu kota kecamatan; ±66,5 km ke ibu kota kabupaten',
    konteks: 'Dekat pusat Kecamatan Kota Bangun Darat; memiliki pendidikan dasar–menengah, Pustu dan Polindes; komunitas Kutai Adat Lawas Sumping Layang dan tradisi Nutuk Beham.',
    skorKesiapan: 58.11,
    kategoriKesiapan: 'Sedang',
    kesenjangan: 41.89,
    kekuatanRelatif: 'D5 — Partisipasi dan Tata Kelola Adat (86,58)',
    prioritasPerbaikan: 'D4 — Integrasi Data dan Layanan Digital (47,44)',
    dimensi: { D1: 59.63, D2: 48.40, D3: 53.68, D4: 47.44, D5: 86.58, D6: 52.87 },
    dssPrioritas: { kode: 'A02', nama: 'Penguatan Konektivitas dan Perangkat', skorSAW: 0.920042, biayaJuta: 195, stabilitas: '13/13 skenario stabil' },
    kematanganPra: 1.90,
    kematanganPasca: 2.40,
    kematanganDelta: 0.51,
    kematanganTertinggi: 'M6 Budaya & Tata Kelola Adat (2,53)',
    kematanganTerendah: 'M1 Infrastruktur & Teknologi (2,31)',
    sdgKPI: { awal: 71.75, akhir: 79.79, delta: 8.04, sdg3: 80.9, sdg4: 75.0, sdg18: 83.5 },
    evaluasiRQ3: { kualitasTotal: 3.32, sus: 68.45, uat: 83.85, waktuLuringMenit: 918 },
    prePostDelta: { readiness: -0.45, maturity: 0.64, dataIntegration: 8.72, sdgMonitoring: 5.73, decisionQuality: 6.65, qol: 1.68 },
  },
  {
    kodeDesa: '6402032014',
    id: 'lung-anai',
    nama: 'Desa Lung Anai',
    kecamatan: 'Loa Kulu',
    kabupaten: 'Kutai Kartanegara',
    provinsi: 'Kalimantan Timur',
    luasKm2: 1.85,
    penduduk: 480,
    kk: 152,
    rt: 4,
    dusun: '4 RT (Desa Budaya)',
    akses: '±28 km ke ibu kota kecamatan; ±33 km ke ibu kota kabupaten',
    konteks: 'Desa Dayak Kenyah; ditetapkan sebagai Desa Budaya sejak 2007 dengan modal sosial dan praktik adat sangat kuat; memerlukan arsitektur luring-utama (offline-first), pendampingan, dan perlindungan data budaya.',
    skorKesiapan: 48.39,
    kategoriKesiapan: 'Sedang',
    kesenjangan: 51.61,
    kekuatanRelatif: 'D5 — Partisipasi dan Tata Kelola Adat (89,73)',
    prioritasPerbaikan: 'D2 — Infrastruktur dan Akses Digital (30,75)',
    dimensi: { D1: 48.51, D2: 30.75, D3: 43.39, D4: 34.71, D5: 89.73, D6: 43.60 },
    dssPrioritas: { kode: 'A02', nama: 'Penguatan Konektivitas dan Perangkat', skorSAW: 0.911694, biayaJuta: 185, stabilitas: '13/13 skenario stabil' },
    kematanganPra: 1.80,
    kematanganPasca: 2.43,
    kematanganDelta: 0.63,
    kematanganTertinggi: 'M5 Layanan & Kualitas Hidup (2,57)',
    kematanganTerendah: 'M3 Tata Kelola & Kelembagaan (2,24)',
    sdgKPI: { awal: 72.73, akhir: 80.43, delta: 7.70, sdg3: 80.4, sdg4: 73.6, sdg18: 87.4 },
    evaluasiRQ3: { kualitasTotal: 3.45, sus: 68.10, uat: 86.65, waktuLuringMenit: 2928 },
    prePostDelta: { readiness: 8.80, maturity: 0.63, dataIntegration: 8.20, sdgMonitoring: 9.73, decisionQuality: 7.09, qol: 1.47 },
  },
] as const;

export const DIMENSI_BAB4 = [
  { kode: 'D1', nama: 'Tata Kelola dan Kepemimpinan Digital', singkat: 'D1 Tata Kelola', bobot: 0.173083, cr: 0.017385, peringkat: 1, gm: 1.039259 },
  { kode: 'D2', nama: 'Infrastruktur dan Akses Digital', singkat: 'D2 Infrastruktur', bobot: 0.173083, cr: 0.012395, peringkat: 1, gm: 1.039259 },
  { kode: 'D3', nama: 'Kapasitas SDM dan Literasi Digital', singkat: 'D3 SDM & Literasi', bobot: 0.166545, cr: 0.017385, peringkat: 3, gm: 1.000000 },
  { kode: 'D4', nama: 'Integrasi Data dan Layanan Digital', singkat: 'D4 Data & Layanan', bobot: 0.166545, cr: 0.009913, peringkat: 3, gm: 1.000000 },
  { kode: 'D5', nama: 'Partisipasi dan Tata Kelola Adat', singkat: 'D5 Tata Kelola Adat', bobot: 0.166545, cr: 0.017385, peringkat: 3, gm: 1.000000 },
  { kode: 'D6', nama: 'Pemantauan SDGs, Dukungan Keputusan, dan Kualitas Hidup', singkat: 'D6 SDGs, DSS & QoL', bobot: 0.154200, cr: 0.017385, peringkat: 6, gm: 0.925875 },
] as const;

export const INDIKATOR_24_BAB4: IndikatorBab4[] = [
  // D1
  { kode: 'I01', dimensiKode: 'D1', dimensiNama: 'Tata Kelola dan Kepemimpinan Digital', nama: 'Arah dan strategi transformasi digital desa', definisi: 'Tersedianya tujuan, peta jalan, dan prioritas transformasi digital yang disepakati.', bobotDimensi: 0.173083, bobotLokal: 0.292849, bobotGlobal: 0.050687, status: 'Aktif' },
  { kode: 'I02', dimensiKode: 'D1', dimensiNama: 'Tata Kelola dan Kepemimpinan Digital', nama: 'Komitmen kepemimpinan dan dukungan sumber daya', definisi: 'Kepala desa atau perangkat memberi mandat, anggaran, koordinasi, dan teladan penggunaan data.', bobotDimensi: 0.173083, bobotLokal: 0.276412, bobotGlobal: 0.047842, status: 'Aktif' },
  { kode: 'I03', dimensiKode: 'D1', dimensiNama: 'Tata Kelola dan Kepemimpinan Digital', nama: 'Pembagian peran, SOP, dan tata kelola perubahan', definisi: 'Peran penghasil, verifikator, pemilik, serta pengguna data dan layanan ditetapkan.', bobotDimensi: 0.173083, bobotLokal: 0.246256, bobotGlobal: 0.042623, status: 'Aktif' },
  { kode: 'I04', dimensiKode: 'D1', dimensiNama: 'Tata Kelola dan Kepemimpinan Digital', nama: 'Akuntabilitas, pemantauan, dan perbaikan berkala', definisi: 'Kinerja transformasi dipantau, dibahas dalam musyawarah, dan ditindaklanjuti.', bobotDimensi: 0.173083, bobotLokal: 0.184483, bobotGlobal: 0.031931, status: 'Aktif' },
  // D2
  { kode: 'I05', dimensiKode: 'D2', dimensiNama: 'Infrastruktur dan Akses Digital', nama: 'Ketersediaan dan kestabilan konektivitas internet', definisi: 'Kantor, layanan dasar, dan wilayah permukiman memiliki koneksi yang memadai serta stabil.', bobotDimensi: 0.173083, bobotLokal: 0.325781, bobotGlobal: 0.056387, status: 'Aktif' },
  { kode: 'I06', dimensiKode: 'D2', dimensiNama: 'Infrastruktur dan Akses Digital', nama: 'Ketersediaan perangkat, listrik, dan sarana pendukung', definisi: 'Perangkat kerja, listrik, jaringan lokal, dan sarana pencadangan tersedia.', bobotDimensi: 0.173083, bobotLokal: 0.273948, bobotGlobal: 0.047416, status: 'Aktif' },
  { kode: 'I07', dimensiKode: 'D2', dimensiNama: 'Infrastruktur dan Akses Digital', nama: 'Keterjangkauan dan inklusi akses digital', definisi: 'Kelompok rentan dan wilayah jauh dapat mengakses layanan melalui kanal yang sesuai.', bobotDimensi: 0.173083, bobotLokal: 0.217433, bobotGlobal: 0.037634, status: 'Aktif' },
  { kode: 'I08', dimensiKode: 'D2', dimensiNama: 'Infrastruktur dan Akses Digital', nama: 'Pemeliharaan, dukungan teknis, dan keamanan dasar', definisi: 'Ada penanggung jawab, jadwal pemeliharaan, bantuan teknis, pencadangan, serta perlindungan dasar.', bobotDimensi: 0.173083, bobotLokal: 0.182838, bobotGlobal: 0.031646, status: 'Aktif' },
  // D3
  { kode: 'I09', dimensiKode: 'D3', dimensiNama: 'Kapasitas SDM dan Literasi Digital', nama: 'Kompetensi digital aparatur dan pengelola layanan', definisi: 'Aparatur mampu mengoperasikan, memeriksa, dan menggunakan data serta aplikasi.', bobotDimensi: 0.166545, bobotLokal: 0.294186, bobotGlobal: 0.048995, status: 'Aktif' },
  { kode: 'I10', dimensiKode: 'D3', dimensiNama: 'Kapasitas SDM dan Literasi Digital', nama: 'Program pelatihan dan pendampingan berkelanjutan', definisi: 'Pelatihan berbasis kebutuhan disertai praktik, pendampingan, dan evaluasi.', bobotDimensi: 0.166545, bobotLokal: 0.262090, bobotGlobal: 0.043650, status: 'Aktif' },
  { kode: 'I11', dimensiKode: 'D3', dimensiNama: 'Kapasitas SDM dan Literasi Digital', nama: 'Literasi digital dan data masyarakat', definisi: 'Masyarakat memahami penggunaan layanan, keamanan, hak data, dan manfaat informasi.', bobotDimensi: 0.166545, bobotLokal: 0.247380, bobotGlobal: 0.041200, status: 'Aktif' },
  { kode: 'I12', dimensiKode: 'D3', dimensiNama: 'Kapasitas SDM dan Literasi Digital', nama: 'Kesiapan perubahan dan pembelajaran organisasi', definisi: 'Desa mempunyai mekanisme belajar, berbagi pengetahuan, dan menyesuaikan proses kerja.', bobotDimensi: 0.166545, bobotLokal: 0.196345, bobotGlobal: 0.032700, status: 'Aktif' },
  // D4
  { kode: 'I13', dimensiKode: 'D4', dimensiNama: 'Integrasi Data dan Layanan Digital', nama: 'Standar data, kode referensi, dan basis data utama', definisi: 'Definisi, kode, metadata, dan data induk digunakan secara konsisten.', bobotDimensi: 0.166545, bobotLokal: 0.289676, bobotGlobal: 0.048244, status: 'Aktif' },
  { kode: 'I14', dimensiKode: 'D4', dimensiNama: 'Integrasi Data dan Layanan Digital', nama: 'Integrasi data lintas pemerintahan, kesehatan, pendidikan, dan budaya', definisi: 'Data lintas bidang dapat dipertukarkan dengan aturan dan penanggung jawab yang jelas.', bobotDimensi: 0.166545, bobotLokal: 0.289676, bobotGlobal: 0.048244, status: 'Aktif' },
  { kode: 'I15', dimensiKode: 'D4', dimensiNama: 'Integrasi Data dan Layanan Digital', nama: 'Digitalisasi proses dan layanan prioritas', definisi: 'Proses layanan dipetakan, disederhanakan, dan didukung kanal digital yang relevan.', bobotDimensi: 0.166545, bobotLokal: 0.258072, bobotGlobal: 0.042981, status: 'Aktif' },
  { kode: 'I16', dimensiKode: 'D4', dimensiNama: 'Integrasi Data dan Layanan Digital', nama: 'Kualitas, keamanan, privasi, dan jejak asal data', definisi: 'Data lengkap, mutakhir, sahih, aman, serta terlacak asal dan perubahannya.', bobotDimensi: 0.166545, bobotLokal: 0.162575, bobotGlobal: 0.027076, status: 'Aktif' },
  // D5
  { kode: 'I17', dimensiKode: 'D5', dimensiNama: 'Partisipasi dan Tata Kelola Adat', nama: 'Pelibatan lembaga adat dalam tata kelola dan keputusan', definisi: 'Lembaga adat memiliki peran yang sah dalam verifikasi, persetujuan, dan musyawarah.', bobotDimensi: 0.166545, bobotLokal: 0.292849, bobotGlobal: 0.048772, status: 'Aktif' },
  { kode: 'I18', dimensiKode: 'D5', dimensiNama: 'Partisipasi dan Tata Kelola Adat', nama: 'Musyawarah dan partisipasi multiaktor', definisi: 'Pemerintah, adat, tokoh, guru, kesehatan, dan masyarakat terlibat dalam penetapan prioritas.', bobotDimensi: 0.166545, bobotLokal: 0.276412, bobotGlobal: 0.046035, status: 'Aktif' },
  { kode: 'I19', dimensiKode: 'D5', dimensiNama: 'Partisipasi dan Tata Kelola Adat', nama: 'Etika, persetujuan, dan perlindungan data budaya', definisi: 'Data budaya diklasifikasikan, digunakan sesuai persetujuan, dan dibatasi menurut kewenangan.', bobotDimensi: 0.166545, bobotLokal: 0.246256, bobotGlobal: 0.041013, status: 'Aktif' },
  { kode: 'I20', dimensiKode: 'D5', dimensiNama: 'Partisipasi dan Tata Kelola Adat', nama: 'Dokumentasi, regenerasi, dan keberlanjutan pengetahuan lokal', definisi: 'Pengetahuan budaya didokumentasikan secara kontekstual dan diwariskan dengan kendali komunitas.', bobotDimensi: 0.166545, bobotLokal: 0.184483, bobotGlobal: 0.030725, status: 'Aktif' },
  // D6
  { kode: 'I21', dimensiKode: 'D6', dimensiNama: 'Pemantauan SDGs, Dukungan Keputusan, dan Kualitas Hidup', nama: 'Pemetaan dan pemantauan indikator SDGs Desa 3, 4, dan 18', definisi: 'Data kesehatan, pendidikan, dan budaya dipetakan pada target, capaian, serta kesenjangan.', bobotDimensi: 0.154200, bobotLokal: 0.292849, bobotGlobal: 0.045157, status: 'Aktif' },
  { kode: 'I22', dimensiKode: 'D6', dimensiNama: 'Pemantauan SDGs, Dukungan Keputusan, dan Kualitas Hidup', nama: 'Dasbor dan pelaporan berbasis peran', definisi: 'Informasi capaian, tren, kesenjangan, dan mutu data disajikan sesuai kebutuhan pengguna.', bobotDimensi: 0.154200, bobotLokal: 0.276412, bobotGlobal: 0.042623, status: 'Aktif' },
  { kode: 'I23', dimensiKode: 'D6', dimensiNama: 'Pemantauan SDGs, Dukungan Keputusan, dan Kualitas Hidup', nama: 'Pengambilan keputusan berbasis bukti dan dukungan DSS', definisi: 'Prioritas tindakan ditopang data, bobot, kesenjangan, penjelasan, dan musyawarah manusia.', bobotDimensi: 0.154200, bobotLokal: 0.246256, bobotGlobal: 0.037972, status: 'Aktif' },
  { kode: 'I24', dimensiKode: 'D6', dimensiNama: 'Pemantauan SDGs, Dukungan Keputusan, dan Kualitas Hidup', nama: 'Orientasi manfaat layanan dan kualitas hidup', definisi: 'Transformasi diarahkan pada akses layanan, kesehatan, pendidikan, partisipasi, budaya, dan kesejahteraan.', bobotDimensi: 0.154200, bobotLokal: 0.184483, bobotGlobal: 0.028447, status: 'Aktif' },
];

export const DSS_KRITERIA_SAW = [
  { kode: 'C1', nama: 'Kesenjangan kesiapan', atribut: 'Benefit (Manfaat)', bobot: 0.25, sumber: 'Kesenjangan dimensi RQ1 (Empiris)' },
  { kode: 'C2', nama: 'Kepentingan dimensi', atribut: 'Benefit (Manfaat)', bobot: 0.20, sumber: 'Bobot AHP dimensi (Empiris RQ1)' },
  { kode: 'C3', nama: 'Urgensi layanan', atribut: 'Benefit (Manfaat)', bobot: 0.15, sumber: 'Skala penilaian 1–5 (Multiaktor)' },
  { kode: 'C4', nama: 'Jangkauan manfaat', atribut: 'Benefit (Manfaat)', bobot: 0.15, sumber: 'Skala penilaian 1–5 (Multiaktor)' },
  { kode: 'C5', nama: 'Kelayakan implementasi', atribut: 'Benefit (Manfaat)', bobot: 0.15, sumber: 'Skala penilaian 1–5 (Kelayakan program)' },
  { kode: 'C6', nama: 'Biaya implementasi', atribut: 'Cost (Biaya)', bobot: 0.10, sumber: 'Estimasi biaya program (juta rupiah)' },
] as const;

export const ARTEFAK_6_BAB4 = [
  {
    no: 1,
    kode: 'A1',
    nama: 'Artefak 1 — Kerangka Kesiapan Smart Living Village',
    tahap: 'RQ1',
    struktur: '6 dimensi, 24 indikator, bobot AHP (CR dimensi 0,00144)',
    fungsi: 'Menetapkan diagnosis kesiapan, kesenjangan, dan prioritas awal pada 3 desa penelitian.',
    statusBukti: 'Terhitung (Dataset SLV 1; S-CVI/Ave final 1,000; alpha 0,9367)',
  },
  {
    no: 2,
    kode: 'A2',
    nama: 'Artefak 2 — Model Konseptual Smart Living Village',
    tahap: 'RQ2',
    struktur: '2 siklus relasi (D1–D3–D5 & D2–D4–D6) + SI Desa Adat',
    fungsi: 'Menghubungkan tata kelola, kapasitas, adat, infrastruktur, data/layanan, keputusan, dan manfaat.',
    statusBukti: 'Keterlacakan 24 indikator & 35 kebutuhan 7 aktor terverifikasi desain',
  },
  {
    no: 3,
    kode: 'A3',
    nama: 'Artefak 3 — Cetak Biru Arsitektur Sistem',
    tahap: 'RQ2',
    struktur: '8 lapisan logis dan 32 komponen arsitektur',
    fungsi: 'Menerjemahkan model ke proses, RBAC 7 aktor, presentasi, layanan, integrasi luring, data, infrastruktur, dan keamanan.',
    statusBukti: 'Spesifikasi arsitektur logis 8 lapisan & 32 komponen',
  },
  {
    no: 4,
    kode: 'A4',
    nama: 'Artefak 4 — Sistem Pendukung Keputusan (DSS SAW)',
    tahap: 'RQ2',
    struktur: '6 kriteria C1–C6, 30 baris alternatif (3 desa × 10 alternatif)',
    fungsi: 'Menghasilkan skor preferensi & rekomendasi prioritas musyawarah (Jonggon Jaya A08: 0,9509; Kedang Ipil A02: 0,9200; Lung Anai A02: 0,9117).',
    statusBukti: 'Sensitivitas ±10% stabil 39/39 skenario; Evaluasi formatif 4,09/5',
  },
  {
    no: 5,
    kode: 'A5',
    nama: 'Artefak 5 — Dasbor Pemantauan Berbasis 7 Peran',
    tahap: 'RQ2',
    struktur: '35 komponen tampilan logis (W-001 s.d. W-035; 5 komponen/peran)',
    fungsi: 'Menyajikan indikator SDGs 3, 4, 18, peringatan, rekomendasi DSS, dan tindak lanjut sesuai kewenangan peran.',
    statusBukti: 'Spesifikasi fungsional & antarmuka 7 peran utama',
  },
  {
    no: 6,
    kode: 'A6',
    nama: 'Artefak 6 — Prototipe Web & Pemodelan UML',
    tahap: 'RQ2–RQ3',
    struktur: '35 kelompok fitur inti (F-001 s.d. F-035) & 4 diagram UML',
    fungsi: 'Mengintegrasikan rancangan 7 aktor ke prototipe Web Final untuk demonstrasi, UAT, dan evaluasi 4 minggu.',
    statusBukti: 'UAT 86,65% (837/966 tugas relevan); SUS 67,58; F-029 perlu perbaikan & retest',
  },
] as const;

export const EVALUASI_PER_PERAN_BAB4 = [
  { peran: 'Administrator Sistem', kodeKomponen: 'W-001–W-005', kodeFitur: 'F-001–F-005', n: 18, kualitasTotal: 3.45, sus: 72.78, uat: 88.89, catatan: 'Operasi sistem, pengguna/akses, kualitas data, integrasi, audit' },
  { peran: 'Pemerintah Desa', kodeKomponen: 'W-006–W-010', kodeFitur: 'F-006–F-010', n: 18, kualitasTotal: 3.46, sus: 70.83, uat: 87.50, catatan: 'Kesiapan, kematangan, SDGs Desa, DSS SAW, musyawarah & aspirasi' },
  { peran: 'Lembaga Adat', kodeKomponen: 'W-011–W-015', kodeFitur: 'F-011–F-015', n: 18, kualitasTotal: 3.32, sus: 63.61, uat: 86.81, catatan: 'Persetujuan & klasifikasi data budaya, SDG 18, musyawarah adat' },
  { peran: 'Tokoh Masyarakat', kodeKomponen: 'W-016–W-020', kodeFitur: 'F-016–F-020', n: 18, kualitasTotal: 3.46, sus: 62.78, uat: 84.72, catatan: 'Kondisi desa, aspirasi warga, agenda, pengawasan sosial' },
  { peran: 'Guru/Tenaga Pendidikan', kodeKomponen: 'W-021–W-025', kodeFitur: 'F-021–F-025', n: 18, kualitasTotal: 3.19, sus: 71.11, uat: 79.86, catatan: 'Data pendidikan, SDG 4, literasi digital, butuh panduan & pendampingan' },
  { peran: 'Tenaga Kesehatan', kodeKomponen: 'W-026–W-030', kodeFitur: 'F-026–F-030', n: 18, kualitasTotal: 3.66, sus: 69.72, uat: 91.30, catatan: 'Data kesehatan, SDG 3, Posyandu/ANC/stunting; F-029 perlu perbaikan & retest' },
  { peran: 'Masyarakat Umum', kodeKomponen: 'W-031–W-035', kodeFitur: 'F-031–F-035', n: 18, kualitasTotal: 3.19, sus: 62.22, uat: 87.96, catatan: 'Portal publik, layanan prioritas, forum, aspirasi & status usulan' },
] as const;

export const LOG_4_MINGGU_BAB4 = [
  { periode: 'Minggu 1', direncanakan: 252, selesai: 207, tingkat: 82.14, kesalahan: 93, bantuan: 107, tahap: 'Orientasi dan verifikasi' },
  { periode: 'Minggu 2', direncanakan: 252, selesai: 223, tingkat: 88.49, kesalahan: 40, bantuan: 64, tahap: 'Penggunaan dan pendampingan' },
  { periode: 'Minggu 3', direncanakan: 252, selesai: 237, tingkat: 94.05, kesalahan: 9, bantuan: 20, tahap: 'Penggunaan dan pendampingan' },
  { periode: 'Minggu 4', direncanakan: 252, selesai: 248, tingkat: 98.41, kesalahan: 0, bantuan: 3, tahap: 'Pengujian akhir' },
] as const;

export const PREPOST_6_KONSTRUK_BAB4 = [
  { sasaran: 'Kesiapan digital', n: 126, sebelum: 58.18, sesudah: 60.45, delta: 2.27, medianDelta: 2.20, uji: 'Uji t berpasangan', pHolm: '0,0900', signifikan: false },
  { sasaran: 'Kematangan digital', n: 121, sebelum: 1.94, sesudah: 2.53, delta: 0.59, medianDelta: 0.58, uji: 'Uji t berpasangan', pHolm: '2,56 × 10⁻¹⁶', signifikan: true },
  { sasaran: 'Integrasi data', n: 126, sebelum: 48.86, sesudah: 56.56, delta: 7.71, medianDelta: 9.55, uji: 'Uji tanda eksak', pHolm: '9,48 × 10⁻¹¹', signifikan: true },
  { sasaran: 'Pemantauan SDGs Desa', n: 126, sebelum: 50.74, sesudah: 58.35, delta: 7.62, medianDelta: 9.00, uji: 'Uji tanda eksak', pHolm: '2,01 × 10⁻¹¹', signifikan: true },
  { sasaran: 'Kualitas keputusan', n: 126, sebelum: 54.60, sesudah: 61.41, delta: 6.82, medianDelta: 9.80, uji: 'Uji tanda eksak', pHolm: '2,28 × 10⁻¹²', signifikan: true },
  { sasaran: 'Manfaat awal kualitas hidup', n: 126, sebelum: 68.43, sesudah: 69.97, delta: 1.54, medianDelta: 4.30, uji: 'Uji tanda eksak', pHolm: '1,69 × 10⁻⁷', signifikan: true },
] as const;

export const RUBRIK_KEMATANGAN_DIMENSI = [
  { kode: 'M1', nama: 'Infrastruktur & Teknologi', jonggonJaya: 2.68, kedangIpil: 2.31, lungAnai: 2.38 },
  { kode: 'M2', nama: 'SDM & Literasi Digital', jonggonJaya: 2.67, kedangIpil: 2.38, lungAnai: 2.41 },
  { kode: 'M3', nama: 'Tata Kelola & Kelembagaan', jonggonJaya: 2.65, kedangIpil: 2.42, lungAnai: 2.24 },
  { kode: 'M4', nama: 'Data & Sistem Informasi', jonggonJaya: 2.81, kedangIpil: 2.35, lungAnai: 2.45 },
  { kode: 'M5', nama: 'Layanan & Kualitas Hidup', jonggonJaya: 2.51, kedangIpil: 2.41, lungAnai: 2.57 },
  { kode: 'M6', nama: 'Budaya & Tata Kelola Adat', jonggonJaya: 2.75, kedangIpil: 2.53, lungAnai: 2.53 },
] as const;
