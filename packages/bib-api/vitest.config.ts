import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
	cacheDir: ".vitest",
	test: {
		globals: true,
		root: "./../..",
		testTimeout: 20000,
	},
	plugins: [
		swc.vite({
			module: { type: "es6" },
		}),
	],
});
