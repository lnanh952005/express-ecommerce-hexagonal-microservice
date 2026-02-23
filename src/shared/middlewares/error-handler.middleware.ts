import type { ErrorRequestHandler } from "express";
import { AppError } from "../models/error";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode || 400).json({ statusCode: err.statusCode, message: err.message });
    }
    return res.status(500).json({ message: err.message || "Internal Server Error" });
}