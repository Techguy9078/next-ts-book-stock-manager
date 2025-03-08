'use server';
import { execa } from 'execa';
import path from 'path';
import fs from 'fs/promises';

/**
 * Dumps PostgreSQL table as a CSV file using pgAdmin instead of psql.
 */
export default async function PGDUMP(): Promise<string> {
  const databaseUrl = process.env.DATABASE_URL;
  const psqlPath = `"C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe"`;
  const backupDir =
    process.env.BACKUP_PATH || 'C:\\Users\\david\\Desktop\\backups';

  if (!databaseUrl) {
    throw new Error('No DATABASE_URL environment variable.');
  }

  // Ensure the backup directory exists
  await fs.mkdir(backupDir, { recursive: true });

  // Define output CSV file name with a timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filePath = path.join(backupDir, `database_backup_${timestamp}.csv`);

  try {
    // Use COPY SQL command to export data to CSV via psql
    await execa(psqlPath, [
      '-d',
      databaseUrl,
      '-c',
      `COPY (SELECT id, barcode, isbn, title, author, "createdAt" FROM public."ScannedBook") TO '${filePath}' CSV HEADER;`,
    ]);

    console.log(`Database exported successfully to ${filePath}`);
    return `Exported successfully: ${filePath}`;
  } catch (error: any) {
    console.error('Error exporting database:', error.message);
    throw new Error('Failed to export database');
  }
}
