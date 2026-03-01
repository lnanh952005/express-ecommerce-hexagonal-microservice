import type { ErrorRequestHandler } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import z, { ZodError } from "zod";
import { AppError } from "../models/error";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	console.log(err.message);
	if (err instanceof AppError) {
		return res.status(err.statusCode || 400).json({ code: err.message });
	}
	if (err instanceof ZodError) {
		return res.status(400).json(z.flattenError(err));
	}
	if (err instanceof JsonWebTokenError) {
		return res.status(401).json({ message: err.message });
	}
	return res.status(500).json({ message: err.message || "Internal Server Error" });
};
