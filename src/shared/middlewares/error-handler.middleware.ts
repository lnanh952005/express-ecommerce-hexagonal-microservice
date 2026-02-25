import type { ErrorRequestHandler } from "express";
import z, { ZodError } from "zod";
import { AppError } from "../models/error";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	console.log(err);
	if (err instanceof AppError) {
		return res
			.status(err.statusCode || 400)
			.json({ statusCode: err.statusCode, message: err.message });
	}
	if (err instanceof ZodError) {
		return res.status(400).json(z.flattenError(err));
	}
	return res.status(500).json({ message: err.message || "Internal Server Error" });
};
