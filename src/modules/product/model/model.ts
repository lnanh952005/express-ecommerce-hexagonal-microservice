import z from "zod";
import { statusSchema } from "@shared/models";

export const productSchema = z.object({
	id: z.string(),
	name: z.string(),
	price: z.number(),
	salePrice: z.number(),
	colors: z.string(),
	quantity: z.number(),
	brandId: z.string(),
	categoryId: z.string(),
	content: z.string(),
	description: z.string(),
	rating: z.number(),
	saleCount: z.number(),
	status: statusSchema,
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface Product extends z.infer<typeof productSchema> {
	category?: ProductCategory | null;
	brand?: ProductBrand | null;
}

export const productBrandSchema = z.object({
	id: z.string(),
	name: z.string(),
});

export interface ProductBrand extends z.infer<typeof productBrandSchema> {}

export const productCategorySchema = z.object({
	id: z.string(),
	name: z.string(),
});

export interface ProductCategory extends z.infer<typeof productCategorySchema> {}
