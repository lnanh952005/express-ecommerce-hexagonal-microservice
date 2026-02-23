import type { RequestHandler } from "express";
import type { ZodType } from "zod";

export const validateBody =
	(schema: ZodType): RequestHandler =>
		(req, _res, next) => {
			try {
				const body = schema.parse(req.body);
				req.body = body;
				return next();
			} catch (error) {
				return next(error);
			}
		};

export const validateQuery =
	(schema: ZodType): RequestHandler<any, any, any, any> =>
		(req, _res, next) => {
			try {
				const query = schema.parse(req.query);
				req.query = query;
				return next();
			} catch (error) {
				return next(error);
			}
		};
