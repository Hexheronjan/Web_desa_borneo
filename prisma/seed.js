const { PrismaClient } = require('../src/generated/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create Desa
  const desa = await prisma.desa.create({
    data: {
      nama: 'Desa Adat Borneo',
      kecamatan: 'Kecamatan Adat',
      kabupaten: 'Kabupaten Borneo',
      provinsi: 'Kalimantan Tengah',
      luasWilayah: 5000.5,
      sejarah: 'Desa adat dengan budaya Dayak yang kaya.',
    },
  });
  console.log('✅ Created Desa:', desa.nama);

  // Create RwRt
  const rwRt = await prisma.rwRt.create({
    data: {
      desaId: desa.id,
      rw: '01',
      rt: '01',
      jumlahWarga: 100,
    },
  });
  console.log('✅ Created RwRt:', rwRt.rw, rwRt.rt);

  // Create Warga
  const wargaData = [
    {
      nik: '1234567890123456',
      nama: 'Rudi Warga',
      tempatLahir: 'Jakarta',
      tanggalLahir: new Date('1990-01-01'),
      jenisKelamin: 'L',
      alamat: 'Jl. Adat No. 1',
    },
    {
      nik: '1234567890123457',
      nama: 'Siti Warga',
      tempatLahir: 'Bandung',
      tanggalLahir: new Date('1992-05-15'),
      jenisKelamin: 'P',
      alamat: 'Jl. Adat No. 2',
    },
  ];

  const wargaRecords = await Promise.all(
    wargaData.map((w) =>
      prisma.warga.create({
        data: {
          ...w,
          desaId: desa.id,
          rwRtId: rwRt.id,
          status: 'Aktif',
        },
      })
    )
  );
  console.log('✅ Created Warga:', wargaRecords.length, 'records');

  // Create Users sesuai Excel
  const users = [
    {
      name: 'Dr. Ahmad Surya',
      email: 'admin@borneo.id',
      username: 'admin_super',
      password: 'password123',
      role: 'admin_super',
      status: 'Aktif',
      desaId: desa.id,
    },
    {
      name: 'Siti Nurhaliza',
      email: 'operator1@borneo.id',
      username: 'operator_sid01',
      password: 'password123',
      role: 'operator_sid',
      status: 'Aktif',
      desaId: desa.id,
    },
    {
      name: 'Bapak Lurah Hasan',
      email: 'pemdes@borneo.id',
      username: 'pemdes_hasan',
      password: 'password123',
      role: 'pemerintah_desa',
      status: 'Aktif',
      desaId: desa.id,
    },
    {
      name: 'Ketua BPD Rina',
      email: 'bpd@borneo.id',
      username: 'bpd_rina',
      password: 'password123',
      role: 'bpd',
      status: 'Aktif',
      desaId: desa.id,
    },
    {
      name: 'Tetua Adat Buyung',
      email: 'adat@borneo.id',
      username: 'adat_buyung',
      password: 'password123',
      role: 'lembaga_adat',
      status: 'Aktif',
      desaId: desa.id,
    },
    {
      name: 'Guru Budaya Dewi',
      email: 'guru@borneo.id',
      username: 'guru_dewi',
      password: 'password123',
      role: 'guru_fasilitator',
      status: 'Aktif',
      desaId: desa.id,
    },
    {
      name: 'Bidan Kartini',
      email: 'nakes@borneo.id',
      username: 'nakes_kartini',
      password: 'password123',
      role: 'nakes_posyandu',
      status: 'Aktif',
      desaId: desa.id,
    },
    {
      name: 'Rudi Warga',
      email: 'warga@borneo.id',
      username: 'warga_rudi',
      password: 'password123',
      role: 'warga',
      status: 'Aktif',
      desaId: desa.id,
      wargaId: wargaRecords[0].id,
    },
    {
      name: 'Dinas PMD Joko',
      email: 'dinas@borneo.id',
      username: 'dinas_joko',
      password: 'password123',
      role: 'dinas_pmd',
      status: 'Aktif',
      desaId: desa.id,
    },
    {
      name: 'Dr. Peneliti Andi',
      email: 'peneliti@borneo.id',
      username: 'peneliti_andi',
      password: 'password123',
      role: 'peneliti',
      status: 'Aktif',
      desaId: desa.id,
    },
  ];

  const createdUsers = await Promise.all(
    users.map((user) =>
      prisma.user.create({
        data: user,
      })
    )
  );

  console.log('✅ Created Users:', createdUsers.length, 'records');
  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
