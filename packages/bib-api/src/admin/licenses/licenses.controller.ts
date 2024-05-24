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
import { CreateLicenseDto, UpdateLicenseDto } from "./dto/license.dto";
import { LicensesService } from "./licenses.service";

@Controller("api/admin/licenses")
export class LicensesController {
	constructor(private readonly licensesService: LicensesService) {}

	@Post()
	async create(@Body() createLicenseDto: CreateLicenseDto) {
		const data = await this.licensesService.create(createLicenseDto);
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
		const { data, total } = await this.licensesService.findAll(query);
		res.header("Content-Range", `${total}`);
		res.header("Access-Control-Expose-Headers", "Content-Range");
		return res.send(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		const data = await this.licensesService.findOne(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Put(":id")
	async update(
		@Param("id") id: number,
		@Body() updateLicenseDto: UpdateLicenseDto,
	) {
		const data = await this.licensesService.update(id, updateLicenseDto);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Put(":id/common")
	async updateForCommon(@Param("id") id: number) {
		return await this.licensesService.updateForCommon(id);
	}

	@Delete(":id")
	async remove(@Param("id") id: number) {
		const data = await this.licensesService.remove(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}
}
