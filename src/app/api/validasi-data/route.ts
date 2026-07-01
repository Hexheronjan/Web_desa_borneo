import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const datasets = await prisma.validasiData.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(datasets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch datasets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dataset = await prisma.validasiData.create({
      data: {
        namaDataset: body.namaDataset,
        jumlahData: body.jumlahData,
        statusValidasi: body.statusValidasi || 'Pending',
        tanggalUpload: new Date(body.tanggalUpload)
      }
    });
    return NextResponse.json(dataset);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create dataset' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const dataset = await prisma.validasiData.update({
      where: { id },
      data: { ...data, tanggalUpload: data.tanggalUpload ? new Date(data.tanggalUpload) : undefined }
    });
    return NextResponse.json(dataset);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update dataset' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.validasiData.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete dataset' }, { status: 500 });
  }
}
