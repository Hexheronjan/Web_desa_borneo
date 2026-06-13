import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const monitoring = await prisma.monitoringKesehatan.findMany({
      include: {
        warga: true,
      },
      orderBy: { tanggal: "desc" },
    });
    return NextResponse.json({ success: true, data: monitoring });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Find warga by NIK
    const warga = await prisma.warga.findUnique({
      where: { nik: body.wargaId }
    });
    
    if (!warga) {
      return NextResponse.json({ success: false, error: "NIK tidak ditemukan di database" }, { status: 400 });
    }
    
    const record = await prisma.monitoringKesehatan.create({
      data: {
        wargaId: warga.id,
        tanggal: new Date(body.tanggal || new Date()),
        beratBadan: body.beratBadan,
        tinggiBadan: body.tinggiBadan,
        tensiSistolik: body.tensiSistolik,
        tensiDiastolik: body.tensiDiastolik,
        suhu: body.suhu,
        alert: !!((body.tensiSistolik && body.tensiSistolik > 140) || (body.beratBadan && body.beratBadan < 40)),
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
    
    // Find warga by NIK if wargaId is provided
    let wargaId = data.wargaId;
    if (data.wargaId) {
      const warga = await prisma.warga.findUnique({
        where: { nik: data.wargaId }
      });
      if (!warga) {
        return NextResponse.json({ success: false, error: "NIK tidak ditemukan di database" }, { status: 400 });
      }
      wargaId = warga.id;
    }
    
    const record = await prisma.monitoringKesehatan.update({
      where: { id },
      data: {
        wargaId: wargaId,
        tanggal: data.tanggal ? new Date(data.tanggal) : undefined,
        beratBadan: data.beratBadan,
        tinggiBadan: data.tinggiBadan,
        tensiSistolik: data.tensiSistolik,
        tensiDiastolik: data.tensiDiastolik,
        suhu: data.suhu,
        alert: !!((data.tensiSistolik && data.tensiSistolik > 140) || (data.beratBadan && data.beratBadan < 40)),
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
    await prisma.monitoringKesehatan.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
