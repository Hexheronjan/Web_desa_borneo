import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const MODULE_PATH = "/warga/surat-online";

function cleanText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim().slice(0, 1000);
}

function makeId() {
  return `surat_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function toJsonSafe<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) => (typeof value === "bigint" ? Number(value) : value))
  );
}

export async function GET() {
  try {
    const surat = await prisma.$queryRaw<any[]>`
      SELECT id, title, category, description, valueText, status, createdBy, createdAt, updatedAt,
        (CHAR_LENGTH(COALESCE(valueBlob, '')) > 0) as hasPdf
      FROM ModuleRecord
      WHERE modulePath = ${MODULE_PATH}
      ORDER BY createdAt DESC
      LIMIT 50
    `;

    return NextResponse.json({ success: true, data: toJsonSafe(surat) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = cleanText(body.title).slice(0, 191);
    const category = cleanText(body.category, "Pengajuan Surat").slice(0, 191);
    const description = cleanText(body.description);
    const status = cleanText(body.status, "Proses Validasi").slice(0, 64);
    const createdBy = cleanText(body.createdBy, "Warga").slice(0, 191);

    if (title.length < 3) {
      return NextResponse.json({ success: false, error: "Jenis surat wajib diisi" }, { status: 400 });
    }

    const id = makeId();

    await prisma.moduleRecord.create({
      data: {
        id,
        modulePath: MODULE_PATH,
        moduleName: "Surat Online",
        title,
        category,
        description,
        status,
        createdBy,
      },
    });

    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const id = cleanText(body.id).slice(0, 191);

    if (!id) {
      return NextResponse.json({ success: false, error: "ID surat diperlukan" }, { status: 400 });
    }

    const existing = await prisma.moduleRecord.findFirst({
      where: { id, modulePath: MODULE_PATH },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Surat tidak ditemukan" }, { status: 404 });
    }

    const data: Record<string, string> = {};
    if (body.title) data.title = cleanText(body.title).slice(0, 191);
    if (body.category) data.category = cleanText(body.category).slice(0, 191);
    if (body.description) data.description = cleanText(body.description);
    if (body.status) data.status = cleanText(body.status).slice(0, 64);
    if (body.valueText) data.valueText = cleanText(body.valueText);

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ success: false, error: "Tidak ada data untuk diupdate" }, { status: 400 });
    }

    await prisma.moduleRecord.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await prisma.moduleRecord.deleteMany({
      where: { id, modulePath: MODULE_PATH },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
