import z from "zod";

export const createCategorySchema = z.object({
	name: z.string().nonempty(),
	description: z.string().nonempty().optional(),
	image: z.string().nonempty().optional(),
	position: z.string().nonempty().optional(),
	parentId: z.string().nonempty().optional(),
});

export interface CreateCategoryDTO extends z.infer<typeof createCategorySchema> {}

export const updateCategorySchema = z.object({
	name: z.string().nonempty().optional(),
	description: z.string().nonempty().optional(),
	image: z.string().nonempty().optional(),
	position: z.string().nonempty().optional(),
	parentId: z.string().nonempty().optional(),
});

export interface UpdateCategoryDTO extends z.infer<typeof updateCategorySchema> {}

export const filterCategorySchema = z.object({
	name: z.string().optional(),
});

export interface FilterCategoryDTO extends z.infer<typeof filterCategorySchema> {}
