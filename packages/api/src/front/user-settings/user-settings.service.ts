import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateUserSettingsDto } from "./dto/user-setting.dto";

@Injectable()
export class UserSettingsService {
	constructor(private prismaService: PrismaService) {}

	async getUserSettings(id: number) {
		return await this.prismaService.janus_account.findUnique({
			select: {
				displayFavorites: true,
				displayTestNews: true,
				articleLinkType: true,
				defaultSearchMode: true,
				defaultLanguage: true,
				defaultTheme: true,
				platformView: true,
				hasSeenPopup: true,
			},
			where: {
				id: id,
			},
		});
	}

	async updateUserSettings(id: number, body: UpdateUserSettingsDto) {
		return await this.prismaService.janus_account.update({
			select: {
				displayFavorites: true,
				displayTestNews: true,
				articleLinkType: true,
				defaultSearchMode: true,
				defaultLanguage: true,
				defaultTheme: true,
				platformView: true,
				hasSeenPopup: true,
			},
			data: body,
			where: {
				id: id,
			},
		});
	}
}
