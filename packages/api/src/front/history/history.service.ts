import { Injectable } from "@nestjs/common";
import { Prisma, history } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateHistoryDto } from "./dto/history.dto";

@Injectable()
export class FrontHistoryService {
	constructor(private prismaService: PrismaService) {}

	private parseFrequence(frequence: string) {
		if (!frequence) {
			return null;
		}

		switch (frequence) {
			case "1 mon":
				return "month";
			case "1 day":
				return "day";
			case "7 days":
				return "week";
			case "1 year":
				return "year";
			default:
				return "day";
		}
	}

	async getHistory(
		userId: string,
		limit: number,
		offset: number,
		hasAlert: boolean,
		q?: string,
	) {
		const filters: { user_id: string; has_alert?: boolean } = {
			user_id: userId,
		};

		if (hasAlert) {
			filters.has_alert = hasAlert;
		}

		let query = `
			SELECT
				id,
				user_id,     
				event,          
				created_at,      
				has_alert as "hasAlert",      
				frequence::text,      
				last_execution,  
				last_results,   
				nb_results,
				active          
			FROM history
			WHERE user_id = $1 
			${hasAlert ? "AND has_alert = true" : ""}
		`;

		const queryParams = [userId, limit, offset];

		if (q) {
			query += "AND (event->'queries'->0->>'term')::text ILIKE $4 ";
			queryParams.push(`%${q}%`);
		}

		query += `
			ORDER BY created_at DESC
			LIMIT $2
			OFFSET $3
		`;

		const histories = await this.prismaService.$queryRawUnsafe<
			(history & { frequence?: string })[]
		>(query, ...queryParams);

		for (const history of histories) {
			history.frequence = this.parseFrequence(history.frequence);
		}

		// Construct the count query
		let countQuery = `
			SELECT COUNT(*)
			FROM history
			WHERE user_id = $1 
			${hasAlert ? "AND has_alert = true" : ""}
		`;

		const countParams = [userId];

		if (q) {
			countQuery += "AND (event->'queries'->0->>'term')::text ILIKE $2 ";
			countParams.push(`%${q}%`);
		}

		// Execute the count query
		const totalCountResult = await this.prismaService.$queryRawUnsafe<{
			count: number;
		}>(countQuery, ...countParams);

		const totalCount = totalCountResult[0].count;

		return { histories, totalCount: Number(totalCount) };
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

	async createHistory(
		userId: string,
		history: CreateHistoryDto,
		frequence?: string,
	) {
		const { id } = await this.prismaService.$transaction(async (prisma) => {
			const { totalHits } = history;
			const createdHistory = await prisma.history.create({
				data: {
					user_id: userId,
					event: history,
					active: true,
					has_alert: false,
					nb_results: totalHits,
				},
			});

			if (frequence) {
				await prisma.$executeRaw(
					Prisma.sql`UPDATE history SET frequence = ${frequence}::interval WHERE id = ${createdHistory.id}`,
				);
			}

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

	async updateAlertsSetActive(userId: string, active: boolean) {
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
