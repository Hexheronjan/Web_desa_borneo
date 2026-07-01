import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const desaId = searchParams.get('desaId');
    
    const where = desaId ? { desaId } : {};
    const sdgs = await prisma.sDGsDashboard.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(sdgs);
  } catch (error) {
    console.error('Error fetching SDGs dashboard:', error);
    return NextResponse.json({ error: 'Failed to fetch SDGs dashboard' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sdgs = await prisma.sDGsDashboard.create({
      data: body
    });
    return NextResponse.json(sdgs, { status: 201 });
  } catch (error) {
    console.error('Error creating SDGs dashboard:', error);
    return NextResponse.json({ error: 'Failed to create SDGs dashboard' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const sdgs = await prisma.sDGsDashboard.update({
      where: { id },
      data
    });
    return NextResponse.json(sdgs);
  } catch (error) {
    console.error('Error updating SDGs dashboard:', error);
    return NextResponse.json({ error: 'Failed to update SDGs dashboard' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await prisma.sDGsDashboard.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'SDGs dashboard deleted successfully' });
  } catch (error) {
    console.error('Error deleting SDGs dashboard:', error);
    return NextResponse.json({ error: 'Failed to delete SDGs dashboard' }, { status: 500 });
  }
}
