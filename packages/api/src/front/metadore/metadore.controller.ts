import {
	Controller,
	DefaultValuePipe,
	Get,
	HttpException,
	ParseIntPipe,
	Query,
} from "@nestjs/common";
import { FrontMetadoreService } from "./metadore.service";

@Controller("front/metadore")
export class FrontMetadoreController {
	constructor(private readonly frontMetadoreService: FrontMetadoreService) {}

	@Get("search")
	public async searchMetadore(
		@Query("queries") queries: string,
		@Query("resultsPerPage", new DefaultValuePipe(10), ParseIntPipe)
		resultsPerPage: number,
		@Query("currentPage", new DefaultValuePipe(1), ParseIntPipe)
		currentPage: number,
	) {
		try {
			return this.frontMetadoreService.metadoreRequest({
				queries,
				resultsPerPage,
				currentPage,
			});
		} catch (error) {
			if (error.statusCode && error.message) {
				return new HttpException(error.message, error.statusCode);
			}
			throw error;
		}
	}
}
