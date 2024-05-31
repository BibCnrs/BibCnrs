import { HttpException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { SectionsCNController } from "./sectionsCN.controller";
import { SectionsCNService } from "./sectionsCN.service";

describe("SectionsCNController", () => {
	let sectionsCNController: SectionsCNController;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			controllers: [SectionsCNController],
			providers: [SectionsCNService, PrismaService],
		}).compile();

		sectionsCNController =
			testingModule.get<SectionsCNController>(SectionsCNController);
	});

	describe("root", () => {
		test("should return list of section cn", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await sectionsCNController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						code: "A",
						name: "Section A",
					}),
					expect.objectContaining({
						code: "B",
						name: "Section B",
					}),
				]),
			);
		});

		test("should return a single sectionCN", async () => {
			const data = await sectionsCNController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				code: "B",
				name: "Section B",
				comment: null,
				primary_institutes: [],
				secondary_institutes: [],
			});
		});

		test("should create a new section cn, update it and delete it", async () => {
			const randomCode = `sectionCN-${Math.floor(Math.random() * 1000)}`;

			const createdSectionCN = await sectionsCNController.create({
				code: randomCode,
				name: randomCode,
				comment: null,
			});

			expect(createdSectionCN).toEqual(
				expect.objectContaining({
					code: randomCode,
					name: randomCode,
				}),
			);

			const updatedSectionCN = await sectionsCNController.update(
				createdSectionCN.id,
				{
					...createdSectionCN,
					code: "updatedCode",
				},
			);

			expect(updatedSectionCN).toEqual(
				expect.objectContaining({
					code: "updatedCode",
				}),
			);

			await sectionsCNController.remove(updatedSectionCN.id);

			await expect(
				sectionsCNController.findOne(updatedSectionCN.id),
			).rejects.toThrow(HttpException);
		});
	});
});
