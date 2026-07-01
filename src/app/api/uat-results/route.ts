import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const results = await prisma.uATResult.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch UAT results' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await prisma.uATResult.create({
      data: {
        namaUser: body.namaUser,
        role: body.role,
        susScore: body.susScore,
        kategori: body.kategori,
        feedback: body.feedback,
        tanggal: new Date(body.tanggal)
      }
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create UAT result' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const result = await prisma.uATResult.update({
      where: { id },
      data: { ...data, tanggal: data.tanggal ? new Date(data.tanggal) : undefined }
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update UAT result' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.uATResult.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete UAT result' }, { status: 500 });
  }
}
