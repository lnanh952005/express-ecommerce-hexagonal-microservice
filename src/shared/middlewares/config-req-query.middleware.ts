import type { RequestHandler } from "express";

export const configReqQuery: RequestHandler = (req, _res, next) => {
	Object.defineProperty(req, "query", {
		...Object.getOwnPropertyDescriptor(req, "query"),
		value: req.query,
		writable: true,
	});
	return next();
};
