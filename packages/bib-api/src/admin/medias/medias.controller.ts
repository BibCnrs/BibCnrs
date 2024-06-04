import * as fs from "node:fs";
import * as path from "node:path";
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
	UploadedFile,
	UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileInterceptor } from "@nestjs/platform-express";
import { Response } from "express";
import { diskStorage } from "multer";
import { Config } from "../../config";
import { FindAllQueryArgs } from "../admin.type";
import { CreateMediaDto, UpdateMediaDto } from "./dto/media.dto";
import { UPLOADS_DIR } from "./medias.const";
import { MediasService } from "./medias.service";

@Controller("admin/medias")
export class MediasController {
	private readonly servicesConfig: Config["services"];

	constructor(
		private readonly mediasService: MediasService,
		private readonly configService: ConfigService<Config, true>,
	) {
		this.servicesConfig =
			this.configService.get<Config["services"]>("services");
	}

	@Post()
	@UseInterceptors(
		FileInterceptor("file", {
			storage: diskStorage({
				destination: (_req, _file, callback) => {
					const now = new Date();
					const directoryPath = path.join(
						UPLOADS_DIR,
						now.getUTCFullYear().toString(10),
						(now.getUTCMonth() + 1).toString(10),
						now.getUTCDate().toString(10),
					);

					fs.mkdir(directoryPath, { recursive: true }, (err) => {
						if (err) {
							return callback(new Error(err.message), null);
						}
						callback(null, directoryPath);
					});
				},
				filename: (_, file, callback) => {
					callback(null, file.originalname);
				},
			}),
		}),
	)
	async create(
		@UploadedFile() file: Express.Multer.File,
		@Body() createMediaDto: CreateMediaDto,
	) {
		const media = {
			...createMediaDto,
			file_name: file.filename,
			file: `${file.path}`,
			url: `${file.path.replace(UPLOADS_DIR, "")}`,
		};

		return this.mediasService.create(media);
	}

	@Get()
	async findAll(@Query() query: FindAllQueryArgs, @Res() res: Response) {
		const { data, total } = await this.mediasService.findAll(query);
		res.header("Content-Range", `${total}`);
		res.header("Access-Control-Expose-Headers", "Content-Range");
		return res.send(
			data.map(({ url, ...rest }) => ({
				...rest,
				url: `${this.servicesConfig.contentDelivery}${url}`,
			})),
		);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		const data = await this.mediasService.findOne(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return {
			...data,
			url: data.url
				? `${this.servicesConfig.contentDelivery}${data.url}`
				: null,
		};
	}

	@Put(":id")
	async update(
		@Param("id") id: number,
		@Body() updateMediaDto: UpdateMediaDto,
	) {
		const data = await this.mediasService.update(id, updateMediaDto);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}

	@Delete(":id")
	async remove(@Param("id") id: number) {
		const data = await this.mediasService.remove(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
	}
}
