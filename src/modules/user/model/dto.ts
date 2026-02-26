import { paginationSchema } from "@shared/models";
import z from "zod";

export const createUserSchema = z.object({
	name: z.string().nonempty(),
	email: z.email(),
	password: z.string().min(8),
});

export interface CreateUserDTO extends z.infer<typeof createUserSchema> {}

export const updateUserSchema = z.object({
	name: z.string().nonempty().optional(),
});

export interface UpdateUserDTO extends z.infer<typeof updateUserSchema> {}

export const filterUserSchema = paginationSchema.extend({
	name: z.string().optional(),
});

export interface FilterUserDTO extends z.infer<typeof filterUserSchema> {}

export const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(8),
});

export interface LoginDTO extends z.infer<typeof loginSchema> {}

export const registerSchema = z.object({
	email: z.string(),
	name: z.string(),
	password: z.string(),
});

export interface RegisterDTO extends z.infer<typeof registerSchema> {}
