import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { AppLogger } from "./common/logger/AppLogger";

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: new AppLogger("Nest"),
	});
	app.use(cookieParser());
	app.useBodyParser("json", { limit: "10mb" });
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);

	const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;
	await app.listen(port);
}
bootstrap();
