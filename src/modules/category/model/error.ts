import { AppError } from "@/utils/error";

export const CategoryNotFoundError = new AppError("Category not found", 404);
