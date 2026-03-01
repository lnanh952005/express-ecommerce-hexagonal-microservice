import z from "zod";

export const BrandSchema = z.object({
	id: z.string(),
	name: z.string(),
	tagLine: z.string().nullable(),
	image: z.string().nullable(),
	description: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface Brand extends z.infer<typeof BrandSchema> {}
