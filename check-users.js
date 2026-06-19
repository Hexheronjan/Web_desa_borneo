const { PrismaClient } = require("./src/generated/client");

const prisma = new PrismaClient();

async function checkUsers() {
  console.log("Mengecek pengguna yang sudah ada di database...\n");

  try {
    const rows = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true
      },
      orderBy: [
        { role: 'asc' },
        { name: 'asc' }
      ]
    });

    console.log('='.repeat(80));
    console.log('DAFTAR PENGGUNA YANG SUDAH ADA DI DATABASE');
    console.log('='.repeat(80));

    if (rows.length === 0) {
      console.log('\n❌ TIDAK ADA PENGGUNA yang ditemukan di database!\n');
    } else {
      console.log(`\n✅ Ditemukan ${rows.length} pengguna:\n`);
      
      const roleGroups = {};
      rows.forEach(user => {
        if (!roleGroups[user.role]) {
          roleGroups[user.role] = [];
        }
        roleGroups[user.role].push(user);
      });

      Object.keys(roleGroups).forEach(role => {
        console.log(`\n📌 Role: ${role.toUpperCase()}`);
        console.log('-'.repeat(80));
        roleGroups[role].forEach(user => {
          console.log(`   • Nama: ${user.name}`);
          console.log(`     Email: ${user.email}`);
          console.log(`     Username: ${user.username}`);
          console.log(`     ID: ${user.id}`);
          console.log();
        });
      });
    }

    console.log('='.repeat(80));
    console.log('STATUS ROLE (SUDAH ADA/BELUM):');
    console.log('='.repeat(80));

    const allRoles = [
      'admin_super',
      'operator_sid', 
      'pemerintah_desa',
      'bpd',
      'lembaga_adat',
      'guru_fasilitator',
      'nakes_posyandu',
      'warga',
      'dinas_pmd',
      'peneliti'
    ];

    const existingRoles = rows.map(u => u.role);

    allRoles.forEach(role => {
      const exists = existingRoles.includes(role);
      const status = exists ? '✅ SUDAH ADA' : '❌ BELUM ADA';
      const usersForRole = rows.filter(u => u.role === role);
      
      console.log(`${status} - ${role.padEnd(20)} ${exists ? `(${usersForRole.length} user)` : ''}`);
    });

    console.log('='.repeat(80));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();