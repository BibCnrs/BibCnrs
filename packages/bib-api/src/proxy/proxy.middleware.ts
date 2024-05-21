import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

const OLD_API_URL = process.env.OLD_API_URL;
if (!OLD_API_URL) {
	throw new Error("OLD_API_URL is not set");
}

export const proxy = createProxyMiddleware({
	target: OLD_API_URL,
	changeOrigin: true,
	on: {
		proxyReq: fixRequestBody,
	},
});
