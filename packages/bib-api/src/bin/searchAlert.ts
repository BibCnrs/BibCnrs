import { ContextIdFactory, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "../app.module";
import { EbscoSearchAlertCronService } from "../ebsco/ebsco-search-alert/ebsco-search-alert-cron.service";
import { EbscoSearchAlertService } from "../ebsco/ebsco-search-alert/ebsco-search-alert.service";

(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	const service = app.get(EbscoSearchAlertCronService);

	await service.handleSearchAlertCron();

	await app.close();
})()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
