import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "../app.module";
import { AppLogger } from "../common/logger/AppLogger";
import { EbscoSearchAlertCronService } from "../ebsco/searchAlert/searchAlertCron.service";

(async () => {
	if (process.argv.length < 3) {
		throw new Error("You must provide janus user uid");
	}

	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: new AppLogger("Nest"),
	});

	await app.init();

	const service = app.get(EbscoSearchAlertCronService);

	await service.createTestAlert(process.argv[2]);

	await app.close();
})()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
