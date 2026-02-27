import { env } from "@shared/components/env";
import { JwtService } from "@shared/components/jwt";
import type { RequestHandler } from "express";

export const auth: RequestHandler = (req, res, next) => {
	const jwtService = new JwtService(
		env.ACCESS_TOKEN_KEY,
		env.REFRESH_TOKEN_KEY,
		env.ACCESS_TOKEN_EXPIRES_IN as any,
		env.REFRESH_TOKEN_EXPIRES_IN as any,
	);
	try {
		const jwt = req.headers.authorization;
		if (!jwt) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const [prefix, token] = jwt.split(" ");
		if (prefix !== "Bearer" || !token) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const payload = jwtService.verifyAccessToken(token);
		res.locals.requester = payload;
		return next();
	} catch (error) {
		next(error);
	}
};
