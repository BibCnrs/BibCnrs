-- CreateTable
CREATE TABLE "tests_news_community" (
    "tests_news_id" INTEGER NOT NULL,
    "community_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tests_news_community_constraint" ON "tests_news_community"("tests_news_id", "community_id");

-- AddForeignKey
ALTER TABLE "tests_news_community" ADD CONSTRAINT "tests_news_community_tests_news_id_fkey" FOREIGN KEY ("tests_news_id") REFERENCES "tests_news"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tests_news_community" ADD CONSTRAINT "tests_news_community_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

INSERT INTO "tests_news_community" ("tests_news_id", "community_id") 
SELECT "t"."id", "c"."id"
FROM (
	SELECT id, json_array_elements_text("domains") AS "community_name"
    FROM "tests_news"
) "t"
INNER JOIN "community" AS "c"
	ON "c"."name" = "t"."community_name";
