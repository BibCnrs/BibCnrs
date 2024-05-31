import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	Query,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AdminAuthenticationGuard } from "../admin-authentication/admin-authentication.guard";
import { FindAllQueryArgs } from "../admin.type";
import {
	CreateJanusAccountDto,
	UpdateJanusAccountDto,
} from "./dto/janus-account.dto";
import { JanusAccountsService } from "./janus-accounts.service";

@Controller("admin/janusAccounts")
@UseGuards(AdminAuthenticationGuard)
export class JanusAccountsController {
	constructor(private readonly janusAccountsService: JanusAccountsService) {}

	@Get()
	async findAll(@Query() query: FindAllQueryArgs, @Res() res: Response) {
		if (!query || query._perPage !== "100000") {
			const { data, total } = await this.janusAccountsService.findAll(query);
			res.header("Content-Range", `${total}`);
			res.header("Access-Control-Expose-Headers", "Content-Range");
			return res.send(data);
		}

		const data = await this.janusAccountsService.findAllExport();
		res.header("Content-Range", `${data.length}`);
		res.header("Access-Control-Expose-Headers", "Content-Range");
		return res.send(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		const data = await this.janusAccountsService.findOne(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Post()
	async create(@Body() createJanusAccountDto: CreateJanusAccountDto) {
		const data = await this.janusAccountsService.create(createJanusAccountDto);
		if (!data) {
			throw new HttpException(
				"INTERNAL SERVER ERROR",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}

		return data;
	}

	@Put(":id")
	async update(
		@Param("id") id: number,
		@Body() updateJanusAccountDto: UpdateJanusAccountDto,
	) {
		const data = await this.janusAccountsService.update(
			id,
			updateJanusAccountDto,
		);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Delete(":id")
	async remove(@Param("id") id: number) {
		const data = await this.janusAccountsService.remove(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}
}
