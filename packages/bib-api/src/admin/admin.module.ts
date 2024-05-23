import { Module } from "@nestjs/common";
import { AdminUsersModule } from "packages/bib-api/src/admin/admin-users/admin-users.module";

@Module({
	imports: [AdminUsersModule],
	controllers: [],
	providers: [],
})
export class AdminModule {}
