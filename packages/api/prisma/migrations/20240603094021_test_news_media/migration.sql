-- AlterTable
ALTER TABLE "tests_news" ADD COLUMN     "media_id" INTEGER;

-- AddForeignKey
ALTER TABLE "tests_news" ADD CONSTRAINT "tests_news_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "medias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
