import { paginationSchema } from "@shared/models";
import z from "zod";

export const createBrandSchema = z.object({
	name: z.string().nonempty(),
	description: z.string().optional(),
	tagLine: z.string().optional(),
	image: z.string().optional(),
});

export interface CreateBrandDTO extends z.infer<typeof createBrandSchema> {}

export const updateBrandSchema = z.object({
	name: z.string().nonempty(),
	description: z.string().optional(),
	tagLine: z.string().optional(),
	image: z.string().optional(),
});

export interface UpdateBrandDTO extends z.infer<typeof updateBrandSchema> {}

export const filterBrandSchema = paginationSchema.extend({
	name: z.string().optional(),
});

export interface FilterBrandDTO extends z.infer<typeof filterBrandSchema> {}
