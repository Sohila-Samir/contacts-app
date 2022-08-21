import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/ExpressError";

const errorHandler = async (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
	if (err && err instanceof ExpressError)
		console.log(`${err.message} - ${err.status} | ${err.name}`);
	res.status(err.status).json({
		success: false,
		message: `${err.message} - ${err.status} | ${err.name}`,
	});
};

export default errorHandler;
