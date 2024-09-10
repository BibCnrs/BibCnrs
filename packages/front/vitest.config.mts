import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		setupFiles: ["./packages/front/src/test/setup.ts"],
		environment: "happy-dom",
		root: "./../..",
		testTimeout: 20000,
		fileParallelism: false,
		env: {
			VITE_BIBAPI_HOST: "https://bib.cnrs.fr",
		},
	},
});
