import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const informasi = await prisma.informasiAdat.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(informasi);
  } catch (error) {
    console.error('Error fetching adat info:', error);
    return NextResponse.json({ error: 'Failed to fetch adat info' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const informasi = await prisma.informasiAdat.create({
      data: body
    });
    return NextResponse.json(informasi, { status: 201 });
  } catch (error) {
    console.error('Error creating adat info:', error);
    return NextResponse.json({ error: 'Failed to create adat info' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const informasi = await prisma.informasiAdat.update({
      where: { id },
      data
    });
    return NextResponse.json(informasi);
  } catch (error) {
    console.error('Error updating adat info:', error);
    return NextResponse.json({ error: 'Failed to update adat info' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await prisma.informasiAdat.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Adat info deleted successfully' });
  } catch (error) {
    console.error('Error deleting adat info:', error);
    return NextResponse.json({ error: 'Failed to delete adat info' }, { status: 500 });
  }
}
