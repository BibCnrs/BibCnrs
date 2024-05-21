import { NestFactory } from "@nestjs/core";
import { proxy } from "packages/bib-api/src/proxy";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(proxy);
	await app.listen(3000);
}
bootstrap();
