import type { history } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

export class CreateHistoryDto
	implements Omit<history, "id" | "user_id" | "created_at">
{
	event: JsonValue;
	has_alert: boolean;
	frequence: string;
	last_execution: Date;
	last_results: JsonValue;
	nb_results: number;
	active: boolean;
}
