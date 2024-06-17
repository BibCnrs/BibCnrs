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
import { FindAllQueryArgs } from "../admin.type";
import { AdminAuthenticationGuard } from "../authentication/authentication.guard";
import { CreateTestNewsDto, UpdateTestNewsDto } from "./dto/test-news.dto";
import { TestsNewsService } from "./tests-news.service";

@Controller("admin/news")
@UseGuards(AdminAuthenticationGuard)
export class TestsNewsController {
	constructor(private readonly contentsManagementService: TestsNewsService) {}

	@Get()
	async findAll(@Query() query: FindAllQueryArgs, @Res() res: Response) {
		const { data, total } = await this.contentsManagementService.findAll(query);
		res.header("Content-Range", `${total}`);
		res.header("Access-Control-Expose-Headers", "Content-Range");
		return res.send(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		const data = await this.contentsManagementService.findOne(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Post()
	async create(@Body() createTestNewsDto: CreateTestNewsDto) {
		const data = await this.contentsManagementService.create(createTestNewsDto);
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
		@Body() updateTestNewsDto: UpdateTestNewsDto,
	) {
		const data = await this.contentsManagementService.update(
			id,
			updateTestNewsDto,
		);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Delete(":id")
	async remove(@Param("id") id: number) {
		const data = await this.contentsManagementService.remove(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}
}
