import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datasetId = searchParams.get('datasetId');
    
    const where = datasetId ? { datasetId } : {};
    const visualisasi = await prisma.visualisasiData.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(visualisasi);
  } catch (error) {
    console.error('Error fetching visualizations:', error);
    return NextResponse.json({ error: 'Failed to fetch visualizations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const visualisasi = await prisma.visualisasiData.create({
      data: body
    });
    return NextResponse.json(visualisasi, { status: 201 });
  } catch (error) {
    console.error('Error creating visualization:', error);
    return NextResponse.json({ error: 'Failed to create visualization' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await prisma.visualisasiData.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Visualization deleted successfully' });
  } catch (error) {
    console.error('Error deleting visualization:', error);
    return NextResponse.json({ error: 'Failed to delete visualization' }, { status: 500 });
  }
}
