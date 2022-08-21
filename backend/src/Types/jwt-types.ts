import { UserType } from "./user-types";

export type UserAuthData = {
	user?: Omit<UserType, "password" | "salt" | "refreshTokens">;
	accessToken: string;
	refreshToken: string;
};
