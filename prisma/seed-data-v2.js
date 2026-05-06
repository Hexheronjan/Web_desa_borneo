const { PrismaClient } = require("../src/generated/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Menambahkan data tambahan (RW/RT, Warga, dan Telemedicine)...");

  const desa = await prisma.desa.findFirst();
  if (!desa) {
    console.error("Desa tidak ditemukan.");
    return;
  }

  // 1. Buat RW/RT tambahan
  const rwrtData = [
    { rw: "01", rt: "01", jumlahWarga: 45 },
    { rw: "01", rt: "02", jumlahWarga: 38 },
    { rw: "02", rt: "01", jumlahWarga: 52 },
    { rw: "02", rt: "02", jumlahWarga: 40 },
    { rw: "03", rt: "01", jumlahWarga: 25 },
  ];
  
  for (const item of rwrtData) {
    await prisma.rwRt.upsert({
      where: { id: `rwrt_${item.rw}_${item.rt}` },
      update: {},
      create: {
        id: `rwrt_${item.rw}_${item.rt}`,
        desaId: desa.id,
        rw: item.rw,
        rt: item.rt,
        jumlahWarga: item.jumlahWarga,
      }
    });
  }
  const allRwRt = await prisma.rwRt.findMany();
  console.log("✅ Data RW/RT tambahan siap.");

  // 2. Buat 50 Warga (biar tidak terlalu lama tapi cukup banyak)
  const namaDepan = ["Budi", "Siti", "Andi", "Dewi", "Joko", "Rina", "Agus", "Ayu", "Yudi", "Sri"];
  const namaBelakang = ["Santoso", "Putri", "Kurniawan", "Lestari", "Pratama", "Sari", "Widodo", "Rahayu", "Saputra", "Wahyuni"];

  for (let i = 1; i <= 50; i++) {
    const randomRwRt = allRwRt[Math.floor(Math.random() * allRwRt.length)];
    const jk = Math.random() > 0.5 ? "L" : "P";
    const nama = `${namaDepan[Math.floor(Math.random() * namaDepan.length)]} ${namaBelakang[Math.floor(Math.random() * namaBelakang.length)]}`;
    const nik = `6404${Math.floor(100000000000 + Math.random() * 900000000000)}`;

    await prisma.warga.upsert({
      where: { nik: nik },
      update: {},
      create: {
        desaId: desa.id,
        rwRtId: randomRwRt.id,
        nik: nik,
        nama: nama,
        tempatLahir: "Paser",
        tanggalLahir: new Date(1970 + Math.floor(Math.random() * 40), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        jenisKelamin: jk,
        alamat: `Jl. Adat Borneo No. ${i}`,
        status: i % 10 === 0 ? "Review" : (i % 15 === 0 ? "Baru" : "Aktif"),
      }
    });
  }
  console.log("✅ 50 Data Warga berhasil ditambahkan.");

  // 3. Buat Data Smart Sehat (Telemedicine)
  const wargaSamples = await prisma.warga.findMany({ take: 10 });
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
  console.log("✅ Data Telemedicine siap.");

  console.log("\nSemua data dummy tambahan sudah masuk!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
