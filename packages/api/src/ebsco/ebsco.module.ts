import { Module } from "@nestjs/common";
import { EbscoDatabaseModule } from "./database/database.module";
import { EbscoDomainModule } from "./domain/domain.module";
import { EbscoFavoriteResourcesModule } from "./favoriteResources/favoriteResources.module";
import { EbscoHistoryModule } from "./history/history.module";
import { EbscoLicenseModule } from "./license/license.module";
import { EbscoMetadoreModule } from "./metadore/metadore.module";
import { EbscoOaModule } from "./oa/oa.module";
import { EbscoResourceModule } from "./resource/resource.module";
import { EbscoRisModule } from "./ris/ris.module";
import { EbscoSearchModule } from "./search/search.module";
import { EbscoSearchAlertModule } from "./searchAlert/searchAlert.module";
import { EbscoTokenModule } from "./token/token.module";

@Module({
	imports: [
		EbscoDomainModule,
		EbscoLicenseModule,
		EbscoResourceModule,
		EbscoHistoryModule,
		EbscoRisModule,
		EbscoDatabaseModule,
		EbscoMetadoreModule,
		EbscoFavoriteResourcesModule,
		EbscoOaModule,
		EbscoSearchAlertModule,
		EbscoTokenModule,
		EbscoSearchModule,
	],
})
export class EbscoModule {}
