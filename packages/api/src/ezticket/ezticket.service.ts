import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { SecurityService } from "../common/security/security.service";
import { Config } from "../config";
import {
	selectMainInstituteCode as inistSelectMainInstituteCode,
	selectMainInstituteGroups as inistSelectMainInstituteGroups,
	selectMainUnitCode as inistSelectMainUnitCode,
	selectMainUnitGroups as inistSelectMainUnitGroups,
	selectGroups as initSelectGroups,
} from "../inist/accounts/accounts.queries";
import {
	selectGroups as janusSelectGroups,
	selectMainInstituteCode as janusSelectMainInstituteCode,
	selectMainUnitCode as janusSelectMainUnitCode,
	selectPrimaryInstituteGroups as janusSelectPrimaryInstituteGroups,
	selectPrimaryUnitGroups as janusSelectPrimaryUnitGroups,
} from "../janus/accounts/accounts.queries";
import { PrismaService } from "../prisma/prisma.service";

type InistUser = {
	username: string;
	institute: string[];
	unit: string[];
	main_unit_groups: string[];
	main_institute_groups: string[];
	groups: string[];
};

type JanusUser = {
	mail: string;
	cnrs: boolean;
	institute: string[];
	unit: string[];
	primary_unit_groups: string[];
	primary_institute_groups: string[];
	groups: string[];
};

@Injectable()
export class EzTicketService {
	private readonly ezProxyConfig: Config["ezProxy"];

	constructor(
		private readonly configService: ConfigService<Config, true>,
		private readonly prismaService: PrismaService,
		private readonly securityService: SecurityService,
	) {
		this.ezProxyConfig = this.configService.get("ezProxy");
	}

	async selectInistEzTicketInfoForId(id: number) {
		const [result] = await this.prismaService.$queryRaw<[InistUser]>`
    SELECT 
        username,
        ARRAY(${inistSelectMainInstituteCode}) AS institute,
        ARRAY(${inistSelectMainUnitCode}) AS unit,
        ARRAY(${inistSelectMainUnitGroups}) as main_unit_groups,
        ARRAY(${inistSelectMainInstituteGroups}) as main_institute_groups,
        ARRAY(${initSelectGroups}) AS groups
    FROM inist_account WHERE id = ${id}`;

		return {
			username: `${result.username}_O_UNKNOWN_I_${result.institute}_OU_${result.unit}`,
			groups: [
				...new Set(
					result.main_institute_groups
						.concat(result.main_unit_groups)
						.concat(result.groups),
				),
			],
		};
	}

	async selectJanusEzTicketInfoForId(id: number) {
		const [result] = await this.prismaService.$queryRaw<[JanusUser]>`SELECT 
        mail,
        cnrs,
        ARRAY(${janusSelectMainInstituteCode}) AS institute,
        ARRAY(${janusSelectMainUnitCode}) AS unit,
        ARRAY(${janusSelectPrimaryInstituteGroups}) as primary_institute_groups,
        ARRAY(${janusSelectPrimaryUnitGroups}) as primary_unit_groups,
        ARRAY(${janusSelectGroups}) AS groups
        FROM janus_account WHERE id = ${id}`;

		return {
			username: `${result.mail}_O_${result.cnrs ? "CNRS" : "OTHER"}_I_${
				result.institute
			}_OU_${result.unit}`,
			groups: [
				...new Set(
					result.primary_institute_groups
						.concat(result.primary_unit_groups)
						.concat(result.groups),
				),
			],
		};
	}

	async getEzTicketInfo({ origin, id, domains }: Request["user"]) {
		switch (origin) {
			case "inist":
				return {
					...(await this.selectInistEzTicketInfoForId(id)),
					domains,
				};
			case "janus":
				return {
					...(await this.selectJanusEzTicketInfoForId(id)),
					domains,
				};
			default:
				return;
		}
	}

	async findCommunityByGate(gate: string) {
		const community = await this.prismaService.community.findFirst({
			where: {
				gate: gate,
			},
		});

		if (!community) {
			throw new Error("community not found");
		}

		return community;
	}

	generateEZTicket(
		gate: string,
		url: string,
		username: string,
		groups: string[],
		timestamp = Math.floor(Date.now() / 1000),
	) {
		const packet = [
			`$u${timestamp}`,
			groups.length ? `$g${groups.join("+")}` : "",
			"$e",
		].join("");

		const hash = this.securityService.sha512(
			`${this.ezProxyConfig.ticketSecret}${username}${packet}`,
		);
		const EzTicketTicket = encodeURIComponent(`${hash}${packet}`);

		return `https://${gate}/login?user=${encodeURIComponent(
			username,
		)}&ticket=${EzTicketTicket}&url=${encodeURIComponent(url)}`;
	}
}
