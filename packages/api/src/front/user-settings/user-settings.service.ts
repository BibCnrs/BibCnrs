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
				defaultSearchMode: true,
				defaultLanguage: true,
				defaultTheme: true,
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
				defaultSearchMode: true,
				defaultLanguage: true,
				defaultTheme: true,
			},
			data: body,
			where: {
				id: id,
			},
		});
	}

	async updateHasSeenPopup(id: number) {
		return await this.prismaService.janus_account.update({
			select: {
				hasSeenPopup: true,
			},
			data: {
				hasSeenPopup: true,
			},
			where: {
				id: id,
			},
		});
	}
}
