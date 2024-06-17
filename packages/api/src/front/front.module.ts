import { Module } from "@nestjs/common";
import { FrontCmsModule } from "./cms/cms.module";
import { FrontTestNewsModule } from "./testNews/testNews.module";

@Module({
	imports: [FrontCmsModule, FrontTestNewsModule],
})
export class FrontModule {}
