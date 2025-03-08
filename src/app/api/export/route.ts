import { NextResponse } from 'next/server';
import PGDUMP from '@/utils/pgDump';

export async function POST() {
  try {
    const message = await PGDUMP();
    return NextResponse.json({ message });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to export database' },
      { status: 500 },
    );
  }
}
