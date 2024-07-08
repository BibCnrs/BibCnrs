-- AlterTable
ALTER TABLE "medias" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT timezone('utc'::text, now());
