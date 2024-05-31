import { Module } from "@nestjs/common";
import { PrismaModule } from "../../prisma/prisma.module";
import { RenaterAuthController } from "./renater-auth.contoller";
import { RenaterAuthService } from "./renater-auth.service";

@Module({
	imports: [PrismaModule],
	controllers: [RenaterAuthController],
	providers: [RenaterAuthService],
	exports: [RenaterAuthService],
})
export class RenaterAuthModule {}
