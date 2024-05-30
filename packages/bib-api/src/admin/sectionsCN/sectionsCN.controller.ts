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
} from "@nestjs/common";
import { Response } from "express";
import { FindAllQueryArgs } from "../admin.type";
import { CreateSectionCNDto, UpdateSectionCNDto } from "./dto/sectionCN.dto";
import { SectionsCNService } from "./sectionsCN.service";

@Controller("admin/section_cn")
export class SectionsCNController {
	constructor(private readonly sectionsCNService: SectionsCNService) {}

	@Get()
	async findAll(@Query() query: FindAllQueryArgs, @Res() res: Response) {
		const { data, total } = await this.sectionsCNService.findAll(query);
		res.header("Content-Range", `${total}`);
		res.header("Access-Control-Expose-Headers", "Content-Range");
		return res.send(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		const data = await this.sectionsCNService.findOne(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Post()
	async create(@Body() createSectionDto: CreateSectionCNDto) {
		const data = await this.sectionsCNService.create(createSectionDto);
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
		@Body() updateSectionDto: UpdateSectionCNDto,
	) {
		const data = await this.sectionsCNService.update(id, updateSectionDto);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Delete(":id")
	async remove(@Param("id") id: number) {
		const data = await this.sectionsCNService.remove(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}
}
