import { Module } from "@nestjs/common";
import { CommonAuthModule } from "../../common/common-auth/common-auth.module";
import { PrismaModule } from "../../prisma/prisma.module";
import { EbscoFavoriteResourcesController } from "./ebsco-favorite-resources.controller";
import { EbscoFavoriteResourcesService } from "./ebsco-favorite-resources.service";

@Module({
	imports: [PrismaModule, CommonAuthModule],
	controllers: [EbscoFavoriteResourcesController],
	providers: [EbscoFavoriteResourcesService],
	exports: [EbscoFavoriteResourcesService],
})
export class EbscoFavoriteResourcesModule {}
