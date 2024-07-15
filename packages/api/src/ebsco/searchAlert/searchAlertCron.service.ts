import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Prisma, community, history } from "@prisma/client";
import remove from "lodash.remove";
import { SendMailOptions } from "nodemailer";
import { FileLogger } from "../../common/logger/FileLogger";
import { MailService } from "../../common/mail/mail.service";
import { Config } from "../../config";
import { JanusAccountService } from "../../janus/accounts/accounts.service";
import { PrismaService } from "../../prisma/prisma.service";
import { EbscoDomainService } from "../domain/domain.service";
import { EbscoSearchArticleService } from "../search/searchArticle.service";
import {
	OALink,
	fieldLabel,
	getFacetsHtml,
	getFacetsText,
	getLimitersHtml,
	getLimitersText,
	getRecordText,
	getResultsIdentifiers,
	parseArticleLinks,
} from "./searchAlert.utils";

const logger = new FileLogger("alerte.log", "EbscoSearchAlertCronService");

@Injectable()
export class EbscoSearchAlertCronService {
	private readonly services: Config["services"];

	constructor(
		private readonly configService: ConfigService,
		private readonly prismaService: PrismaService,
		private readonly janusAccountService: JanusAccountService,
		private readonly ebscoDomainService: EbscoDomainService,
		private readonly ebscoSearchArticleService: EbscoSearchArticleService,
		private readonly mailService: MailService,
	) {
		this.services = this.configService.get("services");
	}

	private getQueryFromHistory(history: history | null) {
		if (!history) {
			return null;
		}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const { queries, activeFacets, limiters } = history.event as any;

		return history
			? {
					queries,
					activeFacets,
					...limiters,
					resultsPerPage: 100,
				}
			: null;
	}

	async createTestAlert(janusUserUid: string) {
		const communities = await this.ebscoDomainService.getCommunities();
		const domains = communities.map((community) => community.name);

		const janusUser = await this.janusAccountService.findOneByUid(janusUserUid);
		if (!janusUser) {
			throw new Error(`User not found for uid=${janusUserUid}`);
		}

		const histories = await this.prismaService.history.findMany({
			where: { user_id: janusUser.id.toString() },
		});

		return Promise.all(
			histories.map(async (history) => {
				try {
					// biome-ignore lint/suspicious/noExplicitAny: <explanation>
					const event = history.event as any;

					const query = this.getQueryFromHistory(history);
					const searchResult =
						await this.ebscoSearchArticleService.searchArticleRaw(
							{
								username: "guest",
								domains,
							},
							query,
							event.domain,
						);

					const identifiers = getResultsIdentifiers(searchResult)?.slice?.(3);
					if (!identifiers) {
						return Promise.resolve();
					}

					return this.prismaService.$queryRaw`
            UPDATE history SET 
            has_alert = true, 
            frequence = '1 day',
            last_results = CAST(${JSON.stringify(identifiers)} AS json),
            last_execution = ${new Date(0)},
            nb_results = ${
							searchResult.SearchResult.Statistics.TotalHits - 3 > 0
								? searchResult.SearchResult.Statistics.TotalHits - 3
								: 0
						},
            active = true
            WHERE id = ${history.id}`;
				} catch (e) {
					logger.error(
						`Error while creating test alert for history(id=${history.id}) error="${e}"`,
					);
					return Promise.resolve();
				}
			}),
		);
	}

	private async countAlertToExecute(date: string) {
		const results = await this.prismaService.$queryRaw<
			{
				count: string;
			}[]
		>`SELECT count(*) FROM history WHERE last_execution + frequence <= ${date}::date AND has_alert IS true AND active IS true`;

		return Number.parseInt(results.at(0).count ?? "0", 10);
	}

