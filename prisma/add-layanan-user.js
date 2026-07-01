const { PrismaClient } = require('../src/generated/client');

const prisma = new PrismaClient();

async function main() {
  const desa = await prisma.desa.findFirst();
  if (!desa) {
    console.log('❌ Desa tidak ditemukan. Jalankan seed terlebih dahulu.');
    return;
  }

  // Check if user already exists
  const existing = await prisma.user.findFirst({ where: { email: 'layanan@borneo.id' } });
  if (existing) {
    // Update role ke layanan_slv jika masih pakai role lama
    if (existing.role !== 'layanan_slv') {
      await prisma.user.update({ where: { id: existing.id }, data: { role: 'layanan_slv' } });
      console.log('✅ Role diupdate ke layanan_slv:', existing.email);
    } else {
      console.log('✅ User layanan@borneo.id sudah ada:', existing.name, '| Role:', existing.role);
    }
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: 'Andi Saputra',
      email: 'layanan@borneo.id',
      username: 'layanan_andi',
      password: 'password123',
      role: 'layanan_slv',
      status: 'Aktif',
      desaId: desa.id,
    },
  });

  console.log('✅ Berhasil membuat user Layanan SLV:');
  console.log('   Nama   :', user.name);
  console.log('   Email  :', user.email);
  console.log('   Role   :', user.role);
  console.log('   Status :', user.status);
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
