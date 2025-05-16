import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { FindAllQueryArgs } from "../admin.type";
import { AdminAuthenticationGuard } from "../authentication/authentication.guard";
import { TagsController } from "./tags.controller";
import { TagsService } from "./tags.service";

describe("TagsController", () => {
	let tagsController: TagsController;
	let tagsService: TagsService;

	beforeEach(async () => {
		const mockTagsService = {
			findAll: vi.fn(),
		};

		const mockAdminAuthenticationGuard = {
			canActivate: vi.fn().mockReturnValue(true),
		};

		const mockConfigService = {
			get: vi.fn().mockImplementation((key: string) => {
				if (key === "auth") {
					return { jwtSecret: "test-secret" };
				}
				return null;
			}),
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [TagsController],
			providers: [
				{ provide: TagsService, useValue: mockTagsService },
				{
					provide: AdminAuthenticationGuard,
					useValue: mockAdminAuthenticationGuard,
				},
				{ provide: JwtService, useValue: {} },
				{ provide: ConfigService, useValue: mockConfigService },
				{ provide: PrismaService, useValue: {} },
			],
		}).compile();

		tagsController = module.get<TagsController>(TagsController);
		tagsService = module.get<TagsService>(TagsService);
	});

	describe("findAll", () => {
		test("should return data", async () => {
			const mockQuery: FindAllQueryArgs = { _page: "1", _perPage: "13" };
			const mockResponse = {
				header: vi.fn(),
				send: vi.fn(),
			} as unknown as Response;

			const mockResult = {
				data: [
					{ id: 1, name: "Accueil" },
					{ id: 2, name: "Logo" },
				],
				total: 2,
			};

			vi.spyOn(tagsService, "findAll").mockResolvedValue(mockResult);

			await tagsController.findAll(mockQuery, mockResponse);

			expect(tagsService.findAll).toHaveBeenCalledWith(mockQuery);
			expect(mockResponse.header).toHaveBeenCalledWith("Content-Range", "2");
			expect(mockResponse.header).toHaveBeenCalledWith(
				"Access-Control-Expose-Headers",
				"Content-Range",
			);
			expect(mockResponse.send).toHaveBeenCalledWith(mockResult.data);
		});
	});
});
