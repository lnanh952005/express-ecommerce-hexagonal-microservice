import { AppError } from "@shared/models/error";

export const ProductNotFoundErr = new AppError("Product not found", 404);
