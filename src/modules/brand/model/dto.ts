import z from "zod";
import { paginationSchema } from "@/shared/models";

export const createBrandSchema = z.object({
	name: z.string().nonempty(),
});

export interface CreateBrandDTO extends z.infer<typeof createBrandSchema> {}

export const updateBrandSchema = createBrandSchema.partial();

export interface UpdateBrandDTO extends z.infer<typeof updateBrandSchema> {}

export const getBrandSchema = paginationSchema.extend({
	name: z.string().optional(),
});

export interface GetBrandDTO extends z.infer<typeof getBrandSchema> {}
