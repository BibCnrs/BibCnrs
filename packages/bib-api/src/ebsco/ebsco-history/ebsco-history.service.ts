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
}
