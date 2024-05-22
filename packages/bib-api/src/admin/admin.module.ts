import { Module } from "@nestjs/common";
import { AdminUsersModule } from "./admin-users/admin-users.module";

@Module({
	imports: [AdminUsersModule],
})
export class AdminModule {
	// for all modules, prefix the path with /admin
}
