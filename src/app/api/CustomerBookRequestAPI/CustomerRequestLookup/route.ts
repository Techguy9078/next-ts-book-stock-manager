import { prisma } from '@/db';
import { NextResponse } from 'next/server';

function cleanseSearches(item: string | null): string | undefined {
  let itemNoWhiteSpace = item?.trimEnd()
  return itemNoWhiteSpace?.split(' ').join(' | ');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isbn = cleanseSearches(searchParams.get('isbn'));
  const barcode = cleanseSearches(searchParams.get('barcode'));
  const author = cleanseSearches(searchParams.get('author'));
  const title = cleanseSearches(searchParams.get('title'));

  try {
    const [
      resultsByIsbn,
      resultsByBarcode,
      resultsByAuthor,
      resultsByTitle,
      resultsByComments,
    ] = await Promise.all([
      prisma.customerBookRequest.findMany({
        where: { requestISBN: { search: isbn || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestISBN: { search: barcode || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestAuthor: { search: author || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestTitle: { search: title || '' } },
      }),
      // Search comments for all fields
      prisma.customerBookRequest.findMany({
        where: { requestComment: { search: isbn || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestComment: { search: author || '' } },
      }),
      prisma.customerBookRequest.findMany({
        where: { requestComment: { search: title || '' } },
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

    interface allResults {
      matchedOn: string;
      createdAt: Date;
      id: number;
      requestName: string;
      requestNumber: string;
      requestTitle: string | null;
      requestAuthor: string | null;
      requestISBN: string | null;
      requestComment: string | null;
    }

    // Sort by oldest first
    const sortedResults = Object.values(allResults).sort(
      // TODO to late and tired to fix these types right now
      // TODO I guess can be done on another day - T
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
