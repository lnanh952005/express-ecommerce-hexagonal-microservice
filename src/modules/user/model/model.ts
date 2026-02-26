import z from "zod";

export const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	password: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface User extends z.infer<typeof userSchema> {}
