const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai pendaftaran 10 pengguna untuk semua role...");

  const desa = await prisma.desa.findFirst();
  if (!desa) {
    console.error("Desa tidak ditemukan. Pastikan seed warga sudah dijalankan.");
    return;
  }

  const users = [
    {
      email: "admin@borneo.id",
      name: "Joy Nashar",
      username: "admin_super",
      password: "password123",
      role: "admin_super",
      description: "Akses penuh ke seluruh sistem"
    },
    {
      email: "operator.sid@borneo.id",
      name: "Operator SID Desa",
      username: "operator_sid",
      password: "password123",
      role: "operator_sid",
      description: "Pengelola Sistem Informasi Desa"
    },
    {
      email: "pemdes@borneo.id",
      name: "Kepala Desa Lung Anai",
      username: "kepala_desa",
      password: "password123",
      role: "pemerintah_desa",
      description: "Pemerintah Desa - Kepala Desa"
    },
    {
      email: "bpd@borneo.id",
      name: "Ketua BPD Desa",
      username: "ketua_bpd",
      password: "password123",
      role: "bpd",
      description: "Badan Permusyawaratan Desa"
    },
    {
      email: "adat@borneo.id",
      name: "Ketua Lembaga Adat Dayak",
      username: "ketua_adat",
      password: "password123",
      role: "lembaga_adat",
      description: "Lembaga Adat Dayak Borneo"
    },
    {
      email: "guru@borneo.id",
      name: "Guru Fasilitator Desa",
      username: "guru_fasilitator",
      password: "password123",
      role: "guru_fasilitator",
      description: "Guru dan Fasilitator Pembelajaran"
    },
    {
      email: "nakes@borneo.id",
      name: "Nakes Posyandu Desa",
      username: "nakes_posyandu",
      password: "password123",
      role: "nakes_posyandu",
      description: "Tenaga Kesehatan Posyandu"
    },
    {
      email: "tokoh.masyarakat@contoh.id",
      name: "Tokoh/Perwakilan Masyarakat Desa Lung Anai",
      username: "warga_desa",
      password: "password123",
      role: "warga",
      description: "Tokoh Masyarakat"
    },
    {
      email: "dinas.pmd@borneo.id",
      name: "Dinas PMD Regional",
      username: "dinas_pmd",
      password: "password123",
      role: "dinas_pmd",
      description: "Dinas Pemberdayaan Masyarakat Desa"
    },
    {
      email: "peneliti@borneo.id",
      name: "Joy Nashar",
      username: "peneliti_slv",
      password: "password123",
      role: "peneliti",
      description: "Peneliti Smart Living Village"
    },
    {
      email: "layanan@borneo.id",
      name: "Andi Saputra",
      username: "layanan_slv",
      password: "password123",
      role: "layanan_slv",
      description: "Layanan SLV Smart Living Village"
    }
  ];

  for (const userData of users) {
    try {
      await prisma.user.upsert({
        where: { email: userData.email },
        update: {
          password: userData.password,
          role: userData.role,
          name: userData.name,
          username: userData.username,
          desaId: desa.id
        },
        create: {
          email: userData.email,
          name: userData.name,
          username: userData.username,
          password: userData.password,
          role: userData.role,
          desaId: desa.id,
        },
      });
      console.log(`✅ ${userData.description}: ${userData.email} | Password: ${userData.password}`);
    } catch (error) {
      console.log(`⚠️  Gagal membuat ${userData.description}: ${error.message}`);
    }
  }

  console.log("\n🎉 Semua pengguna berhasil didaftarkan ke MySQL!");
  console.log("\n📋 Daftar Login:");
  console.log("=".repeat(60));
  users.forEach(user => {
    console.log(`\n👤 ${user.description}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Username: ${user.username}`);
    console.log(`   Password: ${user.password}`);
    console.log(`   Role: ${user.role}`);
  });
  console.log("\n" + "=".repeat(60));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });