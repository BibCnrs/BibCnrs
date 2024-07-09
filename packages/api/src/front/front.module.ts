import { Module } from "@nestjs/common";
import { FrontCmsModule } from "./cms/cms.module";
import { FrontResourceModule } from "./resource/resource.module";
import { FrontTestNewsModule } from "./testNews/testNews.module";
import { UserSettingsModule } from "./user-settings/user-settings.module";

@Module({
	imports: [
		FrontCmsModule,
		FrontTestNewsModule,
		UserSettingsModule,
		FrontResourceModule,
	],
})
export class FrontModule {}
