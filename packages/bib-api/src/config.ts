const configFunction = () => ({
	mailer: {
		host: process.env.MAIL_SERVER_HOST,
		port: Number.parseInt(process.env.MAIL_SERVER_PORT, 10),
	},
	auth: {
		cookieSecret: process.env.cookie_secret,
		headerSecret: process.env.header_secret,
		adminSecret: process.env.admin_secret,
		expiresIn: 10 * 3600, // 10 hours
	},
	contentDelivery: {
		host: process.env.BIBAPI_HOST,
	},
});

export type Config = ReturnType<typeof configFunction>;

export default configFunction;
