import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { NotFoundFilter } from "./proxy/not-found.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);
	app.useGlobalFilters(new NotFoundFilter());
	await app.listen(3000);
}
bootstrap();
