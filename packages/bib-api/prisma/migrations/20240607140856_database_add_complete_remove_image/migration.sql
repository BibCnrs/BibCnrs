/*
  Warnings:

  - You are about to drop the column `image` on the `database` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "database" DROP COLUMN "image",
ADD COLUMN     "complete" BOOLEAN NOT NULL DEFAULT false;
