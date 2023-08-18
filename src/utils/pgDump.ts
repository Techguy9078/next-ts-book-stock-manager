"use server";
import { execa } from "execa";

/**
 * Dumps all postgresql database to .csv file in ./backups/
 * @returns Success or returns Error
 */

export default async function PGDUMP(): Promise<Error | "Success!"> {
	const path = process.env.DATABASE_URL;

	if (!path) return Error("No DATABASE_URL environment variable.");
	await csvOutput(path);

	return "Success!";
}

async function csvOutput(path: string) {
	const { stdout } = await execa(`${process.env.PGADMIN_PATH}`, [
		`--dbname=${path}`,
		`--command=SELECT * FROM public."ScannedBook"`,
		"--csv",
		`--output=${process.env.BACKUP_PATH}${new Date()
			.toLocaleDateString()
			.replaceAll("/", "_")}_backup.csv`,
	]);

	return stdout;
}
