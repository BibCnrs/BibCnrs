import { Module } from "@nestjs/common";
import { AdminUsersModule } from "./admin-users/admin-users.module";
import { CommunitiesModule } from "./communities/communities.module";
import { DatabasesModule } from "./databases/databases.module";
import { RevuesModule } from "./revues/revues.module";

@Module({
	imports: [AdminUsersModule, CommunitiesModule, DatabasesModule, RevuesModule],
	controllers: [],
	providers: [],
})
export class AdminModule {}
