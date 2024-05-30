import { Body, Controller, DefaultValuePipe, Get } from "@nestjs/common";

@Controller("ebsco/retrieve_ris")
export class EbscoRisController {
	@Get()
	async retrieveRis(@Body("links", new DefaultValuePipe([])) links: string[]) {
		return Promise.all(
			links.map((link) => fetch(link).then((response) => response.text())),
		);
	}
}
