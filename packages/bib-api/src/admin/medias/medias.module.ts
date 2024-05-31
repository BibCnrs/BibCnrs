import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../admin-authentication/admin-authentication.module";
import { MediasController } from "./medias.controller";
import { MediasService } from "./medias.service";

@Module({
	controllers: [MediasController],
	providers: [MediasService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [MediasService],
})
export class MediasModule {}
