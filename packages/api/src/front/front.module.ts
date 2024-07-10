import { Module } from "@nestjs/common";
import { FrontCmsModule } from "./cms/cms.module";
import { FrontDatabaseModule } from "./database/database.module";
import { FrontFavoriteResourcesModule } from "./favoriteResources/favoriteResources.module";
import { FrontHistoryModule } from "./history/history.module";
import { FrontLicenseModule } from "./license/license.module";
import { FrontMetadoreModule } from "./metadore/metadore.module";
import { FrontResourceModule } from "./resource/resource.module";
import { FrontTestNewsModule } from "./testNews/testNews.module";
import { UserSettingsModule } from "./user-settings/user-settings.module";

@Module({
	imports: [
		FrontCmsModule,
		FrontTestNewsModule,
		UserSettingsModule,
		FrontResourceModule,
		FrontLicenseModule,
		FrontMetadoreModule,
		FrontHistoryModule,
		FrontDatabaseModule,
		FrontFavoriteResourcesModule,
	],
})
export class FrontModule {}
