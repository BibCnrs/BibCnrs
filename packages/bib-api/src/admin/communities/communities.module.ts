import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../admin-authentication/admin-authentication.module";
import { CommunitiesController } from "./communities.controller";
import { CommunitiesService } from "./communities.service";

@Module({
	controllers: [CommunitiesController],
	providers: [CommunitiesService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [CommunitiesService],
})
export class CommunitiesModule {}
