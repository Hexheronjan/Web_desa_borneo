const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai pendaftaran akun Admin...");

  const desa = await prisma.desa.findFirst();
  if (!desa) {
    console.error("Desa tidak ditemukan. Pastikan seed warga sudah dijalankan.");
    return;
  }

  await prisma.user.upsert({
    where: { email: "admin@borneo.id" },
    update: {
      password: "password123",
      role: "admin_super"
    },
    create: {
      email: "admin@borneo.id",
      name: "Admin Pemerintah Desa",
      password: "password123", 
      role: "admin_super",
      desaId: desa.id,
    },
  });

  console.log("Akun Admin berhasil didaftarkan ke MySQL!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
