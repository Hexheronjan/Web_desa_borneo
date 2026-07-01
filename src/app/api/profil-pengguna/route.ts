import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (userId) {
      const profil = await prisma.profilPengguna.findUnique({
        where: { userId }
      });
      return NextResponse.json(profil);
    }
    
    const profiles = await prisma.profilPengguna.findMany();
    return NextResponse.json(profiles);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const profil = await prisma.profilPengguna.create({
      data: body
    });
    return NextResponse.json(profil, { status: 201 });
  } catch (error) {
    console.error('Error creating profile:', error);
    return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...data } = body;
    const profil = await prisma.profilPengguna.update({
      where: { userId },
      data
    });
    return NextResponse.json(profil);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
