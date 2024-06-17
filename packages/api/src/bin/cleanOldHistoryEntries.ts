import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "../app.module";
import { EbscoHistoryCronService } from "../ebsco/history/historyCron.service";

(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	await app.init();

	const service = app.get(EbscoHistoryCronService);

	await service.cleanOldHistory();

	await app.close();
})()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
