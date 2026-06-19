import { PrismaClient } from '../src/generated/client'

const prisma = new PrismaClient()

async function main() {
  // Create default desa
  let desa = await prisma.desa.findFirst()
  if (!desa) {
    desa = await prisma.desa.create({
      data: {
        nama: 'Desa Adat Borneo',
        kecamatan: 'Kecamatan Default',
        kabupaten: 'Kabupaten Default',
        provinsi: 'Kalimantan Tengah',
      }
    })
    console.log('Created default desa:', desa.nama)
  }

  // Create test users
  const users = [
    { id: 'user-warga', name: 'Budi Warga', email: 'warga@borneo.id', password: 'password123', role: 'warga' as const },
    { id: 'user-admin', name: 'Admin Utama', email: 'admin@borneo.id', password: 'password123', role: 'admin_super' as const },
    { id: 'user-nakes', name: 'Bidan Siti', email: 'nakes@borneo.id', password: 'password123', role: 'nakes_posyandu' as const },
    { id: 'user-guru', name: 'Pak Guru Budi', email: 'guru@borneo.id', password: 'password123', role: 'guru_fasilitator' as const },
    { id: 'user-pemdes', name: 'Perangkat Desa', email: 'pemdes@borneo.id', password: 'password123', role: 'pemerintah_desa' as const },
    { id: 'user-adat', name: 'Ketua Adat', email: 'adat@borneo.id', password: 'password123', role: 'lembaga_adat' as const },
    { id: 'user-bpd', name: 'Ketua BPD', email: 'bpd@borneo.id', password: 'password123', role: 'bpd' as const },
    { id: 'user-operator', name: 'Operator SID', email: 'operator@borneo.id', password: 'password123', role: 'operator_sid' as const },
    { id: 'user-dinas', name: 'Dinas PMD', email: 'dinas@borneo.id', password: 'password123', role: 'dinas_pmd' as const },
    { id: 'user-peneliti', name: 'Peneliti', email: 'peneliti@borneo.id', password: 'password123', role: 'peneliti' as const },
    { id: 'user-layanan', name: 'Andi Saputra', email: 'layanan@borneo.id', password: 'password123', role: 'pengguna_layanan' as const },
  ]

  for (const userData of users) {
    const existing = await prisma.user.findFirst({ where: { email: userData.email } })
    if (!existing) {
      await prisma.user.create({
        data: {
          id: userData.id,
          desaId: desa.id,
          name: userData.name,
          email: userData.email,
          username: userData.email.split('@')[0],
          password: userData.password,
          role: userData.role,
          status: 'Aktif',
        }
      })
      console.log('Created user:', userData.email)
    } else {
      console.log('User already exists:', userData.email)
    }
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
