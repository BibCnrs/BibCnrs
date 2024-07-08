-- AlterTable
ALTER TABLE "content_management" ADD COLUMN     "media_id" INTEGER;

-- AddForeignKey
ALTER TABLE "content_management" ADD CONSTRAINT "content_management_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
