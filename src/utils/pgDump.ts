"use server";
import { execa } from "execa";

/**
 * Dumps all postgresql database to .sql file in ./backups/
 * @returns Success or returns Error
 */
export default async function PGDUMP(): Promise<Error | "Success!"> {
	const path = process.env.DATABASE_URL;

	if (!path) return Error("No DATABASE_URL environment variable.");

	await stdoutData(path);
	await stdoutSchema(path);

	return "Success!";
}

async function stdoutData(path: string) {
	const { stdout } = await execa(`D:\\Databases\\pgAdmin 4\\runtime\\pg_dump`, [
		`--dbname=${path}`,
		//  different formats can be 'plain', 'custom', 'directory', 'tar',
		`--format=plain`,
		`--inserts`,
		`--data-only`,
		`--quote-all-identifiers`,
		`--no-acl`,
		`--no-owner`,
		// File to write sql to
		`--file=./backups/${new Date()
			.toLocaleDateString()
			.replaceAll("/", "_")}_data_only.sql`,
	]);

	return stdout;
}

async function stdoutSchema(path: string) {
	const { stdout } = await execa(`D:\\Databases\\pgAdmin 4\\runtime\\pg_dump`, [
		`--dbname=${path}`,
		//  different formats can be 'plain', 'custom', 'directory', 'tar',
		`--format=plain`,
		`--inserts`,
		`--schema-only`,
		`--quote-all-identifiers`,
		`--no-acl`,
		`--no-owner`,
		// File to write sql to
		`--file=./backups/${new Date()
			.toLocaleDateString()
			.replaceAll("/", "_")}_schema_only.sql`,
	]);

	return stdout;
}
