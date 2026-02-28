import z, { string } from "zod";

export const categorySchema = z.object({
	id: z.string(),
	name: string(),
	description: z.string().nullable(),
	image: z.string().nullable(),
	position: z.string().nullable(),
	parentId: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export interface Category extends z.infer<typeof categorySchema> {
	children?: Category[];
}
