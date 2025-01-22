import { ConflictException, UnauthorizedException } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, type TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InstitutesService } from "../../admin/institutes/institutes.service";
import { UnitsService } from "../../admin/units/units.service";
import { AuthService } from "../../common/auth/auth.service";
import { MailService } from "../../common/mail/mail.service";
import { RedisService } from "../../common/redis/redis.service";
import configFunction from "../../config";
import { UserSettingsService } from "../../front/user-settings/user-settings.service";
import { PrismaService } from "../../prisma/prisma.service";
import { JanusAccountService } from "../accounts/accounts.service";
import { JanusAlertService } from "./alert.service";
import { JanusAuthController } from "./auth.controller";

class MailServiceMock {
	sendMail = vi.fn();
}

describe("JanusAuthController", () => {
	let janusAuthController: JanusAuthController;
	let redisService: RedisService;
	let authService: AuthService;
	let janusAccountService: JanusAccountService;
	let unitService: UnitsService;
	let mailService: MailServiceMock;
	let jwt: JwtService;
	let instituteService: InstitutesService;

	describe("loginRenater", () => {
		beforeEach(async () => {
			const janusAuth: TestingModule = await Test.createTestingModule({
				imports: [
					ConfigModule.forRoot({
						ignoreEnvFile: true,
						load: [configFunction],
						isGlobal: true,
					}),
				],
				controllers: [JanusAuthController],
				providers: [
					PrismaService,
					AuthService,
					JanusAccountService,
					{
						provide: RedisService,
						useValue: {
							getAsync: vi.fn().mockResolvedValue("testToken"),
							setAsync: vi.fn().mockResolvedValue("OK"),
							redis: {
								get: vi.fn().mockResolvedValue("testToken"),
								set: vi.fn().mockResolvedValue("OK"),
								isOpen: true,
							},
						},
					},
					InstitutesService,
					UnitsService,
					JanusAlertService,
					{
						provide: JwtService,
						useValue: {
							sign: vi.fn().mockReturnValue("testToken"),
						},
					},
					{
						provide: MailService,
						useClass: MailServiceMock,
					},
					UserSettingsService,
				],
			}).compile();

			janusAuthController =
				janusAuth.get<JanusAuthController>(JanusAuthController);
			redisService = janusAuth.get<RedisService>(RedisService);
			authService = janusAuth.get<AuthService>(AuthService);
			janusAccountService =
				janusAuth.get<JanusAccountService>(JanusAccountService);
			mailService = janusAuth.get<MailServiceMock>(MailService);
			jwt = janusAuth.get<JwtService>(JwtService);
			unitService = janusAuth.get<UnitsService>(UnitsService);
			instituteService = janusAuth.get<InstitutesService>(InstitutesService);
		});

		describe("loginRenater", () => {
			it("should set token and save header token in redis corresponding to janusAccount equal to header uid", async () => {
				const redisServiceMock = vi.fn().mockResolvedValue("OK");
				redisService.setAsync = redisServiceMock;

				const req = {
					header: vi.fn().mockImplementation((headerName) => {
						const headers = {
							cookie: "_shibsession_id=_sessionid",
							sn: "marmelab",
							givenname: "developer",
							mail: "developer@marmelab.com",
							o: "CNRS",
							uid: "tester.10",
							ou: "TEST",
							"shib-authentication-instant": "2025-01-01T00:00:00Z",
						};
						return headers[headerName];
					}),
					headers: {
						"shib-authentication-instant": "2025-01-01T00:00:00Z",
					},
				};
				const res = {
					cookie: vi.fn(),
					redirect: vi.fn(),
				};

				await janusAuthController.loginRenater(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					req as any,
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					res as any,
					"https://bib.cnrs.fr",
				);

				expect(res.redirect).toHaveBeenCalledWith("https://bib.cnrs.fr");
			});

			it("authorization token with session if called with header.ou UMR746 and no user corresponds to uid creating corresponding user", async () => {
				const req = {
					header: vi.fn().mockImplementation((headerName) => {
						const headers = {
							uid: "will",
							sn: "doe",
							givenname: "will",
							mail: "will@doe.com",
							"shib-authentication-instant": "2016-02-09T13:14:13.454Z",
							o: "CNRS",
							ou: "UMR746",
							cookie: "pll_language=fr; _shibsession_123=456",
							domains: ["INSHS", "INSB"],
						};
						return headers[headerName];
					}),
					headers: {
						"shib-authentication-instant": "2016-02-09T13:14:13.454Z",
					},
				};
				const res = {
					cookie: vi.fn(),
					redirect: vi.fn(),
				};

				await janusAuthController.loginRenater(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					req as any,
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					res as any,
					"http://bib.cnrs.fr",
				);

				expect(res.redirect).toHaveBeenCalledWith("http://bib.cnrs.fr");

				const will = await janusAccountService.findOneByUid("will");

				expect(will.uid).toBe("will");
				expect(will.name).toBe("doe");
				expect(will.firstname).toBe("will");
				expect(will.mail).toBe("will@doe.com");
				expect(will.cnrs).toBe(true);
				expect(will.last_connexion).toEqual(
					new Date("2016-02-09T00:00:00.000Z"),
				);
				expect(will.primary_institute).toBeNull();
				expect(will.domains).toEqual([]);

				const primaryUnit = await unitService.findOneByCode("UMR746");
				expect(will.primary_unit).toBe(primaryUnit.id);
				expect(will.additional_institutes).toEqual([]);
				expect(will.additional_units).toEqual([]);
			});

			it("should create received refscientificoffice as institute if it does not exist and assign it to the janusAccount", async () => {
				const req = {
					header: vi.fn().mockImplementation((headerName) => {
						const headers = {
							uid: "will",
							sn: "doe",
							givenname: "will",
							mail: "will@doe.com",
							refscientificoffice: "66->Marmelab",
							cookie: "pll_language=fr; _shibsession_123=456",
						};
						return headers[headerName];
					}),
					headers: {
						"shib-authentication-instant": "2016-02-09T13:14:13.454Z",
					},
				};
				const res = {
					cookie: vi.fn(),
					redirect: vi.fn(),
				};

				await janusAuthController.loginRenater(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					req as any,
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					res as any,
					"http://bib.cnrs.fr",
				);

				expect(res.redirect).toHaveBeenCalledWith("http://bib.cnrs.fr");

				const newInstitute = await instituteService.findOneByCode("66");

				expect(newInstitute.code, "66");

				const updatedUser = await janusAccountService.findOneByUid("will");
				expect(updatedUser.primary_institute, newInstitute.code);
			});

			it("should create received 'ou' as unit if it does not exist and assign it to the janusAccount", async () => {
				const req = {
					header: vi.fn().mockImplementation((headerName) => {
						const headers = {
							uid: "will",
							sn: "doe",
							givenname: "will",
							mail: "will@doe.com",
							refscientificoffice: "66->Marmelab",
							ou: "UMR746",
							cookie: "pll_language=fr; _shibsession_123=456",
						};
						return headers[headerName];
					}),
					headers: {
						"shib-authentication-instant": "2016-02-09T13:14:13.454Z",
					},
				};
				const res = {
					cookie: vi.fn(),
					redirect: vi.fn(),
				};

				await janusAuthController.loginRenater(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					req as any,
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					res as any,
					"http://bib.cnrs.fr",
				);

				expect(res.redirect).toHaveBeenCalledWith("http://bib.cnrs.fr");

				const newUnit = await unitService.findOneByCode("UMR746");

				expect(newUnit.code).toBe("UMR746");

				const updatedUser = await janusAccountService.findOneByUid("will");
				expect(updatedUser.primary_unit, newUnit.code);
			});

			it("should redirect with no domain if user does not exist and has no institute nor unit", async () =>
				async () => {
					const req = {
						header: vi.fn().mockImplementation((headerName: string) => {
							const headers = {
								uid: "johndoe",
								sn: "doe",
								givenname: "john",
								mail: "john@doe.com",
								cookie: "pll_language=fr; _shibsession_123=456",
							};
							return headers[headerName];
						}),
						headers: {
							"shib-authentication-instant": "2016-02-09T13:14:13.454Z",
						},
					};

					const res = {
						cookie: vi.fn(),
						redirect: vi.fn(),
					};

					vi.spyOn(janusAccountService, "findOneByUid").mockResolvedValue(null);

					await janusAuthController.loginRenater(
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						req as any,
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						res as any,
						"http://bib.cnrs.fr",
					);

					expect(res.redirect).toHaveBeenCalledWith("http://bib.cnrs.fr");
					expect(janusAccountService.findOneByUid).toHaveBeenCalledWith(
						"johndoe",
					);
				});

			it("should return 401 if header does not contain an uid", async () => {
				const header = {
					givenname: "will",
					sn: "doe",
					mail: "will@doe.com",
					cookie: "pll_language=fr; _shibsession_123=456",
				};

				const req = {
					header: vi
						.fn()
						.mockImplementation((headerName: string) => header[headerName]),
					headers: {},
				};

				const res = {
					status: vi.fn().mockReturnValue({
						send: vi.fn(),
					}),
					redirect: vi.fn(),
				};

				vi.spyOn(janusAuthController, "loginRenater").mockImplementation(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					async (req: any, res: any, url: string) => {
						const uid = req.header("uid");
						if (!uid) {
							res.status(401).send({ message: "Unauthorized" });
							throw new UnauthorizedException();
						}
					},
				);

				try {
					await janusAuthController.loginRenater(
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						req as any,
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						res as any,
						"http://bib.cnrs.fr",
					);
				} catch (error) {
					expect(error).toBeInstanceOf(UnauthorizedException);
				}

				expect(res.status).toHaveBeenCalledWith(401);
				expect(res.status().send).toHaveBeenCalledWith(
					expect.objectContaining({ message: "Unauthorized" }),
				);
			});

			it("should return 401 if header does not contain a givenname", async () => {
				const header = {
					uid: "will",
					sn: "doe",
					mail: "will@doe.com",
					cookie: "pll_language=fr; _shibsession_123=456",
				};

				const req = {
					header: vi
						.fn()
						.mockImplementation((headerName: string) => header[headerName]),
					headers: {},
				};

				const res = {
					status: vi.fn().mockReturnValue({ send: vi.fn() }),
					redirect: vi.fn(),
				};

				vi.spyOn(janusAuthController, "loginRenater").mockImplementation(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					async (req: any, res: any, url: string) => {
						const givenname = req.header("givenname");
						if (!givenname) {
							res.status(401).send({ message: "Unauthorized" });
							throw new UnauthorizedException();
						}
					},
				);

				try {
					await janusAuthController.loginRenater(
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						req as any,
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						res as any,
						"http://bib.cnrs.fr",
					);
				} catch (error) {
					expect(error).toBeInstanceOf(UnauthorizedException);
				}

				expect(res.status).toHaveBeenCalledWith(401);
				expect(res.status().send).toHaveBeenCalledWith(
					expect.objectContaining({ message: "Unauthorized" }),
				);
			});

			it("should return 401 if header does not contain a sn", async () => {
				const header = {
					uid: "will",
					givenname: "will",
					mail: "will@doe.com",
					cookie: "pll_language=fr; _shibsession_123=456",
				};

				const req = {
					header: vi
						.fn()
						.mockImplementation((headerName: string) => header[headerName]),
					headers: {},
				};

				const res = {
					status: vi.fn().mockReturnValue({ send: vi.fn() }),
					redirect: vi.fn(),
				};

				vi.spyOn(janusAuthController, "loginRenater").mockImplementation(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					async (req: any, res: any, url: string) => {
						const sn = req.header("sn");
						if (!sn) {
							res.status(401).send({ message: "Unauthorized" });
							throw new UnauthorizedException();
						}
					},
				);

				try {
					await janusAuthController.loginRenater(
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						req as any,
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						res as any,
						"http://bib.cnrs.fr",
					);
				} catch (error) {
					expect(error).toBeInstanceOf(UnauthorizedException);
				}

				expect(res.status).toHaveBeenCalledWith(401);
				expect(res.status().send).toHaveBeenCalledWith(
					expect.objectContaining({ message: "Unauthorized" }),
				);
			});

			it("should return 401 if header does not contain a mail", async () => {
				const header = {
					uid: "will",
					givenname: "will",
					sn: "doe",
					cookie: "pll_language=fr; _shibsession_123=456",
				};

				const req = {
					header: vi
						.fn()
						.mockImplementation((headerName: string) => header[headerName]),
					headers: {},
				};

				const res = {
					status: vi.fn().mockReturnValue({ send: vi.fn() }),
					redirect: vi.fn(),
				};

				vi.spyOn(janusAuthController, "loginRenater").mockImplementation(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					async (req: any, res: any, url: string) => {
						const mail = req.header("mail");
						if (!mail) {
							res.status(401).send({ message: "Unauthorized" });
							throw new UnauthorizedException();
						}
					},
				);

				try {
					await janusAuthController.loginRenater(
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						req as any,
						// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						res as any,
						"http://bib.cnrs.fr",
					);
				} catch (error) {
					expect(error).toBeInstanceOf(UnauthorizedException);
				}

				expect(res.status).toHaveBeenCalledWith(401);
				expect(res.status().send).toHaveBeenCalledWith(
					expect.objectContaining({ message: "Unauthorized" }),
				);
			});
		});

		describe("postGetLogin", () => {
			it("should throw UnauthorizedException if origin is not 'janus'", async () => {
				const req = {
					user: { origin: "other" },
				};

				await expect(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					janusAuthController.postGetLogin(req as any),
				).rejects.toThrow(UnauthorizedException);
			});

			it("should throw ConflictException if token is not found in Redis", async () => {
				const req = {
					user: { origin: "janus", shib: "fake-shib-id" },
				};
				vi.spyOn(redisService, "getAsync").mockResolvedValue(null);

				await expect(
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					janusAuthController.postGetLogin(req as any),
				).rejects.toThrow(ConflictException);
			});
		});
	});
});
