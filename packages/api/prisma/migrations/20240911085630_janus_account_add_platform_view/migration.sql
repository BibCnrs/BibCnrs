-- CreateEnum
CREATE TYPE "PlatformView" AS ENUM ('card', 'list');

-- AlterTable
ALTER TABLE "janus_account" ADD COLUMN     "platformView" "PlatformView" NOT NULL DEFAULT 'card';
