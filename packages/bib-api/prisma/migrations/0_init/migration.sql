-- CreateTable
CREATE TABLE "admin_user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(40) NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "salt" VARCHAR(40) NOT NULL,
    "comment" VARCHAR(65535),

    CONSTRAINT "admin_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "community" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,
    "gate" VARCHAR(40) NOT NULL,
    "user_id" VARCHAR(40) NOT NULL,
    "profile" VARCHAR(40) NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "ebsco" BOOLEAN DEFAULT true,

    CONSTRAINT "domain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "database" (
    "id" SERIAL NOT NULL,
    "name_fr" VARCHAR(40) NOT NULL,
    "text_fr" VARCHAR(65535) NOT NULL,
    "text_en" VARCHAR(65535) NOT NULL,
    "url_fr" VARCHAR(65535) NOT NULL,
    "url_en" VARCHAR(65535) NOT NULL,
    "image" TEXT,
    "name_en" VARCHAR(40),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "oa" BOOLEAN NOT NULL DEFAULT false,
    "use_proxy" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "database_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "database_community" (
    "database_id" INTEGER NOT NULL,
    "community_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "history" (
    "id" SERIAL NOT NULL,
    "user_id" VARCHAR(40) NOT NULL,
    "event" JSON NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT timezone('utc'::text, now()),
    "has_alert" BOOLEAN DEFAULT false,
    "frequence" interval,
    "last_execution" DATE,
    "last_results" JSON,
    "nb_results" INTEGER,
    "active" BOOLEAN DEFAULT true,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inist_account" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "password" VARCHAR(40) NOT NULL,
    "name" VARCHAR(255),
    "firstname" VARCHAR(255),
    "mail" VARCHAR(255),
    "phone" VARCHAR(255),
    "dr" VARCHAR(255),
    "comment" VARCHAR(65535),
    "subscription_date" DATE DEFAULT ('now'::text)::date,
    "expiration_date" DATE,
    "main_institute" INTEGER,
    "main_unit" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "last_connexion" DATE DEFAULT ('now'::text)::date,

    CONSTRAINT "inist_account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inist_account_community" (
    "community_id" INTEGER NOT NULL,
    "inist_account_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "inist_account_institute" (
    "institute_id" INTEGER NOT NULL,
    "inist_account_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "inist_account_unit" (
    "unit_id" INTEGER NOT NULL,
    "inist_account_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "institute" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(40) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "institute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institute_community" (
    "community_id" INTEGER NOT NULL,
    "institute_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "janus_account" (
    "id" SERIAL NOT NULL,
    "primary_institute" INTEGER,
    "primary_unit" INTEGER,
    "uid" VARCHAR(100),
    "mail" VARCHAR(100),
    "name" VARCHAR(100),
    "firstname" VARCHAR(100),
    "cnrs" BOOLEAN DEFAULT true,
    "comment" VARCHAR(65535),
    "last_connexion" DATE DEFAULT ('now'::text)::date,
    "favorite_domain" VARCHAR(255),
    "first_connexion" DATE DEFAULT ('now'::text)::date,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "favourite_resources" JSON,

    CONSTRAINT "bib_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "janus_account_community" (
    "community_id" INTEGER NOT NULL,
    "janus_account_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "janus_account_institute" (
    "institute_id" INTEGER NOT NULL,
    "janus_account_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "janus_account_unit" (
    "unit_id" INTEGER NOT NULL,
    "janus_account_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "migrat" (
    "key" VARCHAR(22) NOT NULL,
    "value" TEXT,

    CONSTRAINT "migrat_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "revue" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(1023) NOT NULL,
    "url" VARCHAR(1023) NOT NULL,

    CONSTRAINT "revue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revue_community" (
    "revue_id" INTEGER NOT NULL,
    "community_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "section_cn" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "comment" VARCHAR(65535),

    CONSTRAINT "section_cn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "section_cn_primary_institute" (
    "section_cn_id" INTEGER NOT NULL,
    "institute_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "section_cn_secondary_institute" (
    "section_cn_id" INTEGER NOT NULL,
    "institute_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "unit" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "comment" VARCHAR(65535),
    "name" VARCHAR(255),
    "implantation" VARCHAR(255),
    "building" VARCHAR(255),
    "street" VARCHAR(255),
    "post_office_box" VARCHAR(255),
    "postal_code" VARCHAR(255),
    "town" VARCHAR(255),
    "country" VARCHAR(255),
    "unit_dr" VARCHAR(255),
    "nb_researcher_cnrs" INTEGER,
    "nb_researcher_nocnrs" INTEGER,
    "nb_doctorant" INTEGER,
    "nb_post_doctorant" INTEGER,
    "director_name" VARCHAR(255),
    "director_firstname" VARCHAR(255),
    "director_mail" VARCHAR(255),
    "correspondant_documentaire" VARCHAR(255),
    "cd_phone" VARCHAR(255),
    "cd_mail" VARCHAR(255),
    "correspondant_informatique" VARCHAR(255),
    "ci_phone" VARCHAR(255),
    "ci_mail" VARCHAR(255),
    "main_institute" INTEGER,
    "body" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit_community" (
    "community_id" INTEGER NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "unit_institute" (
    "institute_id" INTEGER NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "unit_section_cn" (
    "section_cn_id" INTEGER NOT NULL,
    "unit_id" INTEGER NOT NULL,
    "index" INTEGER DEFAULT 0
);

-- CreateTable
CREATE TABLE "license" (
    "id" SERIAL NOT NULL,
    "name_fr" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "content_fr" TEXT NOT NULL,
    "content_en" TEXT NOT NULL,
    "pdf" JSON,
    "enable" BOOLEAN NOT NULL DEFAULT true,
    "common" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "license_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_license_community" (
    "license_id" INTEGER NOT NULL,
    "community_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "content_management" (
    "id" SERIAL NOT NULL,
    "name_fr" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "content_fr" TEXT NOT NULL,
    "content_en" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),
    "enable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "content_management_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medias" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "resources" (
    "id" SERIAL NOT NULL,
    "name_fr" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "community" TEXT NOT NULL,
    "enable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests_news" (
    "id" SERIAL NOT NULL,
    "name_fr" VARCHAR(255) NOT NULL,
    "name_en" VARCHAR(255) NOT NULL,
    "content_fr" TEXT NOT NULL,
    "content_en" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3),
    "urls" JSON,
    "domains" JSON,
    "enable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tests_news_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_admin_username" ON "admin_user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "unique_community_name" ON "community"("name");

-- CreateIndex
CREATE UNIQUE INDEX "unique_database_name" ON "database"("name_fr");

-- CreateIndex
CREATE UNIQUE INDEX "database_community_constraint" ON "database_community"("database_id", "community_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_inist_account_username" ON "inist_account"("username");

-- CreateIndex
CREATE UNIQUE INDEX "inist_account_community_constraint" ON "inist_account_community"("inist_account_id", "community_id");

-- CreateIndex
CREATE UNIQUE INDEX "inist_account_institute_constraint" ON "inist_account_institute"("institute_id", "inist_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "inist_account_unit_constraint" ON "inist_account_unit"("unit_id", "inist_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_institute_code" ON "institute"("code");

-- CreateIndex
CREATE UNIQUE INDEX "institute_community_constraint" ON "institute_community"("institute_id", "community_id");

-- CreateIndex
CREATE UNIQUE INDEX "janus_account_uid_constraint" ON "janus_account"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "janus_account_community_constraint" ON "janus_account_community"("janus_account_id", "community_id");

-- CreateIndex
CREATE UNIQUE INDEX "janus_account_institute_constraint" ON "janus_account_institute"("institute_id", "janus_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "janus_account_unit_constraint" ON "janus_account_unit"("unit_id", "janus_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_revue_title" ON "revue"("title");

-- CreateIndex
CREATE UNIQUE INDEX "revue_community_constraint" ON "revue_community"("revue_id", "community_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_section_cn_code" ON "section_cn"("code");

-- CreateIndex
CREATE UNIQUE INDEX "section_cn_primary_institute_constraint" ON "section_cn_primary_institute"("section_cn_id", "institute_id");

-- CreateIndex
CREATE UNIQUE INDEX "section_cn_secondary_institute_constraint" ON "section_cn_secondary_institute"("section_cn_id", "institute_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_unit_name" ON "unit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "unit_community_constraint" ON "unit_community"("unit_id", "community_id");

-- CreateIndex
CREATE UNIQUE INDEX "unit_institute_constraint" ON "unit_institute"("institute_id", "unit_id");

-- CreateIndex
CREATE UNIQUE INDEX "unit_section_cn_constraint" ON "unit_section_cn"("section_cn_id", "unit_id");

-- CreateIndex
CREATE INDEX "_license_community_B_index" ON "_license_community"("community_id");

-- CreateIndex
CREATE UNIQUE INDEX "_license_community_AB_unique" ON "_license_community"("license_id", "community_id");

-- AddForeignKey
ALTER TABLE "database_community" ADD CONSTRAINT "database_community_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "database_community" ADD CONSTRAINT "database_community_database_id_fkey" FOREIGN KEY ("database_id") REFERENCES "database"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inist_account" ADD CONSTRAINT "inist_account_main_institute_fkey" FOREIGN KEY ("main_institute") REFERENCES "institute"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inist_account" ADD CONSTRAINT "inist_account_main_unit_fkey" FOREIGN KEY ("main_unit") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inist_account_community" ADD CONSTRAINT "inist_account_domain_domain_id_fkey" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inist_account_community" ADD CONSTRAINT "inist_account_domain_inist_account_id_fkey" FOREIGN KEY ("inist_account_id") REFERENCES "inist_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inist_account_institute" ADD CONSTRAINT "inist_account_institute_inist_account_id_fkey" FOREIGN KEY ("inist_account_id") REFERENCES "inist_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inist_account_institute" ADD CONSTRAINT "inist_account_institute_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inist_account_unit" ADD CONSTRAINT "inist_account_unit_inist_account_id_fkey" FOREIGN KEY ("inist_account_id") REFERENCES "inist_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inist_account_unit" ADD CONSTRAINT "inist_account_unit_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "institute_community" ADD CONSTRAINT "institute_domain_domain_id_fkey" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "institute_community" ADD CONSTRAINT "institute_domain_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "janus_account" ADD CONSTRAINT "bib_user_primary_institute_fkey" FOREIGN KEY ("primary_institute") REFERENCES "institute"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "janus_account" ADD CONSTRAINT "bib_user_primary_unit_fkey" FOREIGN KEY ("primary_unit") REFERENCES "unit"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "janus_account_community" ADD CONSTRAINT "bib_user_domain_bib_user_id_fkey" FOREIGN KEY ("janus_account_id") REFERENCES "janus_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "janus_account_community" ADD CONSTRAINT "bib_user_domain_domain_id_fkey" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "janus_account_institute" ADD CONSTRAINT "bib_user_institute_bib_user_id_fkey" FOREIGN KEY ("janus_account_id") REFERENCES "janus_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "janus_account_institute" ADD CONSTRAINT "bib_user_institute_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "janus_account_unit" ADD CONSTRAINT "bib_user_unit_bib_user_id_fkey" FOREIGN KEY ("janus_account_id") REFERENCES "janus_account"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "janus_account_unit" ADD CONSTRAINT "bib_user_unit_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "revue_community" ADD CONSTRAINT "revue_community_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "revue_community" ADD CONSTRAINT "revue_community_revue_id_fkey" FOREIGN KEY ("revue_id") REFERENCES "revue"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "section_cn_primary_institute" ADD CONSTRAINT "section_cn_primary_institute_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "section_cn_primary_institute" ADD CONSTRAINT "section_cn_primary_institute_section_cn_id_fkey" FOREIGN KEY ("section_cn_id") REFERENCES "section_cn"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "section_cn_secondary_institute" ADD CONSTRAINT "section_cn_secondary_institute_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "section_cn_secondary_institute" ADD CONSTRAINT "section_cn_secondary_institute_section_cn_id_fkey" FOREIGN KEY ("section_cn_id") REFERENCES "section_cn"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_main_institute_fkey" FOREIGN KEY ("main_institute") REFERENCES "institute"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_community" ADD CONSTRAINT "unit_domain_domain_id_fkey" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_community" ADD CONSTRAINT "unit_domain_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_institute" ADD CONSTRAINT "unit_institute_institute_id_fkey" FOREIGN KEY ("institute_id") REFERENCES "institute"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_institute" ADD CONSTRAINT "unit_institute_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_section_cn" ADD CONSTRAINT "unit_section_cn_section_cn_id_fkey" FOREIGN KEY ("section_cn_id") REFERENCES "section_cn"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "unit_section_cn" ADD CONSTRAINT "unit_section_cn_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_license_community" ADD CONSTRAINT "_license_community_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "community"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_license_community" ADD CONSTRAINT "_license_community_license_id_fkey" FOREIGN KEY ("license_id") REFERENCES "license"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

