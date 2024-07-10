import { Module } from "@nestjs/common";
import { AuthModule } from "../../common/auth/auth.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { FrontFavoriteResourcesController } from "./favoriteResources.controller";
import { FrontFavoriteResourcesService } from "./favoriteResources.service";

@Module({
	imports: [PrismaModule, AuthModule],
	controllers: [FrontFavoriteResourcesController],
	providers: [FrontFavoriteResourcesService],
	exports: [FrontFavoriteResourcesService],
})
export class FrontFavoriteResourcesModule {}
