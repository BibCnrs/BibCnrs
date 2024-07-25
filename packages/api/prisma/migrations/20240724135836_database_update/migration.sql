-- DropConstraintes
ALTER TABLE "database" DROP CONSTRAINT IF EXISTS "unique_database_name";

-- AlterTable
ALTER TABLE "database" ALTER COLUMN "name_fr" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name_en" SET DATA TYPE VARCHAR(255);
