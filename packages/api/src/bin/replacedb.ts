import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
dotenv.config();

const [, , searchValue, replaceValue] = process.argv;
const prisma = new PrismaClient();

(async () => {
	const sql = `
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE (column_name = 'content_fr' OR column_name = 'content_en')
            AND table_schema = 'public'
    LOOP
        EXECUTE format('UPDATE %I SET %I = REPLACE(%I, %L, %L)',
            r.table_name, r.column_name, r.column_name, '${searchValue}', '${replaceValue}');
    END LOOP;
END
$$;
`;

	try {
		await prisma.$executeRawUnsafe(sql);
		console.log("✅ Replacement completed successfully");
	} catch (error) {
		console.error("❌ Error during replacement:", error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
})();
