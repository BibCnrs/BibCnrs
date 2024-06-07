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
import { CreateUnitDto, UpdateUnitDto } from "./dto/unit.dto";
import { UnitsService } from "./units.service";

@Controller("admin/units")
@UseGuards(AdminAuthenticationGuard)
export class UnitsController {
	constructor(private readonly unitsService: UnitsService) {}

	@Get()
	async findAll(@Query() query: FindAllQueryArgs, @Res() res: Response) {
		const { data, total } = await this.unitsService.findAll(query);
		res.header("Content-Range", `${total}`);
		res.header("Access-Control-Expose-Headers", "Content-Range");
		return res.send(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		const data = await this.unitsService.findOne(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Post()
	async create(@Body() createUnitDto: CreateUnitDto) {
		const data = await this.unitsService.create(createUnitDto);
		if (!data) {
			throw new HttpException(
				"INTERNAL SERVER ERROR",
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}

		return data;
	}

	@Put(":id")
	async update(@Param("id") id: number, @Body() updateUnitDto: UpdateUnitDto) {
		const data = await this.unitsService.update(id, updateUnitDto);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Delete(":id")
	async remove(@Param("id") id: number) {
		const data = await this.unitsService.remove(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}
}
