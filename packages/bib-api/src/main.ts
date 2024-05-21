import { NestFactory } from "@nestjs/core";
import { AppModule } from "packages/bib-api/src/app.module";
import { NotFoundFilter } from "packages/bib-api/src/not-found.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalFilters(new NotFoundFilter());
	await app.listen(3000);
}
bootstrap();
