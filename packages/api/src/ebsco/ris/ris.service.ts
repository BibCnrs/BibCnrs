import { Injectable } from "@nestjs/common";
import { HttpService } from "../../common/http/http.service";
import { AppLogger } from "../../common/logger/AppLogger";
import { EbscoSearchArticleService } from "../search/searchArticle.service";
import { EbscoToken } from "../token/token.type";

@Injectable()
export class EbscoRisService {
	private readonly logger = new AppLogger(EbscoRisService.name);

	constructor(
		private readonly ebscoSearchArticleService: EbscoSearchArticleService,
		private readonly http: HttpService,
	) {}

	async retrieveRis(
		token: EbscoToken,
		communityName: string,
		exportType: string,
		links: string[],
	) {
		const risContents = await Promise.all(
			links.map(async (link) => {
				const anMatch = link.match(/AN=([^&]+)/);
				const dbidMatch = link.match(/dbcode=([^&]+)/);
				const an = anMatch ? anMatch[1] : null;
				const dbid = dbidMatch ? dbidMatch[1] : null;

				if (!an || !dbid) {
					return null;
				}

				try {
					const ris = await this.ebscoSearchArticleService.ebscoSearch(
						async (authToken, sessionToken) => {
							return this.ebscoSearchArticleService.ebscoRequest<string>(
								"/edsapi/rest/ExportFormat",
								{ format: "ris", an: an, dbid: dbid },
								authToken,
								sessionToken,
								"GET",
							);
						},
						token,
						communityName,
					);
					return ris.Data;
				} catch (error) {
					this.logger.error(
						`Erreur lors de la récupération RIS pour An=${an}&DbId=${dbid}`,
					);
					return null;
				}
			}),
		);
		return risContents.filter(Boolean) as string[];
	}
}
