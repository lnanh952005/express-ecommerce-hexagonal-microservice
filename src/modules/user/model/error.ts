import { AppError } from "@shared/models/error";

export const UserNotFoundError = new AppError("User not found", 404);
export const UserAlreadyExistsError = new AppError("User already exists", 409);
export const InvalidCredentialsError = new AppError("Invalid credentials", 401);