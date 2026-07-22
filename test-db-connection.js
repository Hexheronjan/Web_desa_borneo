const { PrismaClient } = require("./src/generated/client");

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log("Testing database connection...");
    console.log("DATABASE_URL:", process.env.DATABASE_URL ? "SET" : "NOT SET");
    
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("✅ Database connection successful:", result);
    
    const userCount = await prisma.user.count();
    console.log(`✅ Found ${userCount} users in database`);
    
    const users = await prisma.user.findMany({ take: 3 });
    console.log("✅ Sample users:", users.map(u => ({ email: u.email, role: u.role, status: u.status })));
    
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    console.error("Error details:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 
