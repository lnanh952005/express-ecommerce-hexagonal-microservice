import z from "zod";

export const cartProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	images: z.array(z.string()),
	price: z.number(),
	salePrice: z.number(),
	quantity: z.number(),
});

export interface CartProduct extends z.infer<typeof cartProductSchema> {}

export const cartItemSchema = z.object({
	id: z.string(),
	userId: z.string(),
	productId: z.string(),
	quantity: z.number(),
	product: cartProductSchema.optional(),
});

export interface CartItem extends z.infer<typeof cartItemSchema> {}
