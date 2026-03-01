import z from "zod";

export const userSchema = z.object({
	id: z.string(),
	email: z.string(),
	password: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	avatar: z.string().nullable(),
	phone: z.string().nullable(),
	address: z.string().nullable(),
	dob: z.date().nullable(),
	gender: z.string().nullable(),
	role: z.string(),
	status: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface User extends z.infer<typeof userSchema> {}

export const profileSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
});

export interface Profile extends z.infer<typeof profileSchema> {}
