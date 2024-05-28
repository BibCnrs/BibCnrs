import { Logger } from "@nestjs/common";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { join } from "node:path";

const OLD_API_URL = process.env.OLD_API_URL;
if (!OLD_API_URL) {
	throw new Error("OLD_API_URL is not set");
}

const logger = new Logger("ProxyMiddleware");

export const proxy = createProxyMiddleware({
	target: OLD_API_URL,
	pathRewrite: (path) => join("/api", path),
	changeOrigin: true,
	on: {
		proxyReq: (proxyReq, req) => {
			logger.log(`Proxying request to ${req.url}`);
			return fixRequestBody(proxyReq, req);
		},
	},
});
