import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const notifikasis = await prisma.pengaturanNotifikasi.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(notifikasis);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const notifikasi = await prisma.pengaturanNotifikasi.create({
      data: {
        judul: body.judul,
        isi: body.isi,
        target: body.target,
        tanggalKirim: new Date(body.tanggalKirim),
        status: body.status || 'Terkirim'
      }
    });
    return NextResponse.json(notifikasi);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create notification' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.pengaturanNotifikasi.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500 });
  }
}
