import { Module } from "@nestjs/common";
import { AdminUsersModule } from "./admin-users/admin-users.module";
import { CommunitiesModule } from "./communities/communities.module";
import { ContentsManagementModule } from "./contentsManagement/contents-management.module";
import { DatabasesModule } from "./databases/databases.module";
import { InstitutesModule } from "./institutes/institutes.module";
import { LicensesModule } from "./licenses/licenses.module";
import { MediasModule } from "./medias/medias.module";
import { ResourcesModule } from "./resources/resources.module";
import { RevuesModule } from "./revues/revues.module";
import { TestsNewsModule } from "./testsNews/tests-news.module";

@Module({
	imports: [
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
	],
	controllers: [],
	providers: [],
})
export class AdminModule {}
