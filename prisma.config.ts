// This file was causing build errors because 'prisma/config' was not found.
// Prisma CLI uses prisma/schema.prisma by default, so this file may not be necessary.
/*
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
  engineType: "library"
});
*/
