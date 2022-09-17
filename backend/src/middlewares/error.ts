import { NextFunction, Request, Response } from "express";
import ExpressError from "../utils/main/ExpressError";

const errorHandler = async (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
	if (err && err instanceof ExpressError)
		console.log(`${err.message} - ${err.status} | ${err.name}`);
	res.status(err.status || 400).json({
		success: false,
		message: err.message,
	});
};

export default errorHandler;
