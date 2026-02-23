import z, { string } from "zod";

export const categorySchema = z.object({
	id: z.string(),
	name: string(),
});

export type Category = z.infer<typeof categorySchema>;
