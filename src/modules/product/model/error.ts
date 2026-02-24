import { AppError } from "@/shared/models/error";

export const BrandNotFoundError = new AppError("brand not found", 404);
export const CategoryNotFoundError = new AppError("category not found", 404);
