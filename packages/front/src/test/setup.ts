import { cleanup } from "@testing-library/react";
import { beforeEach, vi } from "vitest";

beforeEach(async () => {
	vi.restoreAllMocks();
	cleanup();
});
