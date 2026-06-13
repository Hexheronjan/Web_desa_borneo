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
    let warga = await prisma.warga.findUnique({
      where: { nik: body.wargaId }
    });
    
    // If warga doesn't exist, create it
    if (!warga) {
      // Get desa and rwRt
      const desa = await prisma.desa.findFirst();
      if (!desa) {
        return NextResponse.json({ success: false, error: "Data desa tidak ditemukan. Silakan hubungi admin." }, { status: 400 });
      }
      
      let rwRt = await prisma.rwRt.findFirst({ where: { desaId: desa.id } });
      if (!rwRt) {
        rwRt = await prisma.rwRt.create({
          data: {
            desaId: desa.id,
            rw: '01',
            rt: '01',
            jumlahWarga: 0,
          }
        });
      }
      
      // Create new warga with provided details or defaults
      warga = await prisma.warga.create({
        data: {
          desaId: desa.id,
          rwRtId: rwRt.id,
          nik: body.wargaId,
          nama: body.nama || 'Warga Baru',
          tempatLahir: body.tempatLahir || '-',
          tanggalLahir: body.tanggalLahir ? new Date(body.tanggalLahir) : new Date(),
          jenisKelamin: body.jenisKelamin || 'P',
          alamat: body.alamat || '-',
          noHp: body.noHp || null,
          status: 'Aktif',
        }
      });
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
