import { Module } from "@nestjs/common";
import { AdminAuthenticationModule } from "./authentication/authentication.module";
import { CommunitiesModule } from "./communities/communities.module";
import { ContentsManagementModule } from "./contentsManagement/contents-management.module";
import { DatabasesModule } from "./databases/databases.module";
import { InistAccountsModule } from "./inistAccounts/inist-accounts.module";
import { InstitutesModule } from "./institutes/institutes.module";
import { JanusAccountsModule } from "./janusAccounts/janus-accounts.module";
import { LicensesModule } from "./licenses/licenses.module";
import { MediasModule } from "./medias/medias.module";
import { ResourcesModule } from "./resources/resources.module";
import { RevuesModule } from "./revues/revues.module";
import { SectionsCNModule } from "./sectionsCN/sectionsCN.module";
import { TagsModule } from "./tags/tags.module";
import { TestsNewsModule } from "./testsNews/tests-news.module";
import { UnitsModule } from "./units/units.module";
import { AdminUsersModule } from "./users/users.module";

@Module({
	imports: [
		AdminAuthenticationModule,
		AdminUsersModule,
		CommunitiesModule,
		DatabasesModule,
		RevuesModule,
		LicensesModule,
		ContentsManagementModule,
		MediasModule,
		TagsModule,
		ResourcesModule,
		TestsNewsModule,
		InstitutesModule,
		InistAccountsModule,
		JanusAccountsModule,
		UnitsModule,
		SectionsCNModule,
	],
	controllers: [],
	providers: [],
})
export class AdminModule {}
