-- CreateEnum
CREATE TYPE "PlatformView" AS ENUM ('card', 'list');

-- DropIndex
DROP INDEX IF EXISTS "unique_database_name";

-- AlterTable
ALTER TABLE "janus_account" ADD COLUMN     "platformView" "PlatformView" NOT NULL DEFAULT 'card';
