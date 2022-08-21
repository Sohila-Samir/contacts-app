import bcrypt from "bcrypt";
import ExpressError from "./ExpressError";

const hashPassword = async (password: string) => {
	try {
		const saltRounds: number = Number(process.env.SALT_ROUNDS_NUM as string);
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(password, salt);

		return {
			salt,
			password: hash,
		};
	} catch (err: unknown) {
		if (err && err instanceof Error) throw new ExpressError(err.message, 400, err.name);
	}
};

const verifyPassword = async (password: string, storedPassword: string, salt: string) => {
	try {
		const hash = await bcrypt.hash(password, salt);
		return storedPassword === hash;
	} catch (err: unknown) {
		if (err && err instanceof Error) throw new ExpressError(err.message, 400, err.name);
	}
};

export { hashPassword, verifyPassword };
