import { AppError } from "@shared/models/error";

export const ParentCategoryNotFoundErr = new AppError("Parent category not found", 404);
