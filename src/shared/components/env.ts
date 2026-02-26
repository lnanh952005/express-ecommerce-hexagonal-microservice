import z from "zod";

const envSchema = z.object({
	PORT: z.string().nonempty(),
	DB_URL: z.string().nonempty(),
	SERVER_URL: z.string().nonempty(),
	ACCESS_TOKEN_KEY: z.string().nonempty(),
	REFRESH_TOKEN_KEY: z.string().nonempty(),
	ACCESS_TOKEN_EXPIRES_IN: z.string().nonempty(),
	REFRESH_TOKEN_EXPIRES_IN: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
