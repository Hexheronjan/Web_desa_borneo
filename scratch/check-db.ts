import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const desaCount = await prisma.desa.count()
  console.log("Desa count:", desaCount)
  if (desaCount > 0) {
    const desas = await prisma.desa.findMany()
    console.log("Desas:", JSON.stringify(desas, null, 2))
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
