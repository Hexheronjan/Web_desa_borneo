const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai pengisian data (seeding)...");

  // 1. Buat Desa & RW/RT
  const desa = await prisma.desa.upsert({
    where: { id: "clv_desa_borneo_01" },
    update: {},
    create: {
      id: "clv_desa_borneo_01",
      nama: "Desa Adat Borneo",
      kecamatan: "Kecamatan Dayak",
      kabupaten: "Kabupaten Borneo",
      provinsi: "Kalimantan",
    },
  });

  const rwrt = await prisma.rwRt.upsert({
    where: { id: "clv_rwrt_01" },
    update: {},
    create: {
      id: "clv_rwrt_01",
      desaId: desa.id,
      rw: "001",
      rt: "001",
    },
  });

  // 2. Buat Data Warga
  const budiWarga = await prisma.warga.upsert({
    where: { nik: "1234567890123456" },
    update: {},
    create: {
      id: "warga_budi_01",
      desaId: desa.id,
      rwRtId: rwrt.id,
      nik: "1234567890123456",
      nama: "Budi Santoso",
      tempatLahir: "Borneo",
      tanggalLahir: new Date("1995-05-15"),
      jenisKelamin: "L",
      alamat: "Jl. Budaya Borneo No. 10",
      status: "Aktif",
    },
  });

  // 3. Buat Akun Login User untuk Warga
  // Catatan: Karena ini prototype, kita simpan password apa adanya atau sesuai sistem auth Anda
  const userBudi = await prisma.user.upsert({
    where: { email: "warga@borneo.id" },
    update: { wargaId: budiWarga.id },
    create: {
      email: "warga@borneo.id",
      name: "Budi Santoso",
      password: "password123", 
      role: "warga",
      desaId: desa.id,
      wargaId: budiWarga.id,
    },
  });

  // 4. Data Kesehatan Budi
  await prisma.rekamMedis.create({
    data: {
      wargaId: budiWarga.id,
      tanggal: new Date(),
      diagnosis: "Flu Ringan",
      nakes: "Dr. Siti",
      alergi: "Obat Paracetamol",
    }
  });

  await prisma.stunting.create({
    data: {
      wargaId: budiWarga.id,
      tanggal: new Date(),
      bb: 15.5,
      tb: 95.0,
      umurBulan: 36,
      zScore: -1.2,
      kategori: "Normal",
    }
  });

  // 5. Data Belajar Budi
  const kelas = await prisma.kelas.create({
    data: {
      desaId: desa.id,
      modul: "e_learning",
      nama: "Seni Tari Dayak Dasar",
      batch: "Batch 1",
      waktu: "Online",
    }
  });

  await prisma.pesertaKelas.create({
    data: {
      kelasId: kelas.id,
      wargaId: budiWarga.id,
      status: "Aktif",
      sertifikat: "CERT-BORNEO-001",
    }
  });

  // 6. Notifikasi untuk Budi
  await prisma.notifikasi.createMany({
    data: [
      {
        userId: userBudi.id,
        judul: "Jadwal Posyandu",
        pesan: "Besok pagi jam 08:00 ada jadwal Posyandu di Balai Desa.",
        tipe: "Kesehatan",
      },
      {
        userId: userBudi.id,
        judul: "Sertifikat Terbit",
        pesan: "Selamat! Sertifikat Seni Tari Dayak Anda sudah tersedia.",
        tipe: "Belajar",
      }
    ]
  });

  console.log("Seeding selesai! Silakan login dengan:");
  console.log("Email: warga@borneo.id");
  console.log("Pass : password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
