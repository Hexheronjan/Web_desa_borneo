import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const posyandu = await prisma.posyandu.findMany({
      orderBy: { tanggal: "desc" },
    });
    return NextResponse.json({ success: true, data: posyandu });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Find desa record
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan. Silakan hubungi admin." }, { status: 400 });
    }
    
    const record = await prisma.posyandu.create({
      data: {
        desaId: desa.id,
        tanggal: new Date(body.tanggal),
        lokasi: body.lokasi,
        jumlahBalita: body.jumlahBalita || 0,
        jumlahImunisasi: body.jumlahImunisasi || 0,
        catatan: body.catatan,
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
    
    // Find desa record
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan. Silakan hubungi admin." }, { status: 400 });
    }
    
    const record = await prisma.posyandu.update({
      where: { id },
      data: {
        desaId: desa.id,
        tanggal: new Date(data.tanggal),
        lokasi: data.lokasi,
        jumlahBalita: data.jumlahBalita || 0,
        jumlahImunisasi: data.jumlahImunisasi || 0,
        catatan: data.catatan,
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
    await prisma.posyandu.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
