-- CreateEnum
CREATE TYPE "SearchMode" AS ENUM ('article', 'journal', 'platform', 'searchData');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('auto', 'fr', 'en');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('auto', 'light', 'dark');

-- AlterTable
ALTER TABLE "janus_account" ADD COLUMN     "defaultLanguage" "Language" NOT NULL DEFAULT 'auto',
ADD COLUMN     "defaultSearchMode" "SearchMode" NOT NULL DEFAULT 'article',
ADD COLUMN     "defaultTheme" "Theme" NOT NULL DEFAULT 'auto',
ADD COLUMN     "displayFavorites" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "displayTestNews" BOOLEAN NOT NULL DEFAULT true;
