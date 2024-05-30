import { Injectable } from "@nestjs/common";
import { Prisma, history } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateHistoryDto } from "./dto/ebsco-history.dto";

@Injectable()
export class EbscoHistoryService {
	constructor(private prismaService: PrismaService) {}

	async getHistory(
		userId: string,
		limit: number,
		offset: number,
		hasAlert: boolean,
	) {
		return this.prismaService.$queryRawUnsafe<history[]>(
			`SELECT
				id,
				user_id,     
				event,          
				created_at,      
				has_alert,      
				frequence::text,      
				last_execution,  
				last_results,   
				nb_results,
				active          
				FROM history
				WHERE user_id = $1 
				${hasAlert ? "AND has_alert = true" : ""}
				ORDER BY created_at DESC
				LIMIT $2
				OFFSET $3`,
			userId,
			limit,
			offset,
		);
	}

	async findHistory(id: number) {
		return this.prismaService
			.$queryRaw<history[]>(
				Prisma.sql`SELECT
				id,
				user_id,     
				event,          
				created_at,      
				has_alert,      
				frequence::text,      
				last_execution,  
				last_results,   
				nb_results,
				active          
				FROM history
				WHERE id = ${id}
				ORDER BY created_at DESC
				LIMIT 1`,
			)
			.then((results) => results.at(0) ?? null);
	}

	async createHistory(history: CreateHistoryDto & Pick<history, "user_id">) {
		const { id } = await this.prismaService.$transaction(async (prisma) => {
			const { frequence, ...rest } = history;
			const createdHistory = await prisma.history.create({
				data: rest,
			});

			await prisma.$executeRaw(
				Prisma.sql`UPDATE history SET frequence = ${frequence}::interval WHERE id = ${createdHistory.id}`,
			);

			return createdHistory;
		});

		return this.findHistory(id);
	}

	async deleteHistory(userId: string, id: number) {
		return this.prismaService.history.deleteMany({
			where: {
				id,
				user_id: userId,
			},
		});
	}

	async toggleAlert(userId: string, id: number) {
		const history = await this.findHistory(id);
		if (!history || history.user_id !== userId) {
			return null;
		}

		await this.prismaService.history.update({
			where: {
				id,
				user_id: userId,
			},
			data: {
				active: !history.active,
			},
		});

		return this.findHistory(id);
	}

	async toggleAllAlerts(userId: string) {
		const firstUserAlert = await this.getHistory(userId, 1, 0, true);
		const active = firstUserAlert.length > 0 ? !firstUserAlert[0].active : true;
		await this.prismaService.history.updateMany({
			where: {
				has_alert: true,
				user_id: userId,
			},
			data: {
				active,
			},
		});
	}

	async deleteHistoryNotAlert(userId: string) {
		return this.prismaService.history.deleteMany({
			where: {
				user_id: userId,
				has_alert: false,
			},
		});
	}

	async countHistory(userId: string, hasAlert: boolean) {
		return this.prismaService.history.count({
			where: {
				user_id: userId,
				has_alert: hasAlert,
			},
		});
	}
}
