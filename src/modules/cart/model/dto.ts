import z from "zod";

export const addProductToCartSchema = z.object({
	productId: z.string(),
	quantity: z.number().positive(),
});

export interface AddProductToCartDTO extends z.infer<typeof addProductToCartSchema> {}

export const updateCartItemSchema = z.object({
	productId: z.string(),
	quantity: z.number().positive(),
});

export interface UpdateCartItemDTO extends z.infer<typeof updateCartItemSchema> {}

export const removeProductFromCartSchema = z.object({
	ids: z.array(z.string()),
});

export interface RemoveProductFromCartDTO extends z.infer<typeof removeProductFromCartSchema> {}

export const filterCartSchema = z.object({});

export interface FilterCartDTO extends z.infer<typeof filterCartSchema> {}
