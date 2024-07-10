import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "../app.module";
import { AppLogger } from "../common/logger/AppLogger";
import { FrontHistoryCronService } from "../front/history/historyCron.service";

(async () => {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		logger: new AppLogger("Nest"),
	});

	await app.init();

	const service = app.get(FrontHistoryCronService);

	await service.cleanOldHistory();

	await app.close();
})()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
