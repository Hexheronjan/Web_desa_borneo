import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding sample data...');

  // Get or create Desa
  let desa = await prisma.desa.findFirst();
  if (!desa) {
    desa = await prisma.desa.create({
      data: {
        nama: 'Desa Adat Borneo',
        kecamatan: 'Kecamatan Contoh',
        kabupaten: 'Kabupaten Contoh',
        provinsi: 'Kalimantan',
        luasWilayah: 1000,
        sejarah: 'Desa adat dengan budaya kaya raya',
      }
    });
    console.log('✅ Created Desa:', desa.nama);
  }

  // Get or create RwRt
  let rwRt = await prisma.rwRt.findFirst({ where: { desaId: desa.id } });
  if (!rwRt) {
    rwRt = await prisma.rwRt.create({
      data: {
        desaId: desa.id,
        rw: '01',
        rt: '01',
        jumlahWarga: 10,
      }
    });
    console.log('✅ Created RwRt:', rwRt.rw, rwRt.rt);
  }

  // Sample Warga data
  const wargaData = [
    {
      desaId: desa.id,
      rwRtId: rwRt.id,
      nik: '1234567890123456',
      nama: 'Ahmad Balita',
      tempatLahir: 'Banjarmasin',
      tanggalLahir: new Date('2022-05-15'),
      jenisKelamin: 'L' as const,
      alamat: 'Jl. Contoh No. 1',
      noHp: '081234567890',
      status: 'Aktif' as const,
    },
    {
      desaId: desa.id,
      rwRtId: rwRt.id,
      nik: '1234567890123457',
      nama: 'Siti Balita',
      tempatLahir: 'Banjarmasin',
      tanggalLahir: new Date('2022-08-20'),
      jenisKelamin: 'P' as const,
      alamat: 'Jl. Contoh No. 2',
      noHp: '081234567891',
      status: 'Aktif' as const,
    },
    {
      desaId: desa.id,
      rwRtId: rwRt.id,
      nik: '1234567890123458',
      nama: 'Budi Balita',
      tempatLahir: 'Banjarmasin',
      tanggalLahir: new Date('2023-01-10'),
      jenisKelamin: 'L' as const,
      alamat: 'Jl. Contoh No. 3',
      noHp: '081234567892',
      status: 'Aktif' as const,
    },
    {
      desaId: desa.id,
      rwRtId: rwRt.id,
      nik: '1234567890123459',
      nama: 'Dewi Ibu Hamil',
      tempatLahir: 'Banjarmasin',
      tanggalLahir: new Date('1995-03-25'),
      jenisKelamin: 'P' as const,
      alamat: 'Jl. Contoh No. 4',
      noHp: '081234567893',
      status: 'Aktif' as const,
    },
    {
      desaId: desa.id,
      rwRtId: rwRt.id,
      nik: '1234567890123460',
      nama: 'Rina Ibu Hamil',
      tempatLahir: 'Banjarmasin',
      tanggalLahir: new Date('1992-07-12'),
      jenisKelamin: 'P' as const,
      alamat: 'Jl. Contoh No. 5',
      noHp: '081234567894',
      status: 'Aktif' as const,
    },
  ];

  // Create Warga records
  const createdWarga = [];
  for (const w of wargaData) {
    const existing = await prisma.warga.findUnique({ where: { nik: w.nik } });
    if (!existing) {
      const created = await prisma.warga.create({ data: w });
      createdWarga.push(created);
      console.log('✅ Created Warga:', created.nama, '-', created.nik);
    } else {
      createdWarga.push(existing);
      console.log('⏭️  Warga already exists:', existing.nama);
    }
  }

  // Sample Stunting data
  const stuntingData = [
    {
      wargaId: createdWarga[0].id,
      tanggal: new Date('2024-06-01'),
      bb: 8.5,
      tb: 72,
      umurBulan: 24,
      zScore: -1.2,
      kategori: 'Normal' as const,
      rekomendasi: 'Lanjutkan pemberian makanan bergizi',
    },
    {
      wargaId: createdWarga[1].id,
      tanggal: new Date('2024-06-01'),
      bb: 7.2,
      tb: 68,
      umurBulan: 22,
      zScore: -2.5,
      kategori: 'RisikoSedang' as const,
      rekomendasi: 'Perlu tambahan gizi dan monitoring rutin',
    },
    {
      wargaId: createdWarga[2].id,
      tanggal: new Date('2024-06-01'),
      bb: 6.8,
      tb: 65,
      umurBulan: 17,
      zScore: -3.1,
      kategori: 'RisikoTinggi' as const,
      rekomendasi: 'Segera rujuk ke puskesmas untuk intervensi stunting',
    },
  ];

  for (const s of stuntingData) {
    const existing = await prisma.stunting.findFirst({
      where: { wargaId: s.wargaId, tanggal: s.tanggal }
    });
    if (!existing) {
      await prisma.stunting.create({ data: s });
      console.log('✅ Created Stunting record');
    } else {
      console.log('⏭️  Stunting record already exists');
    }
  }

  // Sample Monitoring data
  const monitoringData = [
    {
      wargaId: createdWarga[3].id,
      tanggal: new Date('2024-06-01'),
      beratBadan: 55,
      tinggiBadan: 160,
      tensiSistolik: 120,
      tensiDiastolik: 80,
      suhu: 36.5,
      alert: false,
    },
    {
      wargaId: createdWarga[4].id,
      tanggal: new Date('2024-06-01'),
      beratBadan: 48,
      tinggiBadan: 155,
      tensiSistolik: 145,
      tensiDiastolik: 95,
      suhu: 36.8,
      alert: true,
    },
  ];

  for (const m of monitoringData) {
    const existing = await prisma.monitoringKesehatan.findFirst({
      where: { wargaId: m.wargaId, tanggal: m.tanggal }
    });
    if (!existing) {
      await prisma.monitoringKesehatan.create({ data: m });
      console.log('✅ Created Monitoring record');
    } else {
      console.log('⏭️  Monitoring record already exists');
    }
  }

  // Sample Posyandu data
  const posyanduData = [
    {
      desaId: desa.id,
      tanggal: new Date('2024-06-05'),
      lokasi: 'Balai Desa',
      jumlahBalita: 25,
      jumlahImunisasi: 20,
      catatan: 'Posyandu bulanan berjalan lancar',
    },
    {
      desaId: desa.id,
      tanggal: new Date('2024-06-20'),
      lokasi: 'Posyandu RW 01',
      jumlahBalita: 18,
      jumlahImunisasi: 15,
      catatan: 'Imunisasi campak dan polio',
    },
    {
      desaId: desa.id,
      tanggal: new Date('2024-07-05'),
      lokasi: 'Balai Desa',
      jumlahBalita: 30,
      jumlahImunisasi: 28,
      catatan: 'Posyandu bulanan dengan tambahan vitamin A',
    },
  ];

  for (const p of posyanduData) {
    const existing = await prisma.posyandu.findFirst({
      where: { desaId: p.desaId, tanggal: p.tanggal, lokasi: p.lokasi }
    });
    if (!existing) {
      await prisma.posyandu.create({ data: p });
      console.log('✅ Created Posyandu record');
    } else {
      console.log('⏭️  Posyandu record already exists');
    }
  }

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
