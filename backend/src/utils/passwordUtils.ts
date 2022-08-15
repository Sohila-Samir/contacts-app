import bcrypt from 'bcrypt';

const hashPassword = async (password: string) => {
	const saltRounds: number = Number(process.env.SALT_ROUNDS_NUM as string);
	const salt = await bcrypt.genSalt(saltRounds);
	const hash = await bcrypt.hash(password, salt);

	return {
		salt,
		password: hash,
	};
};

const verifyPassword = async (
	password: string,
	storedPassword: string,
	salt: string
) => {
	const hash = await bcrypt.hash(password, salt);

	return storedPassword === hash;
};

export { hashPassword, verifyPassword };
