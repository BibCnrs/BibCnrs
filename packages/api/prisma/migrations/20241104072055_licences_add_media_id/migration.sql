-- AlterTable
ALTER TABLE "license" ADD COLUMN     "media_id" INTEGER;

-- AddForeignKey
ALTER TABLE "license" ADD CONSTRAINT "license_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
