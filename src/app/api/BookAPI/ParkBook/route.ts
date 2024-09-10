import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const req = await request.json();
  let {
    book: { id },
    updateData,
  } = req;

  if (!id) {
    return NextResponse.json(
      { error: 'Unfortunately no book was provided...' },
      { status: 400 },
    );
  }

  try {
    const bookResults = await prisma.scannedBook.update({
      where: {
        id: id,
      },
      data: {
        park: updateData,
      },
    });
    return NextResponse.json(bookResults);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed Finding Local Book...' },
      { status: 500 },
    );
  }
}
