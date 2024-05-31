import { Module } from "@nestjs/common";
import { AdminAuthenticationModule } from "./admin-authentication/admin-authentication.module";
import { AdminUsersModule } from "./admin-users/admin-users.module";
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
import { TestsNewsModule } from "./testsNews/tests-news.module";
import { UnitsModule } from "./units/units.module";

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
