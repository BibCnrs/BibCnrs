import { Body, Controller, DefaultValuePipe, Post } from "@nestjs/common";

@Controller("ebsco/retrieve_ris")
export class EbscoRisController {
	@Post()
	async retrieveRis(@Body("links", new DefaultValuePipe([])) links: string[]) {
		return Promise.all(
			links.map((link) => fetch(link).then((response) => response.text())),
		);
	}
}
