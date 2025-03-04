'use server';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const barcodeSearch = searchParams.get('barcode');
  const generalSearch = searchParams.get('search');
  const oldest = searchParams.get('oldest')?.toString();

  if (oldest) {
    // Handle the "oldest" query
    try {
      const bookResults = await prisma.scannedBook.findMany({
        take: Number(oldest),
        orderBy: { createdAt: 'asc' },
      });

      return NextResponse.json(bookResults);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed to retrieve books by creation date.' },
        { status: 500 },
      );
    }
  }

  if (barcodeSearch) {
    // Handle exact barcode search
    try {
      const bookResults = await prisma.scannedBook.findMany({
        where: {
          barcode: {
            equals: barcodeSearch,
          },
        },
        orderBy: { title: 'asc' },
      });

      return NextResponse.json(bookResults);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Book not found with the given barcode.' },
        { status: 500 },
      );
    }
  }

  if (generalSearch) {
    const searchWords = generalSearch.split(/\s+/).filter(Boolean);
    const searchQuery = searchWords.join(' ');

    const SIMILARITY_MATCH_THRESHOLD = 0.5; // Minimum similarity score for a match

    // If it is not working you may need to run the following SQL command:
    // CREATE EXTENSION IF NOT EXISTS pg_trgm;
    try {
      const bookResults = await prisma.$queryRaw`
        SELECT * FROM (
          SELECT *, 
            word_similarity(title, ${searchQuery}) AS title_similarity
          FROM "ScannedBook"
        ) AS subquery
        WHERE 
          title_similarity > ${SIMILARITY_MATCH_THRESHOLD}
        ORDER BY title_similarity DESC
      `;

      return NextResponse.json(bookResults);
    } catch (error: any) {
      console.error('Search error:', error);
      return NextResponse.json(
        { error: 'Failed to find books with the given search term.' },
        { status: 500 },
      );
    }
  }

  // If no valid query parameters are provided
  return NextResponse.json(
    { error: 'No valid query parameters provided.' },
    { status: 400 },
  );
}