	async handleSearchAlertCron() {
		const communities = await this.ebscoDomainService.getCommunities();
		const domains = communities.map((community) => community.name);
		const communitiesByName: Record<string, community> = communities.reduce(
			// biome-ignore lint/performance/noAccumulatingSpread: <explanation>
			(acc, c) => ({ ...acc, [c.name]: c }),
			{},
		);

		const dateIso = new Date().toISOString().slice(0, 19).replace("T", " ");
		const alertToExecute = await this.countAlertToExecute(dateIso);
		if (alertToExecute === 0) {
			logger.log(`No alert to execute after ${dateIso}`);
			return;
		}

		const LIMIT = 10;
		const pages = Math.floor(alertToExecute / LIMIT);
		let mailsSent = 0;
		let updatedAlerts = 0;
		let testedAlerts = 0;
		for (let i = 0; i <= pages; i++) {
			logger.log(
				`Sending alert from ${10 * i} to ${10 * (i + 1)} on ${alertToExecute}`,
			);

			const histories = await this.selectAlertToExecute(dateIso, LIMIT);
			try {
				for await (let {
					event,
					id,
					nb_results,
					last_results,
					user_id,
				} of histories) {
					if (
						event == null ||
						typeof event !== "object" ||
						Array.isArray(event) ||
						typeof event.domain !== "string"
					) {
						logger.warn(
							`Alert event not valid for history(id=${id}, event=${JSON.stringify(event)})`,
						);
						continue;
					}

					const { queries, limiters, activeFacets, domain } = event;

					try {
						if (typeof last_results === "string") {
							last_results = JSON.parse(last_results);
						}
						testedAlerts++;

						if (!Array.isArray(last_results)) {
							throw new Error("last_results is not an array");
						}

						logger.log(
							`Alert for history(id=${id}, event=${JSON.stringify({
								queries,
								limiters,
								activeFacets,
								domain,
							})}`,
						);

						const token = { username: "guest", domains };
						const community = communitiesByName[domain];
						const result =
							await this.ebscoSearchArticleService.searchArticleRaw(
								token,
								{
									queries,
									limiters,
									activeFacets,
									resultsPerPage: 1,
								},
								domain,
							);

						const newTotalHits =
							result?.SearchResult?.Statistics?.TotalHits ?? 0;

						if (nb_results === newTotalHits) {
							logger.log(
								`No new results for history(id=${id}, nb_results=${nb_results}, newTotalHits=${newTotalHits})`,
							);

							await this.updateHistory(id, {
								last_execution: new Date(),
							});

							updatedAlerts++;
							continue;
						}

						const fullResult =
							await this.ebscoSearchArticleService.searchArticleRaw(
								token,
								{
									queries,
									limiters,
									activeFacets,
									resultsPerPage: 100,
								},
								domain,
							);

						logger.log(
							`Retrieved results for history(id=${id}, length=${fullResult?.SearchResult?.Data?.Records?.length})`,
						);

						const newRawRecords = this.getMissingResults(
							fullResult,
							last_results,
						);

						if (!newRawRecords.length) {
							logger.log(`No new records for history(id=${id})`);

							await this.updateHistory(id, {
								last_execution: new Date(),
							});

							updatedAlerts++;
							continue;
						}

						logger.log(
							`${newRawRecords.length} new results found for history(id=${id})`,
						);

						const newRecords = await Promise.all(
							newRawRecords.map((record) =>
								this.ebscoSearchArticleService.searchArticleParser(
									record,
									domain,
								),
							),
						);

						const notices = await Promise.all(
							newRecords.map(({ an, dbId }) =>
								this.ebscoSearchArticleService.retrieveArticle(
									token,
									domain,
									dbId,
									an,
								),
							),
						);

						const records = newRecords.map((record, index) => ({
							...record,
							articleLinks: notices[index].articleLinks,
						}));

						const { mail } = await this.janusAccountService.findOneById(
							Number.parseInt(user_id, 10),
						);

						const mailData = await this.getSearchAlertMail(
							records,
							community.gate,
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
							queries as any[],
							community.name,
							limiters,
							activeFacets,
							mail,
							user_id,
						);

						await this.mailService.sendMail(mailData);
						mailsSent++;

						await this.updateHistory(id, {
							last_results: getResultsIdentifiers(fullResult),
							nb_results: fullResult.SearchResult.Statistics.TotalHits,
							last_execution: new Date(),
						});
						updatedAlerts++;
					} catch (e) {
						await this.updateHistory(id, {
							last_execution: new Date(),
						});

						updatedAlerts++;

						logger.error(
							`Alert failed for history(id=${id}, event=${JSON.stringify({
								queries,
								limiters,
								activeFacets,
								domain,
							})}, error="${e}"`,
						);
					}
				}
			} catch (e) {
				logger.error(`Error while executing batch error="${e}"`);
			}

			logger.log(
				`Batch done testedAlerts=${testedAlerts}, updatedAlerts=${updatedAlerts}, mailsSent=${mailsSent}`,
			);
		}
	}

	async updateHistory(id: number, data: Partial<history>) {
		await this.prismaService.history.update({
			where: { id },
			data,
		});
	}

