import { HttpException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import { Response } from "express";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { PrismaService } from "../../prisma/prisma.service";
import { UnitsController } from "./units.controller";
import { UnitsService } from "./units.service";

describe("UnitsController", () => {
	let unitsController: UnitsController;

	beforeEach(async () => {
		const testingModule: TestingModule = await Test.createTestingModule({
			controllers: [UnitsController],
			providers: [UnitsService, PrismaService],
		}).compile();

		unitsController = testingModule.get<UnitsController>(UnitsController);
	});

	describe("root", () => {
		test("should return list of units", async () => {
			const res = {
				header: vi.fn(),
				send: vi.fn(),
			};

			await unitsController.findAll({}, res as unknown as Response);
			expect(res.send).toHaveBeenCalledWith(
				expect.arrayContaining([
					expect.objectContaining({
						code: "A",
					}),
					expect.objectContaining({
						code: "B",
					}),
				]),
			);
		});

		test("should return a single unit", async () => {
			const data = await unitsController.findOne(2);
			expect(data).toStrictEqual({
				id: 2,
				code: "B",
				main_institute: null,
				name: null,
				nb_doctorant: null,
				nb_inist_account: 0,
				nb_janus_account: 1,
				nb_post_doctorant: null,
				nb_researcher_cnrs: null,
				nb_researcher_nocnrs: null,
				post_office_box: null,
				postal_code: null,
				sections_cn: [],
				street: null,
				town: null,
				unit_dr: null,
				active: true,
				body: null,
				building: null,
				cd_mail: null,
				cd_phone: null,
				ci_mail: null,
				ci_phone: null,
				comment: null,
				communities: [],
				correspondant_documentaire: null,
				correspondant_informatique: null,
				country: null,
				director_firstname: null,
				director_mail: null,
				director_name: null,
				implantation: null,
				institutes: [1],
			});
		});

		test("should create a new unit, update it and delete it", async () => {
			const randomCode = `unit-${Math.floor(Math.random() * 1000)}`;

			const createdUnit = await unitsController.create({
				code: "randomCode",
				main_institute: null,
				name: null,
				nb_doctorant: null,
				nb_post_doctorant: null,
				nb_researcher_cnrs: null,
				nb_researcher_nocnrs: null,
				post_office_box: null,
				postal_code: null,
				sections_cn: [],
				street: null,
				town: null,
				unit_dr: null,
				active: true,
				body: null,
				building: null,
				cd_mail: null,
				cd_phone: null,
				ci_mail: null,
				ci_phone: null,
				comment: null,
				communities: [],
				correspondant_documentaire: null,
				correspondant_informatique: null,
				country: null,
				director_firstname: null,
				director_mail: null,
				director_name: null,
				implantation: null,
				institutes: [1],
			});

			expect(createdUnit).toEqual(
				expect.objectContaining({
					code: "randomCode",
				}),
			);

			const updatedUnit = await unitsController.update(createdUnit.id, {
				...createdUnit,
				code: "updatedCode",
			});

			expect(updatedUnit).toEqual(
				expect.objectContaining({
					code: "updatedCode",
				}),
			);

			await unitsController.remove(updatedUnit.id);

			await expect(unitsController.findOne(updatedUnit.id)).rejects.toThrow(
				HttpException,
			);
		});
	});
});
