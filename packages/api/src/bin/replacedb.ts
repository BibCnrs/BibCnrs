import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

const [, , searchValueRaw, replaceValueRaw] = process.argv;

if (!searchValueRaw || !replaceValueRaw) {
	console.error("❌ Please provide search and replace values.");
	process.exit(1);
}

function sqlEscape(str: string): string {
	return str.replace(/'/g, "''");
}

const searchValue = sqlEscape(searchValueRaw);
const replaceValue = sqlEscape(replaceValueRaw);

const prisma = new PrismaClient();

(async () => {
	const tables = ["content_management", "license", "tests_news"];
	const columns = ["content_fr", "content_en"];

	try {
		for (const table of tables) {
			for (const column of columns) {
				const sqlImg = `
UPDATE ${table}
SET ${column} = regexp_replace(
  ${column},
  '(src=["''])([^"'']*)${searchValue}([^"'']*)(["''])',
  E'\\\\1\\\\2${replaceValue}\\\\3\\\\4',
  'gi'
)
WHERE ${column} ~* 'src=["''][^"'']*${searchValue}';
				`;

				const sqlHref = `
UPDATE ${table}
SET ${column} = regexp_replace(
  ${column},
  '(href=["''])([^"'']*)${searchValue}([^"'']*)(["''])',
  E'\\\\1\\\\2${replaceValue}\\\\3\\\\4',
  'gi'
)
WHERE ${column} ~* 'href=["''][^"'']*${searchValue}';
				`;

				console.log(
					`Executing SQL for <img> in table "${table}", column "${column}"`,
				);
				await prisma.$executeRawUnsafe(sqlImg);

				console.log(
					`Executing SQL for <a> in table "${table}", column "${column}"`,
				);
				await prisma.$executeRawUnsafe(sqlHref);
			}
		}

		console.log("✅ Replacement completed successfully.");
	} catch (error) {
		console.error("❌ Error during replacement:", error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
})();
