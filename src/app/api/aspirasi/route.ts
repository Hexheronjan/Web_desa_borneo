import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const aspirasi = await prisma.aspirasi.findMany({
      include: {
        warga: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: aspirasi });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Get desa record
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan. Silakan hubungi admin." }, { status: 400 });
    }
    
    const record = await prisma.aspirasi.create({
      data: {
        desaId: desa.id,
        wargaId: body.wargaId || null,
        kategori: body.kategori,
        judul: body.judul,
        isi: body.isi,
        status: body.status || "Diterima",
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
    
    const record = await prisma.aspirasi.update({
      where: { id },
      data: {
        kategori: data.kategori,
        judul: data.judul,
        isi: data.isi,
        status: data.status,
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
    await prisma.aspirasi.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
