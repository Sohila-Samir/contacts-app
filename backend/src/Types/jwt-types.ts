import { AccessRole } from "./role-type";

export type UserAuthData = {
	accessToken: string;
	refreshToken: string;
};

export type JwtPayload = {
	_id: string;
	roles: AccessRole;
	verified: boolean;
	iat: number;
	exp: number;
	aud: string | string[];
	iss: "http://localhost:2022";
};
