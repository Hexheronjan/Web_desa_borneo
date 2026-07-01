import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const datasets = await prisma.datasetAssessment.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(datasets);
  } catch (error) {
    console.error('Error fetching datasets:', error);
    return NextResponse.json({ error: 'Failed to fetch datasets' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dataset = await prisma.datasetAssessment.create({
      data: body
    });
    return NextResponse.json(dataset, { status: 201 });
  } catch (error) {
    console.error('Error creating dataset:', error);
    return NextResponse.json({ error: 'Failed to create dataset' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const dataset = await prisma.datasetAssessment.update({
      where: { id },
      data
    });
    return NextResponse.json(dataset);
  } catch (error) {
    console.error('Error updating dataset:', error);
    return NextResponse.json({ error: 'Failed to update dataset' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await prisma.datasetAssessment.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Dataset deleted successfully' });
  } catch (error) {
    console.error('Error deleting dataset:', error);
    return NextResponse.json({ error: 'Failed to delete dataset' }, { status: 500 });
  }
}
