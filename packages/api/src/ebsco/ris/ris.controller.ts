import { Body, Controller, DefaultValuePipe, Post } from "@nestjs/common";
import { HttpService } from "../../common/http/http.service";

@Controller("ebsco/retrieve_ris")
export class EbscoRisController {
	constructor(private readonly http: HttpService) {}

	@Post()
	async retrieveRis(@Body("links", new DefaultValuePipe([])) links: string[]) {
		return Promise.all(
			links.map((link) =>
				this.http.request(link).then((response) => response.data),
			),
		);
	}
}
