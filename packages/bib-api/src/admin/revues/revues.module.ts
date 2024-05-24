import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { RevuesController } from "./revues.controller";
import { RevuesService } from "./revues.service";

@Module({
	controllers: [RevuesController],
	providers: [RevuesService],
	imports: [PrismaModule],
	exports: [RevuesService],
})
export class RevuesModule {}
