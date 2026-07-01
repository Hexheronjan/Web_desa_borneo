import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const artefaks = await prisma.evaluasiArtefak.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(artefaks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch artefaks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const artefak = await prisma.evaluasiArtefak.create({
      data: {
        namaArtefak: body.namaArtefak,
        jenis: body.jenis,
        nilaiEvaluasi: body.nilaiEvaluasi,
        kategori: body.kategori,
        tanggalEvaluasi: new Date(body.tanggalEvaluasi)
      }
    });
    return NextResponse.json(artefak);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create artefak' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const artefak = await prisma.evaluasiArtefak.update({
      where: { id },
      data: { ...data, tanggalEvaluasi: data.tanggalEvaluasi ? new Date(data.tanggalEvaluasi) : undefined }
    });
    return NextResponse.json(artefak);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update artefak' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.evaluasiArtefak.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete artefak' }, { status: 500 });
  }
}
