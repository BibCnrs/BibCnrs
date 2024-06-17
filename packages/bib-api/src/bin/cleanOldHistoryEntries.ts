import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "../app.module";
import { EbscoHistoryCronService } from "../ebsco/ebsco-history/ebsco-history-cron.service";
import { EbscoSearchAlertCronService } from "../ebsco/ebsco-search-alert/ebsco-search-alert-cron.service";

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
