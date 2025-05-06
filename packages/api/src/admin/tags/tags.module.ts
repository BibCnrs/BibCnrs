import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { AdminAuthenticationModule } from "../authentication/authentication.module";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

@Module({
	controllers: [TagsController],
	providers: [TagsService],
	imports: [PrismaModule, AdminAuthenticationModule],
	exports: [TagsService],
})
export class TagsModule {}
