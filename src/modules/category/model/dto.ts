import z from "zod";
import { paginationSchema } from "@/shared/models";

export const createCategorySchema = z.object({
	name: z.string(),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
	name: z.string().optional(),
});

export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;

export const getCategorySchema = paginationSchema.extend({
	name: z.string().optional(),
});

export type GetCategoryDTO = z.infer<typeof getCategorySchema>;