	selectAlertToExecute(date: string, limit: number) {
		return this.prismaService.$queryRawUnsafe<
			(history & { frequence: string })[]
		>(
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
			WHERE last_execution + frequence <= $1::date 
			AND has_alert IS true 
			AND active IS true 
			LIMIT $2
		`,
			date,
			limit,
		);
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	private getMissingResults(result1: any, ids2: any[]) {
		const ids1 =
			getResultsIdentifiers(result1).map?.((id, index) => ({
				...id,
				index,
			})) ?? [];

		const ids = ids1.filter(
			({ dbId: dbId1, an: an1 }) =>
				!ids2.find(
					({ dbId: dbId2, an: an2 }) => dbId1 === dbId2 && an1 === an2,
				),
		);

		return ids.map(
			({ index }) => result1?.SearchResult?.Data?.Records?.[index],
		);
	}

	async getSearchAlertMail(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		records: any[],
		gate: string,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		queries: any[],
		domain: string,
		limiters: Prisma.JsonValue,
		activeFacets: Prisma.JsonValue,
		mail: string,
		user_id: string,
	): Promise<SendMailOptions> {
		return {
			from: this.mailService.from,
			to: mail,
			subject: `Alerte : ${records.length} nouveau(x) résultat(s) pour votre recherche BibCnrs`,
			html: await this.getSearchAlertMailHtml(
				records,
				gate,
				queries,
				domain,
				limiters,
				activeFacets,
				user_id,
			),
			text: this.getSearchAlertMailText(
				records,
				gate,
				queries,
				domain,
				limiters,
				activeFacets,
			),
		};
	}
	getSearchAlertMailText(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		records: any[],
		gate: string,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		queries: any[],
		domain: string,
		limiters: Prisma.JsonValue,
		activeFacets: Prisma.JsonValue,
	) {
		return `${records.length} nouveau(x) résultat(s) est(sont) disponible(s) concernant votre recherche :
	
	Termes recherchés :
		${queries
			.map((q) => `${fieldLabel[q.field ?? "ALL"] || q.field}: ${q.term}`)
			.join(", ")}
	
	Domaine :
		${domain}
	
	${getLimitersText(limiters)}
	
	${getFacetsText(activeFacets)}
	
	${records.map((record) => getRecordText(record, gate)).join("\n\n")}`;
	}

	async getSearchAlertMailHtml(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		records: any[],
		gate: string,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		queries: any[],
		domain: string,
		limiters: Prisma.JsonValue,
		activeFacets: Prisma.JsonValue,
		user_id: string,
	) {
		const elements = [];
		for (const record of records) {
			elements.push(await this.getRecordHtml(record, gate, user_id));
		}
		return `<div  style="box-sizing: border-box;">
        <p>${records.length} nouveau(x) résultat(s) est(sont) disponible(s) concernant votre recherche : </p>
        <dl style="display: flex; flex-direction: column; margin: 0px 20px 20px; padding: 5px 20px 5px 20px;">
            <dt style="font-weight: bold;">Termes recherchés :</dt>
            <dd style="flex: 9;">${queries
							.map(
								(q) => `${fieldLabel[q.field ?? "ALL"] || q.field}: ${q.term}`,
							)
							.join(", ")}</dd>
            <dt style="font-weight: bold;">Domaine</dt>
            <dd style="flex: 9;">${domain}</dd>
            ${getLimitersHtml(limiters)}
            ${getFacetsHtml(activeFacets)}
        </dl>
        <table class="record_list" style="box-sizing: border-box; margin-top: 0; border-collapse: collapse;">
            <tbody>
                ${elements.join("")}
            </tbody>
        </table>
    </div>`;
	}

	async getRecordHtml(record, gate, user_id) {
		const { id, doi, title, publicationType, authors, source, articleLinks } =
			record;
		const type = publicationType ? `[${publicationType}]` : "";
		const links = parseArticleLinks(articleLinks, gate);

		let oaLink = null;
		// get url for title
		let [accessUrl] = remove(links, (link) => /open access/i.test(link.name));
		if (!accessUrl) {
			[accessUrl] = remove(links, (link) => /unpaywalleds/i.test(link.name));
		}
		if (!oaLink) {
			if (!accessUrl) {
				[accessUrl] = remove(links, (link) =>
					/texte intégral/i.test(link.name),
				);
			}
			if (!accessUrl) {
				[accessUrl] = remove(links, (link) =>
					/url d'accès|access url|online access/i.test(link.name),
				);
			}
			if (!accessUrl) {
				[accessUrl] = remove(links, (link) =>
					/disponibilite|availability/i.test(link.name),
				);
			}
			if (!accessUrl) {
				[accessUrl] = remove(links, { name: "Accès au pdf" });
			}

			if (accessUrl) {
				oaLink = OALink({
					apiUrl: `${this.services.apiEndpoint}/ebsco`,
					url: accessUrl.url,
					doi,
					domain: gate,
					name: accessUrl.name,
					user_id,
				});
			} else if (links && links.length > 0) {
				oaLink = {
					url: links[0].url,
				};
			}
		}

		// format oa link already formatted
		if (
			oaLink?.url?.includes("ebsco/oa?") &&
			oaLink.url.includes("sid=unpaywall")
		) {
			oaLink = {
				url: `${oaLink.url.replace(
					"ebsco/oa?",
					"ebsco/oa_database?",
				)}&user_id=${user_id}`,
				OA: true,
			};
		}

		return `<tr style="box-sizing: border-box; font-size: 13px; line-height: 1em;">
				<td class="record" style="box-sizing: border-box; margin: 0px 20px 20px; padding: 5px 20px 5px 20px;">
					<div style="background-color: #f8f8f8; padding: 5px 20px 20px;">
						<h4 class="title">
							${
								oaLink
									? `<a href="${oaLink.url}" style="
									text-decoration: none;
									background-color: #f8f8f8;
									box-sizing: border-box;
									font-family: inherit;
									font-weight: 500;
									line-height: 1.1;
									margin-top: 10px;
									margin-bottom: 10px;
									font-size: 18px;
									color: #6941EB;">
									${id}. ${title} ${type}</a>`
									: `${id}. ${title} ${type} - Pas d'accès pour cet article`
							}
							${
								oaLink && oaLink.OA === true
									? `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAYAAAAlBadpAAADGklEQVQ4T5VUTWgTURB+s9s22UURkk2jpVgFEVIs+FPEg/EmevDiwR9EhWKxFRHqDz3UJGo2LUgLtpWi1epBe7GCehHPWhGt9iCFWrxYixRtkoqX7CbNvnHerkk2qUV8p83MfG+++d6XAVZxcLhONX/kjjHAPchYCBibAYRxT7BmFNrmM+5yypWO0RMIs7w1SqD1lZcyBvNQJR1VupLjhVwRnEtozRbHl8hQtZMASYZsjgGrZ4hBO8Qgg5K8V40svHF+/zmG7p9GxBAAZCl40RtNDxVzca2VMRwQF9MFM0osHSqCTT2wn6P1wukodarRVG8lbTOhtXPOb4m4DHDQE00/szubcf91zrCTbjW9qxQfXPhmLBMSr0pmYnARka2hkQbUaLrDBhtx3zCJdJraTqqxdPNysZxIJu7/QPR3EOiOEltsc8CkMuTFvJgiOk/+C7xScWX8r50LRaQ2kHinGOMnaYxwIU706G2lBwh4hp5texltm3piXQNi7iklt/2LSRkYe4O1prk0QUo2OECYJwc8lhCmOWAjmeUQCVXnYlISLKP7xpwCgYObSv3qTmiZNYvjDG7yGL9+9hKrc3YJY89J7QOQ7Q5usaylKQcHo0o0fWIl2uTCh6TLcZGX5eomMHQtjsijIqBU1dRC1/ek+DZ1rY0j7pMkfOWNLPaLGPasDRj53ILTSNIJ7HtEsx52G6TMrjYN+YgaS46Jr+JzARuDjO5/R7PsLAMnfB2csxsl+lK/Gkudd4Op9QQYCd9d5KyVRJglETaKgmyPr5Hn4b39LwIwZIRwTSw1KXJk5S/kgQ0gsREyhZiN37bnkOSwEkm+ti/Q/SHyTJgsO06W/WQDE4HdyC17GUggtQP21WlmJvvV6cKmvLXeXZXrxhZLrKcF8y3p0ySWglf1NDh/DN1/mZ4g4ajIpugdzrrXjb2eLGtIAJ0aiNCTdrs2iTZCT0a+dg4l5pBBEhgG3DuNnuieEk3RZnGtIUcM7RoRvFTcYyW57f1F5X1KLHXF1cBVIWYTRuBLLYC4lQTbTIJ9JgYfFbn6fsFABcRvaVl5WsqstqoAAAAASUVORK5CYII=" alt="OA" style="height: 16px; margin-left: 4px;" />`
									: ""
							}
						</h4>
						<span style="background-color: #f8f8f8; box-sizing: border-box;">
							<div style="background-color: #f8f8f8; box-sizing: border-box;">
								<div style="background-color: #f8f8f8; box-sizing: border-box;">
									<p style="background-color: #f8f8f8; box-sizing: border-box;orphans: 3;widows: 3;margin: 0 0 10px;">
										<span style="background-color: #f8f8f8; box-sizing: border-box;">
											${
												authors
													? authors.length > 5
														? authors.slice(0, 5).join("; ").concat("...")
														: authors.join("; ")
													: ""
											}
										</span>
									</p>
									<p style="background-color: #f8f8f8; box-sizing: border-box;orphans: 3;widows: 3;margin: 0 0 10px;">
										<span style="background-color: #f8f8f8; box-sizing: border-box;">${
											source || ""
										}</span> ${doi ? `DOI : ${doi}` : ""}
									</p>
								</div>
							</div>
						</span>
					</div>
				</td>
			</tr>`;
	}
}
