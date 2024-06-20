import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { UpdateUserSettingsDto } from "./dto/user-setting.dto";
import { UserSettingsService } from "./user-settings.service";

@Controller("front/user-settings")
export class UserSettingsController {
	constructor(private readonly userSettingsService: UserSettingsService) {}

	@Get(":id")
	async getContent(@Param("id") id: number) {
		return this.userSettingsService.getUserSettings(id);
	}

	@Patch(":id")
	async updateContent(
		@Param("id") id: number,
		@Body() body: UpdateUserSettingsDto,
	) {
		return this.userSettingsService.updateUserSettings(id, body);
	}
}
