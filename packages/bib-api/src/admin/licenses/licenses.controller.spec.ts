import { HttpException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { LicensesController } from "./licenses.controller";
import { LicensesService } from "./licenses.service";

import { beforeEach, describe, expect, test, vi } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";

describe("LicensesController", () => {
	let licencesController: LicensesController;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			controllers: [LicensesController],
			providers: [LicensesService, PrismaService],
		}).compile();

		licencesController =
			testingModule.get<LicensesController>(LicensesController);
	});

	describe("root", () => {
		test("should return list of licences", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await licencesController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						name_fr: "Cadre d’utilisation",
						name_en: "Framework of Use",
						content_fr: "<p>Cadre d’utilisation</p>",
						content_en: "<p>Framework of use</p>",
						enable: true,
					}),
					expect.objectContaining({
						name_fr: "Test de licence",
						name_en: "License Test",
						content_fr: "<p>Test de licence</p>",
						content_en: "<p>License Test</p>",
						enable: true,
					}),
				]),
			);
		});

		test("should return a single licence", async () => {
			const data = await licencesController.findOne(1);
			expect(data).toStrictEqual({
				id: 1,
				name_fr: "Cadre d’utilisation",
				name_en: "Framework of Use",
				content_fr: "<p>Cadre d’utilisation</p>",
				content_en: "<p>Framework of use</p>",
				enable: true,
				common: false,
				pdf: null,
				license_community: [
					{
						license_id: 1,
						community_id: 1,
						community: {
							id: 1,
							name: "INSHS",
							gate: "inshs",
							user_id: "inshs_user_id",
							profile: "wsapi",
							password: "inshs_password",
							ebsco: true,
						},
					},
					{
						license_id: 1,
						community_id: 2,
						community: {
							id: 2,
							name: "INSB",
							gate: "insb",
							user_id: "insb_user_id",
							profile: "wsapi",
							password: "insb_password",
							ebsco: true,
						},
					},
				],
			});
		});

		test("should create a new admin user, update it and delete it", async () => {
			const randomName = `licence-${Math.floor(Math.random() * 1000)}`;

			const createdLicence = await licencesController.create({
				name_fr: randomName,
				name_en: randomName,
				content_fr: "<p>Test de licence</p>",
				content_en: "<p>License Test</p>",
				enable: true,
				common: true,
				pdf: { title: "title", src: "src" },
				license_community: [
					{
						community_id: 1,
					},
					{
						community_id: 2,
					},
				],
			});

			expect(createdLicence).toEqual(
				expect.objectContaining({
					name_fr: randomName,
					enable: true,
					common: true,
				}),
			);

			const updatedLicence = await licencesController.update(
				createdLicence.id,
				{
					...createdLicence,
					pdf: { title: "title", src: "src" },
					name_fr: "updatedName",
					license_community: [],
				},
			);

			expect(updatedLicence).toEqual(
				expect.objectContaining({
					name_fr: "updatedName",
					license_community: [],
				}),
			);

			await licencesController.remove(updatedLicence.id);

			await expect(
				licencesController.findOne(updatedLicence.id),
			).rejects.toThrow(HttpException);
		});
	});
});
