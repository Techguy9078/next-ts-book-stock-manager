'use server';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const bookCount = await prisma.scannedBook.count();

    return NextResponse.json(bookCount);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed Getting Book Count...' },
      { status: 500 },
    );
  }
}
