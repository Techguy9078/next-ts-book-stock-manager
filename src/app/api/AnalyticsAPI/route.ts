'use server';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  let { action, book, status } = req;

  try {
    const auditData = await prisma.auditLog.create({
      data: {
        action,
        status,
      },
      include: { book: book ? true : false },
    });

    return NextResponse.json(auditData);
  } catch (error) {
    console.error('Error saving audit item:', error);
    return NextResponse.json(
      { error: 'Failed Adding Audit Log...' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const auditLogResults = await prisma.auditLog.findMany({
      orderBy: { eventAt: 'asc' },
    });

    return NextResponse.json(auditLogResults);
  } catch (error: any) {
    console.error('Error fetching audit items:', error);
    return NextResponse.json(
      { error: 'Failed Finding Audit Items...' },
      { status: 500 },
    );
  }
}
