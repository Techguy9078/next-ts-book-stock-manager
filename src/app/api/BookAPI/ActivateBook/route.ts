import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  const { barcode } = req;

  if (!barcode) {
    return NextResponse.json(
      { error: 'No barcode was found!' },
      { status: 400 },
    );
  }

  try {
    // Find the oldest record by barcode, parked and date
    const record = await prisma.scannedBook.findFirst({
      where: { barcode, park: true },
      orderBy: { createdAt: 'asc' },
    });

    if (!record) {
      return NextResponse.json(
        { error: 'Not found, was it parked first?' },
        { status: 404 },
      );
    }

    // Update the record to un park the book
    const updatedRecord = await prisma.scannedBook.update({
      where: { id: record.id },
      data: { park: false },
    });

    return NextResponse.json(updatedRecord);
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal server error, ${error.message}` },
      { status: 500 },
    );
  }
}
