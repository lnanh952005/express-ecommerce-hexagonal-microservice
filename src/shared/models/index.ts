import z from "zod";

export const paginationSchema = z.object({
	page: z.coerce.number().min(1).positive().default(1),
	limit: z.coerce.number().min(10).positive().default(10),
});

export type PaginationDTO = z.infer<typeof paginationSchema>;
