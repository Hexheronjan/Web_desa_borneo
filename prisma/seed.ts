import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient({});

async function main() {
  console.log("Mulai melakukan seeding (menyuntikkan data dummy)...");

  // 1. Buat Desa
  const desa = await prisma.desa.create({
    data: {
      nama: "Desa Adat Borneo",
      kecamatan: "Dayak Paser",
      kabupaten: "Paser",
      provinsi: "Kalimantan Timur",
      luasWilayah: 125000,
      sejarah: "Desa adat pelopor digitalisasi di Kalimantan Timur.",
    },
  });
  console.log("✅ Data Desa terbuat!");

  // 2. Buat User Admin & Warga (sebagai contoh)
  await prisma.user.createMany({
    data: [
      { name: "Super Admin", email: "admin@desa.id", password: "123", role: "admin_super", desaId: desa.id },
      { name: "Kepala Adat", email: "adat@desa.id", password: "123", role: "lembaga_adat", desaId: desa.id },
      { name: "Guru Penggerak", email: "guru@desa.id", password: "123", role: "guru_fasilitator", desaId: desa.id },
    ] as any[]
  });
  console.log("✅ Data User / Akun terbuat!");

  // 3. Buat RW/RT
  const rwrtData = [
    { rw: "01", rt: "01", jumlahWarga: 45 },
    { rw: "01", rt: "02", jumlahWarga: 38 },
    { rw: "02", rt: "01", jumlahWarga: 52 },
    { rw: "02", rt: "02", jumlahWarga: 40 },
    { rw: "03", rt: "01", jumlahWarga: 25 },
  ];
  
  for (const item of rwrtData) {
    await prisma.rwRt.create({
      data: {
        desaId: desa.id,
        rw: item.rw,
        rt: item.rt,
        jumlahWarga: item.jumlahWarga,
      }
    });
  }
  const allRwRt = await prisma.rwRt.findMany();
  console.log("✅ Data RW/RT terbuat!");

  // 4. Buat 200 Warga secara Loop
  const wargaList: any[] = [];
  const namaDepan = ["Budi", "Siti", "Andi", "Dewi", "Joko", "Rina", "Agus", "Ayu", "Yudi", "Sri"];
  const namaBelakang = ["Santoso", "Putri", "Kurniawan", "Lestari", "Pratama", "Sari", "Widodo", "Rahayu", "Saputra", "Wahyuni"];

  for (let i = 1; i <= 200; i++) {
    const randomRwRt = allRwRt[Math.floor(Math.random() * allRwRt.length)];
    const jk = Math.random() > 0.5 ? "L" : "P";
    const nama = `${namaDepan[Math.floor(Math.random() * namaDepan.length)]} ${namaBelakang[Math.floor(Math.random() * namaBelakang.length)]}`;
    
    wargaList.push({
      desaId: desa.id,
      rwRtId: randomRwRt.id,
      nik: `6404${Math.floor(100000000000 + Math.random() * 900000000000)}`,
      nama: nama,
      tempatLahir: "Paser",
      tanggalLahir: new Date(1970 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      jenisKelamin: jk as "L" | "P",
      alamat: `Jl. Adat Borneo No. ${i}`,
      status: i % 10 === 0 ? "Review" : (i % 15 === 0 ? "Baru" : "Aktif"),
    });
  }

  await prisma.warga.createMany({ data: wargaList });
  console.log("✅ 200 Data Warga berhasil disuntikkan!");

  // 5. Buat Data Smart Sehat (Telemedicine)
  const wargaSamples = await prisma.warga.findMany({ take: 15 });
  for (const warga of wargaSamples) {
    await prisma.telemedicine.create({
      data: {
        wargaId: warga.id,
        waktu: new Date(),
        status: "Aktif",
        catatanKonsultasi: "Keluhan demam dan flu ringan.",
      }
    });
  }
  console.log("✅ Data Telemedicine terbuat!");

  console.log("🎉 SEEDING SELESAI!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
