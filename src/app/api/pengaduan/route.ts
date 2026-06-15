import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const MODULE_PATH = "/warga/pengaduan";

function cleanText(value: unknown, fallback = "") {
  return String(value ?? fallback).trim().slice(0, 1000);
}

function makeId() {
  return `pengaduan_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function toJsonSafe<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) => (typeof value === "bigint" ? Number(value) : value))
  );
}

export async function GET() {
  try {
    const pengaduan = await prisma.moduleRecord.findMany({
      where: { modulePath: MODULE_PATH },
      orderBy: { createdAt: "desc" },
      take: 50,
      select: {
        id: true,
        title: true,
        category: true,
        description: true,
        status: true,
        createdBy: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, data: toJsonSafe(pengaduan) });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const title = cleanText(body.title).slice(0, 191);
    const category = cleanText(body.category).slice(0, 191);
    const description = cleanText(body.description);
    const status = cleanText(body.status, "Diterima").slice(0, 64);
    const createdBy = cleanText(body.createdBy, "Warga").slice(0, 191);

    if (title.length < 3 || description.length < 5) {
      return NextResponse.json(
        { success: false, error: "Judul dan deskripsi pengaduan wajib diisi" },
        { status: 400 }
      );
    }

    const id = makeId();

    await prisma.moduleRecord.create({
      data: {
        id,
        modulePath: MODULE_PATH,
        moduleName: "Pengaduan Warga",
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
      return NextResponse.json({ success: false, error: "ID pengaduan diperlukan" }, { status: 400 });
    }

    const existing = await prisma.moduleRecord.findFirst({
      where: { id, modulePath: MODULE_PATH },
      select: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: "Pengaduan tidak ditemukan" }, { status: 404 });
    }

    await prisma.moduleRecord.update({
      where: { id },
      data: {
        title: cleanText(body.title).slice(0, 191),
        category: cleanText(body.category).slice(0, 191),
        description: cleanText(body.description),
        status: cleanText(body.status).slice(0, 64),
      },
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
