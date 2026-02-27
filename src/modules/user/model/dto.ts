import { Gender, ModelStatus, UserRole } from "@shared/constants/enum.constant";
import { paginationSchema } from "@shared/models";
import z from "zod";

export const createUserSchema = z.object({
	email: z.email(),
	password: z.string().min(10),
	firstName: z.string().nonempty(),
	lastName: z.string().nonempty(),
	phone: z.string().optional(),
	address: z.string().optional(),
});

export interface CreateUserDTO extends z.infer<typeof createUserSchema> {}

export const updateUserSchema = z.object({
	password: z.string().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	avatar: z.string().optional(),
	phone: z.string().optional(),
	address: z.string().optional(),
	dob: z.date().optional(),
	gender: z.enum(Gender).optional(),
	role: z.enum(UserRole).optional(),
	status: z.enum(ModelStatus).optional(),
});

export interface UpdateUserDTO extends z.infer<typeof updateUserSchema> {}

export const filterUserSchema = paginationSchema.extend({
	email: z.string().optional(),
	address: z.string().optional(),
	phone: z.string().optional(),
	role: z.enum(UserRole).optional(),
	status: z.enum(ModelStatus).optional(),
});

export interface FilterUserDTO extends z.infer<typeof filterUserSchema> {}

export const registerSchema = z.object({
	email: z.email(),
	firstName: z.string(),
	lastName: z.string(),
	password: z.string().min(10),
});

export interface RegisterDTO extends z.infer<typeof registerSchema> {}

export const loginSchema = registerSchema.pick({
	email: true,
	password: true,
});

export interface LoginDTO extends z.infer<typeof loginSchema> {}
