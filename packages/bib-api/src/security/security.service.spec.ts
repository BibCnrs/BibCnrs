import { describe, expect, it } from "vitest";
import { SecurityService } from "./security.service";

describe("SecurityService", () => {
	const securityService = new SecurityService();

	describe("sha512", () => {
		it("should return a SHA512 hash of the input string in uppercase", () => {
			const input = "test";
			const output = securityService.sha512(input);
			expect(output).toMatch(/^[A-F0-9]{128}$/);
		});
	});

	describe("hashPassword", () => {
		it("should return an object with salt and hash", async () => {
			const password = "password123";
			const result = await securityService.hashPassword(password);
			expect(result).toHaveProperty("salt");
			expect(result).toHaveProperty("hash");
			expect(result.salt).toHaveLength(28); // Base64 length of 20 bytes
			expect(result.hash).toMatch(/^[A-Za-z0-9+/]{27}={0,2}$/); // Base64 regex
		});
	});

	describe("isPasswordValid", () => {
		it("should return true for a valid password", async () => {
			const password = "validPassword";
			const { salt, hash } = await securityService.hashPassword(password);
			const isValid = await securityService.isPasswordValid(
				password,
				salt,
				hash,
			);
			expect(isValid).toBe(true);
		});

		it("should return false for an invalid password", async () => {
			const validPassword = "validPassword";
			const invalidPassword = "invalidPassword";
			const { salt, hash } = await securityService.hashPassword(validPassword);
			const isValid = await securityService.isPasswordValid(
				invalidPassword,
				salt,
				hash,
			);
			expect(isValid).toBe(false);
		});
	});

	// Additional tests could be written for private methods if they were exposed or through integration testing.
});
