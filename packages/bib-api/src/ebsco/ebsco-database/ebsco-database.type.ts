import { Injectable } from "@nestjs/common";
import { Prisma, database } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

export type DatabaseWithCommunities = database & {
	communities: { community: { name: string; id: number } }[];
};

export type DatabaseWithDomains = database & {
	domains?: string[];
	communities?: number[];
};
