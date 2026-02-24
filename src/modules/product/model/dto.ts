import z from "zod";
import { foreignKeySchema, paginationSchema } from "@/shared/models";

export const createProductSchema = z.object({
	name: z.string().nonempty(),
	price: z.number().positive(),
	salePrice: z.number().positive(),
	colors: z.string().nonempty(),
	quantity: z.number().positive(),
	content: z.string().optional(),
	description: z.string().optional(),
	rating: z.number().positive(),
	saleCount: z.number().positive(),
	brandId: foreignKeySchema,
	categoryId: foreignKeySchema,
});

export interface CreateProductDTO extends z.infer<typeof createProductSchema> {}

export const updateProductSchema = z.object({
	name: z.string().optional(),
});

export interface UpdateProductDTO extends z.infer<typeof updateProductSchema> {}

export const getProductSchema = paginationSchema.extend({
	name: z.string().optional(),
});

export interface GetProductDTO extends z.infer<typeof getProductSchema> {}
