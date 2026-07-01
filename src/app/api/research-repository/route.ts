import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const documents = await prisma.researchRepository.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(documents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const document = await prisma.researchRepository.create({
      data: {
        judul: body.judul,
        jenis: body.jenis,
        penulis: body.penulis,
        tahun: body.tahun,
        ukuran: body.ukuran,
        tanggalUpload: new Date(body.tanggalUpload)
      }
    });
    return NextResponse.json(document);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const document = await prisma.researchRepository.update({
      where: { id },
      data: { ...data, tanggalUpload: data.tanggalUpload ? new Date(data.tanggalUpload) : undefined }
    });
    return NextResponse.json(document);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.researchRepository.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }
}
