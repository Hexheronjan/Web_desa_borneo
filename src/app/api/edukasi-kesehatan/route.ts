import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const edukasi = await prisma.edukasiKesehatan.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(edukasi);
  } catch (error) {
    console.error('Error fetching education materials:', error);
    return NextResponse.json({ error: 'Failed to fetch education materials' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const edukasi = await prisma.edukasiKesehatan.create({
      data: body
    });
    return NextResponse.json(edukasi, { status: 201 });
  } catch (error) {
    console.error('Error creating education material:', error);
    return NextResponse.json({ error: 'Failed to create education material' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const edukasi = await prisma.edukasiKesehatan.update({
      where: { id },
      data
    });
    return NextResponse.json(edukasi);
  } catch (error) {
    console.error('Error updating education material:', error);
    return NextResponse.json({ error: 'Failed to update education material' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await prisma.edukasiKesehatan.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Education material deleted successfully' });
  } catch (error) {
    console.error('Error deleting education material:', error);
    return NextResponse.json({ error: 'Failed to delete education material' }, { status: 500 });
  }
}
