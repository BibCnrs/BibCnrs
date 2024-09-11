import { vi } from "vitest";
import type { SessionUserDataType } from "../app/shared/types/data.types";

export function mockInistLogin() {
	const user: SessionUserDataType = {
		id: 1,
		domains: ["INSB"],
		legacy: true,
		username: "Marmelab",
		favorite_domain: "INSB",
		favouriteResources: [],
		origin: "inist",
	};

	vi.spyOn(globalThis, "fetch").mockImplementation(() => {
		return Promise.resolve({
			ok: true,
			status: 200,
			json: () => {
				return user;
			},
		} as unknown as Response);
	});

	return user;
}
