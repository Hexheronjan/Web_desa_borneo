const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai seed data untuk Layanan SLV...");

  // Pastikan tabel ModuleRecord ada
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS \`ModuleRecord\` (
      \`id\` varchar(191) NOT NULL,
      \`modulePath\` varchar(191) NOT NULL,
      \`moduleName\` varchar(191) NOT NULL,
      \`title\` varchar(191) NOT NULL,
      \`category\` varchar(191) NULL,
      \`description\` text NULL,
      \`valueText\` varchar(191) NULL,
      \`status\` varchar(64) NOT NULL DEFAULT 'Baru',
      \`createdBy\` varchar(191) NULL,
      \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      \`updatedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
      PRIMARY KEY (\`id\`),
      INDEX \`ModuleRecord_modulePath_createdAt_idx\` (\`modulePath\`, \`createdAt\`)
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  const moduleRecords = [
    // SDGs 3 - DESA SEHAT
    {
      modulePath: "/layanan-slv/posyandu-digital",
      moduleName: "Posyandu Digital",
      title: "Posyandu Balita Budi (Januari 2025)",
      category: "Imunisasi",
      description: "Pemeriksaan kesehatan balita dan imunisasi rutin bulan Januari 2025",
      valueText: "Balita Sehat: 45 | Imunisasi: 38 | Perlu Perhatian: 2",
      status: "Selesai",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/posyandu-digital",
      moduleName: "Posyandu Digital",
      title: "Posyandu Ibu Hamil (Februari 2025)",
      category: "Pemeriksaan Kehamilan",
      description: "Pemeriksaan rutin ibu hamil trimester ke-2 dan ke-3",
      valueText: "Ibu Hamil: 28 | Resiko Tinggi: 3 | Normal: 25",
      status: "Selesai",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/jadwal-kesehatan",
      moduleName: "Jadwal Kesehatan",
      title: "Posyandu Balita Bulanan",
      category: "Posyandu",
      description: "Jadwal posyandu balita setiap hari Selasa minggu ke-2",
      valueText: "Setiap Selasa minggu ke-2, 08:00-12:00 WIB di Balai Desa",
      status: "Aktif",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/jadwal-kesehatan",
      moduleName: "Jadwal Kesehatan",
      title: "Vaksinasi Massal COVID-19",
      category: "Vaksinasi",
      description: "Vaksinasi booster dosis ke-2 untuk lansia dan pelayan publik",
      valueText: "15 Maret 2025, 09:00-15:00 WIB di Puskesmas Pembantu",
      status: "Terjadwal",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/monitoring-kesehatan",
      moduleName: "Monitoring Kesehatan",
      title: "Cek Kesehatan Rutin - Budi Santoso",
      category: "Pemeriksaan Umum",
      description: "Pemeriksaan tekanan darah, gula darah, dan kolesterol",
      valueText: "Tekanan: 120/80 | Gula: 98 mg/dL | Kolesterol: 180 mg/dL | Status: Sehat",
      status: "Selesai",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/monitoring-kesehatan",
      moduleName: "Monitoring Kesehatan",
      title: "Monitoring Diabetes - Ibu Siti",
      category: "Penyakit Kronis",
      description: "Monitoring rutin pasien diabetes melitus tipe 2",
      valueText: "Gula Darah: 150 mg/dL | Status: Perlu Kontrol | Rekomendasi: Diet ketat",
      status: "Diproses",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/riwayat-kesehatan",
      moduleName: "Riwayat Kesehatan",
      title: "Rekam Medis - Andi Saputra",
      category: "Riwayat Medis",
      description: "Riwayat lengkap pemeriksaan kesehatan tahun 2024-2025",
      valueText: "Total Kunjungan: 12 | Terakhir: 20 Jan 2025 | Status: Sehat",
      status: "Arsip",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/edukasi-kesehatan",
      moduleName: "Edukasi Kesehatan",
      title: "Panduan Gizi Sehat untuk Balita",
      category: "Video",
      description: "Video edukasi tentang nutrisi seimbang untuk tumbuh kembang balita",
      valueText: "Target: Ibu dengan balita 0-5 tahun | Durasi: 15 menit",
      status: "Tersedia",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/edukasi-kesehatan",
      moduleName: "Edukasi Kesehatan",
      title: "Pencegahan Stunting",
      category: "PDF",
      description: "Modul panduan pencegahan stunting sejak kehamilan",
      valueText: "Target: Ibu hamil dan keluarga | Halaman: 24",
      status: "Tersedia",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/telekonsultasi",
      moduleName: "Telekonsultasi",
      title: "Konsultasi dengan Dr. Ahmad",
      category: "Dokter Umum",
      description: "Konsultasi online keluhan demam dan batuk",
      valueText: "Jadwal: 25 Jan 2025, 10:00 WIB | Platform: Zoom Meeting",
      status: "Terjadwal",
      createdBy: "nakes_posyandu"
    },
    {
      modulePath: "/layanan-slv/telekonsultasi",
      moduleName: "Telekonsultasi",
      title: "Konsultasi dengan Bidan Rina",
      category: "Bidan",
      description: "Konsultasi kehamilan trimester pertama",
      valueText: "Jadwal: 28 Jan 2025, 14:00 WIB | Platform: WhatsApp Video Call",
      status: "Terjadwal",
      createdBy: "nakes_posyandu"
    },

    // SDGs 4 - PENDIDIKAN BERKUALITAS
    {
      modulePath: "/layanan-slv/literasi-digital",
      moduleName: "Literasi Digital",
      title: "Modul 1: Internet Sehat dan Aman",
      category: "Keamanan Digital",
      description: "Panduan penggunaan internet yang aman untuk keluarga",
      valueText: "Progress: 100% | Sertifikat: Tersedia",
      status: "Selesai",
      createdBy: "guru_fasilitator"
    },
    {
      modulePath: "/layanan-slv/literasi-digital",
      moduleName: "Literasi Digital",
      title: "Modul 2: Kelola Data Pribadi",
      category: "Privasi Data",
      description: "Cara melindungi data pribadi di era digital",
      valueText: "Progress: 60% | Target: 2 minggu",
      status: "Diproses",
      createdBy: "guru_fasilitator"
    },
    {
      modulePath: "/layanan-slv/kelas-desa",
      moduleName: "Kelas Desa",
      title: "Pelatihan UMKM Digital Marketing",
      category: "Pelatihan",
      description: "Kelas pelatihan pemasaran digital untuk UMKM desa",
      valueText: "Batch: 3 | Peserta: 25/30 | Status: Pendaftaran Dibuka",
      status: "Aktif",
      createdBy: "guru_fasilitator"
    },
    {
      modulePath: "/layanan-slv/kelas-desa",
      moduleName: "Kelas Desa",
      title: "Pelatihan Tata Boga",
      category: "Keterampilan",
      description: "Pelatihan memasak dan pengelolaan katering",
      valueText: "Batch: 2 | Peserta: 20/20 | Status: Sedang Berjalan",
      status: "Aktif",
      createdBy: "guru_fasilitator"
    },
    {
      modulePath: "/layanan-slv/pelatihan-online",
      moduleName: "Pelatihan Online",
      title: "Kursus Microsoft Office",
      category: "Komputer",
      description: "Pelatihan penggunaan Word, Excel, dan PowerPoint",
      valueText: "Progress: 45% | Modul Selesai: 9/20",
      status: "Diproses",
      createdBy: "guru_fasilitator"
    },
    {
      modulePath: "/layanan-slv/pelatihan-online",
      moduleName: "Pelatihan Online",
      title: "Kursus Desain Grafis Dasar",
      category: "Desain",
      description: "Pelatihan Canva dan desain grafis untuk pemula",
      valueText: "Progress: 80% | Modul Selesai: 16/20",
      status: "Diproses",
      createdBy: "guru_fasilitator"
    },
    {
      modulePath: "/layanan-slv/sertifikasi",
      moduleName: "Sertifikasi",
      title: "Sertifikat Literasi Digital",
      category: "Sertifikat",
      description: "Sertifikat kelulusan modul Literasi Digital",
      valueText: "Nilai: 95 | Tanggal: 15 Jan 2025 | Status: Tersedia",
      status: "Tersedia",
      createdBy: "guru_fasilitator"
    },
    {
      modulePath: "/layanan-slv/sertifikasi",
      moduleName: "Sertifikasi",
      title: "Sertifikat Pelatihan UMKM",
      category: "Sertifikat",
      description: "Sertifikat pelatihan Digital Marketing UMKM",
      valueText: "Nilai: 88 | Tanggal: 10 Des 2024 | Status: Tersedia",
      status: "Tersedia",
      createdBy: "guru_fasilitator"
    },
    {
      modulePath: "/layanan-slv/riwayat-pelatihan",
      moduleName: "Riwayat Pelatihan",
      title: "Riwayat Pelatihan 2024-2025",
      category: "History",
      description: "Ringkasan seluruh pelatihan yang diikuti",
      valueText: "Total Pelatihan: 8 | Selesai: 5 | Sedang Berjalan: 3",
      status: "Arsip",
      createdBy: "guru_fasilitator"
    },

    // SDGs 18 - KELEMBAGAAN & BUDAYA
    {
      modulePath: "/layanan-slv/informasi-adat",
      moduleName: "Informasi Adat",
      title: "Sejarah Huma Betang Dayak",
      category: "Artikel",
      description: "Artikel tentang sejarah dan filosofi rumah adat Huma Betang",
      valueText: "Kategori: Budaya | Penulis: Lembaga Adat | Tahun: 2024",
      status: "Tersedia",
      createdBy: "lembaga_adat"
    },
    {
      modulePath: "/layanan-slv/informasi-adat",
      moduleName: "Informasi Adat",
      title: "Adat Istiadat Perkawinan Dayak",
      category: "Artikel",
      description: "Tata cara dan prosesi adat perkawinan suku Dayak",
      valueText: "Kategori: Sosial | Penulis: Lembaga Adat | Tahun: 2024",
      status: "Tersedia",
      createdBy: "lembaga_adat"
    },
    {
      modulePath: "/layanan-slv/kalender-adat",
      moduleName: "Kalender Adat",
      title: "Gawai Dayak 2025",
      category: "Agenda",
      description: "Festival tahunan Gawai Dayak - Hari Padi",
      valueText: "Tanggal: 25-27 Mei 2025 | Lokasi: Taman Budaya",
      status: "Terjadwal",
      createdBy: "lembaga_adat"
    },
    {
      modulePath: "/layanan-slv/kalender-adat",
      moduleName: "Kalender Adat",
      title: "Tiwah - Upacara Adat Pemakaman",
      category: "Agenda",
      description: "Upacara adat Tiwah untuk menghormati leluhur",
      valueText: "Tanggal: 15-20 Oktober 2025 | Lokasi: Desa Adat",
      status: "Terjadwal",
      createdBy: "lembaga_adat"
    },
    {
      modulePath: "/layanan-slv/arsip-budaya",
      moduleName: "Arsip Budaya",
      title: "Dokumen Hukum Adat Dayak",
      category: "Dokumen",
      description: "Kumpulan dokumen hukum adat dan aturan adat Dayak",
      valueText: "Jumlah Dokumen: 45 | Format: PDF | Tahun: 2010-2024",
      status: "Tersedia",
      createdBy: "lembaga_adat"
    },
    {
      modulePath: "/layanan-slv/arsip-budaya",
      moduleName: "Arsip Budaya",
      title: "Foto Dokumentasi Upacara Adat",
      category: "Foto",
      description: "Koleksi foto dokumentasi upacara adat Dayak",
      valueText: "Jumlah Foto: 120 | Format: JPG | Tahun: 2015-2024",
      status: "Tersedia",
      createdBy: "lembaga_adat"
    },
    {
      modulePath: "/layanan-slv/forum-desa",
      moduleName: "Forum Desa",
      title: "Diskusi Pengembangan Wisata Budaya",
      category: "Diskusi",
      description: "Forum diskusi tentang pengembangan wisata budaya desa",
      valueText: "Peserta: 45 | Topik: Wisata Huma Betang | Status: Aktif",
      status: "Aktif",
      createdBy: "lembaga_adat"
    },
    {
      modulePath: "/layanan-slv/forum-desa",
      moduleName: "Forum Desa",
      title: "Diskusi Pelestarian Bahasa Daerah",
      category: "Diskusi",
      description: "Forum diskusi pelestarian bahasa Dayak untuk generasi muda",
      valueText: "Peserta: 32 | Topik: Bahasa Dayak | Status: Aktif",
      status: "Aktif",
      createdBy: "lembaga_adat"
    },
    {
      modulePath: "/layanan-slv/musyawarah-digital",
      moduleName: "Musyawarah Digital",
      title: "Musyawarah Desa Q1 2025",
      category: "Voting",
      description: "Musyawarah digital untuk menentukan prioritas program desa",
      valueText: "Agenda: 5 | Peserta: 150 | Status: Voting Berlangsung",
      status: "Aktif",
      createdBy: "lembaga_adat"
    },
    {
      modulePath: "/layanan-slv/partisipasi-musyawarah",
      moduleName: "Partisipasi Musyawarah",
      title: "Voting Program Desa 2025",
      category: "Aspirasi",
      description: "Partisipasi voting untuk program prioritas desa tahun 2025",
      valueText: "Pilihan: Pembangunan Jalan | Suara: 89 | Status: Terhitung",
      status: "Selesai",
      createdBy: "lembaga_adat"
    },

    // PROFIL PENGGUNA
    {
      modulePath: "/layanan-slv/profil-saya",
      moduleName: "Profil Saya",
      title: "Profil Pengguna - Andi Saputra",
      category: "Biodata",
      description: "Data profil lengkap Layanan SLV",
      valueText: "NIK: 1201010101010001 | Email: layanan@borneo.id | Status: Aktif",
      status: "Aktif",
      createdBy: "layanan_slv"
    },
    {
      modulePath: "/layanan-slv/riwayat-layanan",
      moduleName: "Riwayat Layanan",
      title: "Riwayat Penggunaan Layanan",
      category: "History",
      description: "Riwayat seluruh layanan yang digunakan pengguna",
      valueText: "Total Akses: 156 | Modul Aktif: 8 | Terakhir: Hari ini",
      status: "Arsip",
      createdBy: "layanan_slv"
    },
    {
      modulePath: "/layanan-slv/notifikasi",
      moduleName: "Notifikasi",
      title: "Notifikasi Jadwal Posyandu",
      category: "Informasi",
      description: "Pengingat jadwal posyandu balita bulan Februari",
      valueText: "Tanggal: 5 Feb 2025 | Pesan: Jangan lupa bawa buku KIA",
      status: "Terkirim",
      createdBy: "system"
    },
    {
      modulePath: "/layanan-slv/notifikasi",
      moduleName: "Notifikasi",
      title: "Notifikasi Pelatihan Baru",
      category: "Informasi",
      description: "Informasi pelatihan baru yang tersedia",
      valueText: "Pelatihan: Digital Marketing | Pendaftaran: Dibuka",
      status: "Terkirim",
      createdBy: "system"
    },
    {
      modulePath: "/layanan-slv/bantuan-panduan",
      moduleName: "Bantuan & Panduan",
      title: "Cara Menggunakan Layanan Posyandu Digital",
      category: "FAQ",
      description: "Panduan lengkap cara mengakses dan menggunakan layanan posyandu digital",
      valueText: "Kategori: Kesehatan | Bahasa: Indonesia | Dilihat: 245",
      status: "Tersedia",
      createdBy: "admin_super"
    },
    {
      modulePath: "/layanan-slv/bantuan-panduan",
      moduleName: "Bantuan & Panduan",
      title: "Panduan Pendaftaran Kelas Desa",
      category: "Tutorial",
      description: "Langkah-langkah mendaftar dan mengikuti kelas pelatihan desa",
      valueText: "Kategori: Pendidikan | Bahasa: Indonesia | Dilihat: 189",
      status: "Tersedia",
      createdBy: "admin_super"
    },
    {
      modulePath: "/layanan-slv/bantuan-panduan",
      moduleName: "Bantuan & Panduan",
      title: "FAQ - Pertanyaan Umum Sistem",
      category: "FAQ",
      description: "Kumpulan pertanyaan yang sering diajukan pengguna",
      valueText: "Kategori: Umum | Jumlah Pertanyaan: 25 | Dilihat: 512",
      status: "Tersedia",
      createdBy: "admin_super"
    },
    {
      modulePath: "/layanan-slv/bantuan-panduan",
      moduleName: "Bantuan & Panduan",
      title: "Kontak Bantuan Teknis",
      category: "Bantuan",
      description: "Informasi kontak untuk bantuan teknis dan dukungan sistem",
      valueText: "Email: support@borneo.id | WA: 0812-3456-7890 | Jam: 08:00-17:00",
      status: "Tersedia",
      createdBy: "admin_super"
    },
  ];

  let successCount = 0;
  let errorCount = 0;

  for (const record of moduleRecords) {
    try {
      const id = `modrec_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      
      await prisma.$executeRaw`
        INSERT INTO ModuleRecord (id, modulePath, moduleName, title, category, description, valueText, status, createdBy)
        VALUES (${id}, ${record.modulePath}, ${record.moduleName}, ${record.title}, ${record.category}, ${record.description}, ${record.valueText}, ${record.status}, ${record.createdBy})
      `;
      
      successCount++;
      console.log(`✅ ${record.moduleName} - ${record.title}`);
    } catch (error) {
      errorCount++;
      console.log(`⚠️  Gagal: ${record.moduleName} - ${record.title} - ${error.message}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log(`🎉 Selesai! Berhasil: ${successCount} | Gagal: ${errorCount}`);
  console.log("=".repeat(60));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
