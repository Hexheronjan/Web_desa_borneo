const { PrismaClient } = require("../src/generated/client");

const DATABASE_URL = "mysql://root:idwPiISsUAzUEgujpxdVgwiLJyBapJnv@reseau.proxy.rlwy.net:19476/railway";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL
    }
  }
});

async function main() {
  console.log("🔄 Connecting to Railway MySQL...");
  
  // Cek apakah ada desa, jika tidak buat dummy desa
  let desa = await prisma.desa.findFirst();
  if (!desa) {
    console.log("⚠️  Desa tidak ditemukan, membuat dummy desa...");
    desa = await prisma.desa.create({
      data: {
        id: 'desa-borneo-01',
        nama: "Desa Adat Borneo",
        kecamatan: "Tenggarong Seberang",
        kabupaten: "Kutai Kartanegara",
        provinsi: "Kalimantan Timur"
      }
    });
    console.log(`✅ Dummy desa created: ${desa.id}`);
  } else {
    console.log(`✅ Desa sudah ada: ${desa.id}`);
  }

  console.log("📝 Seeding users to Railway database...");

  const users = [
    {
      id: 'user-admin',
      email: "admin@borneo.id",
      name: "Super Admin Pemerintah Desa",
      username: "admin_super",
      password: "password123",
      role: "admin_super"
    },
    {
      id: 'user-operator',
      email: "operator@borneo.id",
      name: "Operator SID Desa",
      username: "operator_sid",
      password: "password123",
      role: "operator_sid"
    },
    {
      id: 'user-pemdes',
      email: "pemdes@borneo.id",
      name: "Kepala Desa Lung Anai",
      username: "kepala_desa",
      password: "password123",
      role: "pemerintah_desa"
    },
    {
      id: 'user-bpd',
      email: "bpd@borneo.id",
      name: "Ketua BPD Desa",
      username: "ketua_bpd",
      password: "password123",
      role: "bpd"
    },
    {
      id: 'user-adat',
      email: "adat@borneo.id",
      name: "Ketua Lembaga Adat Dayak",
      username: "ketua_adat",
      password: "password123",
      role: "lembaga_adat"
    },
    {
      id: 'user-guru',
      email: "guru@borneo.id",
      name: "Guru Fasilitator Desa",
      username: "guru_fasilitator",
      password: "password123",
      role: "guru_fasilitator"
    },
    {
      id: 'user-nakes',
      email: "nakes@borneo.id",
      name: "Nakes Posyandu Desa",
      username: "nakes_posyandu",
      password: "password123",
      role: "nakes_posyandu"
    },
    {
      id: 'user-warga',
      email: "warga@borneo.id",
      name: "Warga Desa Lung Anai",
      username: "warga_desa",
      password: "password123",
      role: "warga"
    },
    {
      id: 'user-dinas',
      email: "dinas@borneo.id",
      name: "Dinas PMD Regional",
      username: "dinas_pmd",
      password: "password123",
      role: "dinas_pmd"
    },
    {
      id: 'user-peneliti',
      email: "peneliti@borneo.id",
      name: "Peneliti SLV Borneo",
      username: "peneliti_slv",
      password: "password123",
      role: "peneliti"
    },
    {
      id: 'user-layanan',
      email: "layanan@borneo.id",
      name: "Andi Saputra",
      username: "layanan_slv",
      password: "password123",
      role: "layanan_slv"
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
          id: userData.id,
          email: userData.email,
          name: userData.name,
          username: userData.username,
          password: userData.password,
          role: userData.role,
          desaId: desa.id,
        },
      });
      console.log(`✅ ${userData.email} - ${userData.role}`);
    } catch (error) {
      console.log(`⚠️  Failed for ${userData.email}: ${error.message}`);
    }
  }

  console.log("\n🎉 All users seeded to Railway database!");
  console.log("\n📋 Login credentials:");
  console.log("Email: admin@borneo.id");
  console.log("Password: password123");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
