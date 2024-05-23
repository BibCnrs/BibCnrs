import { Module } from "@nestjs/common";
import { CommunitiesController } from "packages/bib-api/src/admin/communities/communities.controller";
import { CommunitiesService } from "packages/bib-api/src/admin/communities/communities.service";
import { PrismaModule } from "packages/bib-api/src/prisma/prisma.module";

@Module({
	controllers: [CommunitiesController],
	providers: [CommunitiesService],
	imports: [PrismaModule],
	exports: [CommunitiesService],
})
export class CommunitiesModule {}
