import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type ModuleRecordRow = {
  id: string;
  modulePath: string;
  moduleName: string;
  title: string;
  category: string | null;
  description: string | null;
  valueText: string | null;
  status: string;
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
};

async function ensureModuleRecordTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS \`ModuleRecord\` (
      \`id\` varchar(191) NOT NULL,
      \`modulePath\` varchar(191) NOT NULL,
      \`moduleName\` varchar(191) NOT NULL,
      \`title\` varchar(191) NOT NULL,
      \`category\` varchar(191) NULL,
      \`description\` text NULL,
      \`valueText\` varchar(191) NULL,
      \`status\` varchar(64) NOT NULL DEFAULT 'Baru',
      \`createdBy\` varchar(191) NULL,
      \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      \`updatedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
      PRIMARY KEY (\`id\`),
      INDEX \`ModuleRecord_modulePath_createdAt_idx\` (\`modulePath\`, \`createdAt\`)
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);
}

function cleanText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim().slice(0, 1000);
}

function makeId() {
  return `modrec_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL?.replace(/^"|"$/g, "").trim());
}

function databaseUnavailableResponse(error?: unknown) {
  const message = error instanceof Error ? error.message : "Database belum dikonfigurasi";
  return NextResponse.json(
    {
      records: [],
      error: "Database belum siap. Pastikan DATABASE_URL terisi dan database MySQL berjalan.",
      detail: message,
    },
    { status: 503 }
  );
}

export async function GET(req: NextRequest) {
  const modulePath = req.nextUrl.searchParams.get("path") || "";
  if (!modulePath.startsWith("/")) {
    return NextResponse.json({ error: "Path modul tidak valid" }, { status: 400 });
  }

  if (!isDatabaseConfigured()) return databaseUnavailableResponse();

  try {
    await ensureModuleRecordTable();

    const records = await prisma.$queryRaw<ModuleRecordRow[]>`
      SELECT id, modulePath, moduleName, title, category, description, valueText, status, createdBy, createdAt, updatedAt
      FROM ModuleRecord
      WHERE modulePath = ${modulePath}
      ORDER BY createdAt DESC
      LIMIT 50
    `;

    return NextResponse.json({ records });
  } catch (error) {
    return databaseUnavailableResponse(error);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = makeId();
  const modulePath = cleanText(body.modulePath).slice(0, 191);
  const moduleName = cleanText(body.moduleName, "Modul").slice(0, 191);
  const title = cleanText(body.title).slice(0, 191);
  const category = cleanText(body.category).slice(0, 191) || null;
  const description = cleanText(body.description);
  const valueText = cleanText(body.valueText).slice(0, 191) || null;
  const status = cleanText(body.status, "Baru").slice(0, 64);
  const createdBy = cleanText(body.createdBy || "user").slice(0, 191);

  if (!modulePath.startsWith("/") || title.length < 3) {
    return NextResponse.json({ error: "Path modul dan judul wajib diisi" }, { status: 400 });
  }

  if (!isDatabaseConfigured()) return databaseUnavailableResponse();

  try {
    await ensureModuleRecordTable();

    await prisma.$executeRaw`
      INSERT INTO ModuleRecord (id, modulePath, moduleName, title, category, description, valueText, status, createdBy, createdAt, updatedAt)
      VALUES (${id}, ${modulePath}, ${moduleName}, ${title}, ${category}, ${description}, ${valueText}, ${status}, ${createdBy}, NOW(), NOW())
    `;

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    return databaseUnavailableResponse(error);
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const id = cleanText(body.id).slice(0, 191);
  const modulePath = cleanText(body.modulePath).slice(0, 191);
  const title = cleanText(body.title).slice(0, 191);
  const category = cleanText(body.category).slice(0, 191) || null;
  const description = cleanText(body.description);
  const valueText = cleanText(body.valueText).slice(0, 191) || null;
  const status = cleanText(body.status, "Diproses").slice(0, 64);

  if (!id || !modulePath.startsWith("/") || title.length < 3) {
    return NextResponse.json({ error: "Data update tidak valid" }, { status: 400 });
  }

  if (!isDatabaseConfigured()) return databaseUnavailableResponse();

  try {
    await ensureModuleRecordTable();

    await prisma.$executeRaw`
      UPDATE ModuleRecord
      SET title = ${title},
          category = ${category},
          description = ${description},
          valueText = ${valueText},
          status = ${status}
      WHERE id = ${id} AND modulePath = ${modulePath}
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    return databaseUnavailableResponse(error);
  }
}

export async function DELETE(req: NextRequest) {
  const id = cleanText(req.nextUrl.searchParams.get("id")).slice(0, 191);
  const modulePath = cleanText(req.nextUrl.searchParams.get("path")).slice(0, 191);

  if (!id || !modulePath.startsWith("/")) {
    return NextResponse.json({ error: "Data hapus tidak valid" }, { status: 400 });
  }

  if (!isDatabaseConfigured()) return databaseUnavailableResponse();

  try {
    await ensureModuleRecordTable();

    await prisma.$executeRaw`
      DELETE FROM ModuleRecord
      WHERE id = ${id} AND modulePath = ${modulePath}
    `;

    return NextResponse.json({ ok: true });
  } catch (error) {
    return databaseUnavailableResponse(error);
  }
}
