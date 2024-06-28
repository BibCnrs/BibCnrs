import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "../app.module";
import { AppLogger } from "../common/logger/AppLogger";
import { EbscoSearchAlertCronService } from "../ebsco/searchAlert/searchAlertCron.service";

(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: new AppLogger("Nest"),
	});

	await app.init();

	const service = app.get(EbscoSearchAlertCronService);

	await service.handleSearchAlertCron();

	await app.close();
})()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
