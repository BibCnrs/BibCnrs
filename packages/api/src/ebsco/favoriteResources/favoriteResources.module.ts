import { Module } from "@nestjs/common";
import { AuthModule } from "../../common/auth/auth.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoFavoriteResourcesController } from "./favoriteResources.controller";
import { EbscoFavoriteResourcesService } from "./favoriteResources.service";

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [EbscoFavoriteResourcesController],
	providers: [EbscoFavoriteResourcesService],
	exports: [EbscoFavoriteResourcesService],
})
export class EbscoFavoriteResourcesModule {}
