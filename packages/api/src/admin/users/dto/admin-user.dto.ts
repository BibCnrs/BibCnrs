import type { admin_user } from "@prisma/client";

export class CreateAdminUserDto implements Omit<admin_user, "id" | "salt"> {
	username: string;
	password: string;
	comment: string | null;
}

export class UpdateAdminUserDto implements Omit<admin_user, "salt"> {
	id: number;
	username: string;
	password: string;
	comment: string | null;
}
