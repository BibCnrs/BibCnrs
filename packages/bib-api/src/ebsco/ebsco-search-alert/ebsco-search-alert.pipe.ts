import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FrequenceTransformPipe implements PipeTransform {
	transform(value) {
		if (value.frequence) {
			switch (value.frequence) {
				case "day":
					value.frequence = "1 day";
					break;
				case "week":
					value.frequence = "1 week";
					break;
				case "month":
					value.frequence = "1 month";
					break;
				case "year":
					value.frequence = "1 year";
					break;
				default:
					throw new BadRequestException("Invalid frequence value");
			}
		}
		return value;
	}
}
