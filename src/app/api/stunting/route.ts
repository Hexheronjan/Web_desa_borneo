import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const stunting = await prisma.stunting.findMany({
      include: {
        warga: true,
      },
      orderBy: { tanggal: "desc" },
    });
    return NextResponse.json({ success: true, data: stunting });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const record = await prisma.stunting.create({
      data: {
        wargaId: body.wargaId,
        tanggal: new Date(body.tanggal || new Date()),
        bb: body.bb,
        tb: body.tb,
        umurBulan: body.umurBulan,
        zScore: body.zScore,
        kategori: body.kategori || "Normal",
        rekomendasi: body.rekomendasi,
      }
    });
    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const record = await prisma.stunting.update({
      where: { id },
      data: {
        wargaId: data.wargaId,
        tanggal: data.tanggal ? new Date(data.tanggal) : undefined,
        bb: data.bb,
        tb: data.tb,
        umurBulan: data.umurBulan,
        zScore: data.zScore,
        kategori: data.kategori,
        rekomendasi: data.rekomendasi,
      }
    });
    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }
    await prisma.stunting.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
