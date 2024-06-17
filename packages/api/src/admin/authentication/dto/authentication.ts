import { IsNotEmpty } from "class-validator";

export class AdminAuthenticationDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;
}
