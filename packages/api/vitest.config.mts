import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		root: "./../..",
		testTimeout: 20000,
		fileParallelism: false,
	},
	plugins: [
		swc.vite({
			module: { type: "es6" },
			minify: true,
		}),
	],
});
