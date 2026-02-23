import z, { string } from "zod";

export const categorySchema = z.object({
	id: z.string(),
	name: string(),
});

export interface Category extends z.infer<typeof categorySchema> {}
