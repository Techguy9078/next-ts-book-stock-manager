import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isbn = searchParams.get('isbn');
  const barcode = searchParams.get('barcode');
  const author = searchParams.get('author');
  const title = searchParams.get('title');

  try {
    const [
      resultsByIsbn,
      resultsByBarcode,
      resultsByAuthor,
      resultsByTitle,
      resultsByComments,
    ] = await Promise.all([
      prisma.customerBookRequest.findMany({
        where: { requestISBN: { contains: isbn || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestISBN: { contains: barcode || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestAuthor: { contains: author || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestTitle: { contains: title || '' } },
      }),
      // Search comments for all fields
      prisma.customerBookRequest.findMany({
        where: { requestComment: { contains: isbn || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestComment: { contains: author || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestComment: { contains: title || '' } },
      }),
    ]);

    // Combine all results into one array
    const allResults = [
      ...resultsByIsbn.map((result) => ({ ...result, matchedOn: 'ISBN' })),
      ...resultsByBarcode.map((result) => ({
        ...result,
        matchedOn: 'Barcode',
      })),
      ...resultsByAuthor.map((result) => ({ ...result, matchedOn: 'Author' })),
      ...resultsByTitle.map((result) => ({ ...result, matchedOn: 'Title' })),
      ...resultsByComments.map((result) => ({
        ...result,
        matchedOn: 'Comments',
      })),
    ];

    // Sort by oldest first
    const sortedResults = Object.values(allResults).sort(
      // TODO to late and tired to fix these types right now
      (a, b) => (a as any).createdAt - (b as any).createdAt,
    );

    return NextResponse.json(sortedResults);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to search by multiple fields.' },
      { status: 500 },
    );
  }
}
