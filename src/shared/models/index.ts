import z from "zod";

export const paginationSchema = z.object({
	page: z.coerce.number().min(1).positive().default(1),
	limit: z.coerce.number().min(10).positive().default(10),
});

export interface PaginationDTO extends z.infer<typeof paginationSchema> { }

export const statusSchema = z.enum(["ACTIVE", "INACTIVE", "DELETED"]);

export type ModelStatus = z.infer<typeof statusSchema>;