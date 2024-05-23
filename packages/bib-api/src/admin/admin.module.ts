import { Module } from "@nestjs/common";
import { AdminUsersModule } from "packages/bib-api/src/admin/admin-users/admin-users.module";
import { CommunitiesModule } from "packages/bib-api/src/admin/communities/communities.module";

@Module({
	imports: [AdminUsersModule, CommunitiesModule],
	controllers: [],
	providers: [],
})
export class AdminModule {}
