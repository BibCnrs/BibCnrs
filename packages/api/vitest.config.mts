import swc from "unplugin-swc";
import { Plugin, defineConfig } from "vitest/config";

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
		}) as Plugin,
	],
});
