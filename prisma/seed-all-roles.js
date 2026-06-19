const { PrismaClient } = require("../src/generated/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Membuat akun untuk semua role...");

  const desa = await prisma.desa.findFirst();
  if (!desa) {
    console.error("Desa tidak ditemukan!");
    return;
  }

  const roles = [
    { email: "admin@borneo.id", name: "Admin Super", role: "admin_super", password: "password123" },
    { email: "pemdes@borneo.id", name: "Pemerintah Desa", role: "pemerintah_desa", password: "password123" },
    { email: "operator@borneo.id", name: "Operator SID", role: "operator_sid", password: "password123" },
    { email: "bpd@borneo.id", name: "Badan Permusyawaratan Desa", role: "bpd", password: "password123" },
    { email: "adat@borneo.id", name: "Lembaga Adat", role: "lembaga_adat", password: "password123" },
    { email: "guru@borneo.id", name: "Guru Fasilitator", role: "guru_fasilitator", password: "password123" },
    { email: "nakes@borneo.id", name: "Nakes Posyandu", role: "nakes_posyandu", password: "password123" },
    { email: "warga@borneo.id", name: "Warga Desa", role: "warga", password: "password123" },
    { email: "dinas@borneo.id", name: "Dinas PMD", role: "dinas_pmd", password: "password123" },
    { email: "peneliti@borneo.id", name: "Peneliti", role: "peneliti", password: "password123" },
  ];

  for (const userData of roles) {
    try {
      // First try to find if user exists
      const existingUser = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUser) {
        // Update existing user
        await prisma.user.update({
          where: { email: userData.email },
          data: {
            name: userData.name,
            role: userData.role,
            password: userData.password,
          },
        });
        console.log(`✅ Akun ${userData.role} berhasil diupdate: ${userData.email}`);
      } else {
        // Create new user
        await prisma.user.create({
          data: {
            email: userData.email,
            name: userData.name,
            role: userData.role,
            password: userData.password,
            desaId: desa.id,
          },
        });
        console.log(`✅ Akun ${userData.role} berhasil dibuat: ${userData.email}`);
      }
    } catch (error) {
      console.error(`❌ Gagal memproses akun ${userData.email}:`, error.message);
    }
  }

  console.log("✅ Proses pembuatan akun selesai!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
