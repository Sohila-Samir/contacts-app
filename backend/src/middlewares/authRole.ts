import { Request, Response, NextFunction } from "express";
import ExpressError from "../utils/main/ExpressError";

const authRole = (role: number) => {
	return (_req: Request, res: Response, next: NextFunction) => {
		if (res.locals.user.roles.includes(role)) {
			return next();
		}
		throw new ExpressError("unauthorized operation!", 401);
	};
};

export default authRole;
