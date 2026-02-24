import type { RequestHandler } from "express";

export const asyncHandler = (cb: RequestHandler<any, any, any, any>): RequestHandler => {
	return async (req, res, next) => {
		try {
			await cb(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};
