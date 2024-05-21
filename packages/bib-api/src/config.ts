const configFunction = () => ({
	mailer: {
		host: process.env.MAIL_SERVER_HOST,
		port: Number.parseInt(process.env.MAIL_SERVER_PORT, 10),
	},
});

export type Config = ReturnType<typeof configFunction>;

export default configFunction;
