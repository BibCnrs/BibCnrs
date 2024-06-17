export const UPLOADS_DIR = process.env.BIB_UPLOADS_DIR;
if (!UPLOADS_DIR) {
	throw new Error("BIB_UPLOADS_DIR env is not defined");
}
