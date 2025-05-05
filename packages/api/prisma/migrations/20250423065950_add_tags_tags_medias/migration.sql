-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_tags_medias" (
    "tags_id" INTEGER NOT NULL,
    "medias_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE INDEX "tags_medias_medias_id_fkey" ON "_tags_medias"("medias_id");

-- CreateIndex
CREATE UNIQUE INDEX "tags_medias_constraint" ON "_tags_medias"("tags_id", "medias_id");

-- AddForeignKey
ALTER TABLE "_tags_medias" ADD CONSTRAINT "_tags_medias_medias_id_fkey" FOREIGN KEY ("medias_id") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_tags_medias" ADD CONSTRAINT "_tags_medias_tags_id_fkey" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
