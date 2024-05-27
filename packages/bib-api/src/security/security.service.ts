import crypto from "node:crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SecurityService {
	sha512(value: string) {
		return crypto
			.createHash("sha512")
			.update(value)
			.digest("hex")
			.toUpperCase();
	}

	private async pbkdf2(password: string, salt: string): Promise<string> {
		return new Promise((resolve, reject) => {
			// WARN: This is not as secure as it should be: key length and iteration MUST be increased.
			// NOTE: This is out of scope for this sprint.
			crypto.pbkdf2(
				Buffer.from(password, "utf-8"),
				Buffer.from(salt, "utf-8"),
				7,
				20,
				"sha256",
				(err, derivedKey) => {
					if (err) {
						return reject(err);
					}
					resolve(derivedKey.toString("base64"));
				},
			);
		});
	}

	private async generateSalt(): Promise<string> {
		return new Promise((resolve, reject) => {
			crypto.randomBytes(20, (err, buf) => {
				if (err) {
					return reject(err);
				}
				resolve(buf.toString("base64"));
			});
		});
	}

	async hashPassword(password: string) {
		const salt = await this.generateSalt();
		return {
			salt,
			hash: await this.pbkdf2(password, salt),
		};
	}

	async isPasswordValid(password: string, salt: string, hash: string) {
		const passwordHash = await this.pbkdf2(password, salt);
		// We avoid timing attack here
		return crypto.timingSafeEqual(
			Buffer.from(passwordHash, "utf8"),
			Buffer.from(hash, "utf8"),
		);
	}
}
