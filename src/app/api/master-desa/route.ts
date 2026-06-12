import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

type DesaRecord = {
  id: string;
  kodeDesa: string;
  nama: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

const seedDesa = [
  ["DESA001", "Desa Borneo Adat", "Kec. Kahayan Tengah", "Kab. Pulang Pisau", "Kalimantan Tengah", "Mandiri"],
  ["DESA002", "Desa Betang Jaya", "Kec. Tewah", "Kab. Gunung Mas", "Kalimantan Tengah", "Maju"],
  ["DESA003", "Desa Rungan Sari", "Kec. Rungan", "Kab. Gunung Mas", "Kalimantan Tengah", "Maju"],
  ["DESA004", "Desa Mentaya Hulu", "Kec. Mentaya Hulu", "Kab. Kotawaringin Timur", "Kalimantan Tengah", "Berkembang"],
  ["DESA005", "Desa Loksado Adat", "Kec. Loksado", "Kab. Hulu Sungai Selatan", "Kalimantan Selatan", "Mandiri"],
];

async function ensureTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS \`MasterDesaRecord\` (
      \`id\` varchar(191) NOT NULL,
      \`kodeDesa\` varchar(32) NOT NULL,
      \`nama\` varchar(191) NOT NULL,
      \`kecamatan\` varchar(191) NOT NULL,
      \`kabupaten\` varchar(191) NOT NULL,
      \`provinsi\` varchar(191) NOT NULL,
      \`status\` varchar(64) NOT NULL DEFAULT 'Berkembang',
      \`createdAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
      \`updatedAt\` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`MasterDesaRecord_kodeDesa_key\` (\`kodeDesa\`)
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);
}

async function seedIfEmpty() {
  const rows = await prisma.$queryRaw<{ total: bigint }[]>`SELECT COUNT(*) AS total FROM MasterDesaRecord`;
  if (Number(rows[0]?.total || 0) > 0) return;

  for (const [kodeDesa, nama, kecamatan, kabupaten, provinsi, status] of seedDesa) {
    await prisma.$executeRaw`
      INSERT INTO MasterDesaRecord (id, kodeDesa, nama, kecamatan, kabupaten, provinsi, status)
      VALUES (${makeId()}, ${kodeDesa}, ${nama}, ${kecamatan}, ${kabupaten}, ${provinsi}, ${status})
    `;
  }
}

function makeId() {
  return `desa_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function clean(value: unknown, limit = 191) {
  return String(value ?? "").trim().slice(0, limit);
}

function normalizeKode(value: unknown) {
  return clean(value, 32).toUpperCase().replace(/\s+/g, "");
}

async function guard() {
  const session = await auth();
  if (!session?.user) return false;
  return true;
}

export async function GET() {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await ensureTable();
  await seedIfEmpty();

  const desa = await prisma.$queryRaw<DesaRecord[]>`
    SELECT id, kodeDesa, nama, kecamatan, kabupaten, provinsi, status, createdAt, updatedAt
    FROM MasterDesaRecord
    ORDER BY kodeDesa ASC
  `;

  return NextResponse.json({ desa });
}

export async function POST(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const kodeDesa = normalizeKode(body.kodeDesa);
  const nama = clean(body.nama);
  const kecamatan = clean(body.kecamatan);
  const kabupaten = clean(body.kabupaten);
  const provinsi = clean(body.provinsi);
  const status = clean(body.status, 64) || "Berkembang";

  if (!kodeDesa || !nama || !kecamatan || !kabupaten || !provinsi) {
    return NextResponse.json({ error: "Semua field desa wajib diisi" }, { status: 400 });
  }

  await ensureTable();

  try {
    await prisma.$executeRaw`
      INSERT INTO MasterDesaRecord (id, kodeDesa, nama, kecamatan, kabupaten, provinsi, status)
      VALUES (${makeId()}, ${kodeDesa}, ${nama}, ${kecamatan}, ${kabupaten}, ${provinsi}, ${status})
    `;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "ID desa sudah terdaftar" }, { status: 409 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const id = clean(body.id);
  const kodeDesa = normalizeKode(body.kodeDesa);
  const nama = clean(body.nama);
  const kecamatan = clean(body.kecamatan);
  const kabupaten = clean(body.kabupaten);
  const provinsi = clean(body.provinsi);
  const status = clean(body.status, 64) || "Berkembang";

  if (!id || !kodeDesa || !nama || !kecamatan || !kabupaten || !provinsi) {
    return NextResponse.json({ error: "Data edit desa tidak lengkap" }, { status: 400 });
  }

  await ensureTable();

  try {
    await prisma.$executeRaw`
      UPDATE MasterDesaRecord
      SET kodeDesa = ${kodeDesa},
          nama = ${nama},
          kecamatan = ${kecamatan},
          kabupaten = ${kabupaten},
          provinsi = ${provinsi},
          status = ${status}
      WHERE id = ${id}
    `;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "ID desa sudah dipakai data lain" }, { status: 409 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await guard())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = clean(req.nextUrl.searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID data wajib dikirim" }, { status: 400 });

  await ensureTable();

  await prisma.$executeRaw`DELETE FROM MasterDesaRecord WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
