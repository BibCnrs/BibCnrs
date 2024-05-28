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
import { MediasService } from "./medias.service";

@Controller("admin/medias")
export class MediasController {
	private readonly contentDeliveryConfig: Config["contentDelivery"];
	constructor(
		private readonly mediasService: MediasService,
		private readonly configService: ConfigService<Config, true>,
	) {
		this.contentDeliveryConfig =
			this.configService.get<Config["contentDelivery"]>("contentDelivery");
	}

	@Post()
	@UseInterceptors(
		FileInterceptor("file", {
			storage: diskStorage({
				destination: `./uploads/${new Date().getUTCFullYear()}/${
					new Date().getUTCMonth() + 1
				}/${new Date().getUTCDate()}`,
				filename: (_, file, callback) => {
					const fileName = `${file.originalname}`;
					callback(null, fileName);
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
			url: `${this.contentDeliveryConfig.host}${file.path.replace(
				"uploads",
				"",
			)}`,
		};
		return this.mediasService.create(media);
	}

	@Get()
	async findAll(@Query() query: FindAllQueryArgs, @Res() res: Response) {
		const { data, total } = await this.mediasService.findAll(query);
		res.header("Content-Range", `${total}`);
		res.header("Access-Control-Expose-Headers", "Content-Range");
		return res.send(data);
	}

	@Get(":id")
	async findOne(@Param("id") id: number) {
		const data = await this.mediasService.findOne(id);

		if (!data) {
			throw new HttpException("Not Found", HttpStatus.NOT_FOUND);
		}

		return data;
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
