import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { FrontResourceController } from "./resource.controller";
import { FrontResourceService } from "./resource.service";

@Module({
	imports: [PrismaModule],
	controllers: [FrontResourceController],
	providers: [FrontResourceService],
	exports: [FrontResourceService],
})
export class FrontResourceModule {}
