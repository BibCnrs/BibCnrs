import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.use(cookieParser());
	app.useBodyParser("json", { limit: "10mb" });
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);
	await app.listen(3000);
}
bootstrap();
