import z from "zod";
import { paginationSchema } from "@shared/models";

export const createCategorySchema = z.object({
	name: z.string(),
});

export interface CreateCategoryDTO extends z.infer<typeof createCategorySchema> {}

export const updateCategorySchema = z.object({
	name: z.string().optional(),
});

export interface UpdateCategoryDTO extends z.infer<typeof updateCategorySchema> {}

export const filterCategorySchema = paginationSchema.extend({
	name: z.string().optional(),
});

export interface FilterCategoryDTO extends z.infer<typeof filterCategorySchema> {}
