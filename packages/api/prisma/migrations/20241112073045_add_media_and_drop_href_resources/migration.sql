/*
  Warnings:

  - You are about to drop the column `href` on the `resources` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "resources" DROP COLUMN "href",
ADD COLUMN     "media_id" INTEGER;

-- AddForeignKey
ALTER TABLE "resources" ADD CONSTRAINT "resources_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
