import { Module } from "@nestjs/common";
import { FrontCmsModule } from "./cms/cms.module";
import { FrontTestNewsModule } from "./testNews/testNews.module";
import { UserSettingsModule } from "./user-settings/user-settings.module";

@Module({
	imports: [FrontCmsModule, FrontTestNewsModule, UserSettingsModule],
})
export class FrontModule {}
