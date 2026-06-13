const { PrismaClient } = require("../src/generated/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Checking DB connection...");
  try {
    const userCount = await prisma.user.count();
    console.log(`Successfully connected! Total users in DB: ${userCount}`);
    if (userCount > 0) {
      const users = await prisma.user.findMany({ take: 5, select: { email: true, role: true } });
      console.log("Sample users:", users);
    }
  } catch (error) {
    console.error("DB connection failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
