import z from "zod";
import { paginationSchema } from "@/shared/models";

export const createUserSchema = z.object({
	name: z.string().nonempty(),
	description: z.string().optional(),
});

export interface CreateUserDTO extends z.infer<typeof createUserSchema> {}

export const updateUserSchema = createUserSchema.partial();

export interface UpdateUserDTO extends z.infer<typeof updateUserSchema> {}

export const filterUserSchema = paginationSchema.extend({
	name: z.string().optional(),
});

export interface FilterUserDTO extends z.infer<typeof filterUserSchema> {}
