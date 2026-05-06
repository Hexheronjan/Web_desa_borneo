const { PrismaClient } = require("../src/generated/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai pendaftaran semua role...");

  const desa = await prisma.desa.findFirst();
  if (!desa) {
    console.error("Desa tidak ditemukan. Jalankan seed warga dulu.");
    return;
  }

  const roles = [
    { name: "Super Admin", email: "admin@borneo.id", role: "admin_super" },
    { name: "Pemerintah Desa", email: "pemdes@borneo.id", role: "pemerintah_desa" },
    { name: "Lembaga Adat", email: "adat@borneo.id", role: "lembaga_adat" },
    { name: "Nakes Posyandu", email: "nakes@borneo.id", role: "nakes_posyandu" },
    { name: "Guru Fasilitator", email: "guru@borneo.id", role: "guru_fasilitator" },
    { name: "Warga Borneo", email: "warga@borneo.id", role: "warga" },
  ];

  for (const r of roles) {
    await prisma.user.upsert({
      where: { email: r.email },
      update: {
        password: "password123",
        role: r.role,
      },
      create: {
        email: r.email,
        name: r.name,
        password: "password123",
        role: r.role,
        desaId: desa.id,
      },
    });
    console.log(`✅ Akun ${r.role} (${r.email}) berhasil disiapkan.`);
  }

  console.log("\nSemua role sudah siap dites!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
