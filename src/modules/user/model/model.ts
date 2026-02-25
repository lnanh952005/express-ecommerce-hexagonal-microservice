import z from "zod";

export const BrandSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
});

export interface Brand extends z.infer<typeof BrandSchema> {}
