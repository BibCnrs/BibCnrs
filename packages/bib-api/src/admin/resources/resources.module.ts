import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { ResourcesController } from "./resources.controller";
import { ResourcesService } from "./resources.service";

@Module({
	controllers: [ResourcesController],
	providers: [ResourcesService],
	imports: [PrismaModule],
	exports: [ResourcesService],
})
export class ResourcesModule {}
