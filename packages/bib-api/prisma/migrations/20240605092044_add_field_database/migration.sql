/*
  Warnings:

  - You are about to drop the column `image` on the `database` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeDatabaseEnum" AS ENUM ('news', 'book', 'database', 'data');

-- AlterTable
ALTER TABLE "database" DROP COLUMN "image",
ADD COLUMN     "is_archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_text_integral" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "TypeDatabaseEnum"[],
ADD COLUMN     "without_embargo" BOOLEAN NOT NULL DEFAULT false;
