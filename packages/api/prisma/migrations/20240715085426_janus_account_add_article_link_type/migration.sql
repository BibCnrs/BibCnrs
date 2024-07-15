-- CreateEnum
CREATE TYPE "ArticleLinkType" AS ENUM ('oa', 'fullText');

-- AlterTable
ALTER TABLE "janus_account" ADD COLUMN     "articleLinkType" "ArticleLinkType" NOT NULL DEFAULT 'oa';
