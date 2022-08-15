import mongoose, { Schema } from 'mongoose';
import { hashPassword } from '../utils/passwordUtils';
import ExpressError from '../utils/ExpressError';

export type UserType = {
	_id?: mongoose.Types.ObjectId;
	username: string;
	password: string;
	salt?: string;
	email: string;
	admin?: boolean;
	refreshTokens?: string[];
};

const UsersSchema = new Schema({
	username: {
		unique: true,
		required: true,
		type: String,
	},

	password: {
		unique: true,
		required: true,
		type: String,
	},

	salt: {
		unique: true,
		type: String,
	},

	email: {
		required: true,
		type: String,
	},

	admin: {
		type: Boolean,
		default: false,
	},

	refreshTokens: {
		type: [String],
	},
});

UsersSchema.pre('save', async function (next) {
	try {
		const doc = this as unknown as UserType;
		const userVerifyCredentials = await hashPassword(doc.password);

		doc.salt = userVerifyCredentials.salt;
		doc.password = userVerifyCredentials.password;
		next();
	} catch (err: unknown) {
		if (err && err instanceof Error) {
			next(err);
		}
	}
});

export const UserModel = mongoose.model('user', UsersSchema);

class User {
	async createUser(data: UserType): Promise<UserType | Error | undefined> {
		try {
			const user: UserType = await UserModel.create(data);
			return user;
		} catch (err: unknown) {
			if (err && err instanceof Error) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async getUser(id: string): Promise<UserType | Error | null | undefined> {
		try {
			const foundUser: UserType | null = await UserModel.findById(id);
			return foundUser;
		} catch (err: unknown) {
			if (err && err instanceof Error) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}

	async deleteUser(id: string): Promise<UserType | Error | null | undefined> {
		try {
			const deletedUser: UserType | null = await UserModel.findByIdAndDelete(
				id
			);
			return deletedUser;
		} catch (err: unknown) {
			if (err && err instanceof Error) {
				throw new ExpressError(err.message, 400, err.name);
			}
		}
	}
}

export default User;
