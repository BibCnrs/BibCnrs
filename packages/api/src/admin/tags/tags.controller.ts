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
import { CreateTagDto, UpdateTagDto } from "./dto/tags.dto";
import { TagsService } from "./tags.service";

@Controller("admin/tags")
@UseGuards(AdminAuthenticationGuard)
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@Post()
	async create(@Body() createTagDto: CreateTagDto) {
		const data = await this.tagsService.create(createTagDto);
		if (!data) {
			throw new HttpException(
				"INTERNAL SERVER ERROR",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}

		return data;
	}

	@Get()
	async findAll(@Query() query: FindAllQueryArgs, @Res() res: Response) {
		const result = await this.tagsService.findAll(query);

		res.header("Content-Range", `tags 0-${result.data.length}/${result.total}`);
		res.header("Access-Control-Expose-Headers", "Content-Range");

		return res.status(200).json(result);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		const data = await this.tagsService.findOne(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Put(":id")
	async update(@Param("id") id: number, @Body() updateTagDto: UpdateTagDto) {
		const data = await this.tagsService.update(id, updateTagDto);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Delete(":id")
	async remove(@Param("id") id: number) {
		const data = await this.tagsService.remove(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}
}
