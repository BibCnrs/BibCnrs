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
	CreateInistAccountDto,
	UpdateInistAccountDto,
} from "./dto/inist-account.dto";
import { InistAccountsService } from "./inist-accounts.service";

@Controller("admin/inistAccounts")
@UseGuards(AdminAuthenticationGuard)
export class InistAccountsController {
	constructor(private readonly inistAccountsService: InistAccountsService) {}

	@Get()
	async findAll(@Query() query: FindAllQueryArgs, @Res() res: Response) {
		if (!query || query._perPage !== "100000") {
			const { data, total } = await this.inistAccountsService.findAll(query);
			res.header("Content-Range", `${total}`);
			res.header("Access-Control-Expose-Headers", "Content-Range");
			return res.send(data);
		}

		const data = await this.inistAccountsService.findAllExport();
		res.header("Content-Range", `${data.length}`);
		res.header("Access-Control-Expose-Headers", "Content-Range");
		return res.send(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		const data = await this.inistAccountsService.findOne(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Post()
	async create(@Body() createInistAccountDto: CreateInistAccountDto) {
		const data = await this.inistAccountsService.create(createInistAccountDto);
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
		@Body() updateInistAccountDto: UpdateInistAccountDto,
	) {
		const data = await this.inistAccountsService.update(
			id,
			updateInistAccountDto,
		);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Delete(":id")
	async remove(@Param("id") id: number) {
		const data = await this.inistAccountsService.remove(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}
}
