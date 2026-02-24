import z from "zod";

const envSchema = z.object({
	PORT: z.string().nonempty(),
	DB_URL: z.string().nonempty(),
	SERVER_URL: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
