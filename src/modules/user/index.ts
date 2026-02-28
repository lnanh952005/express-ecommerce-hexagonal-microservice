import { env } from "@shared/components/env";
import { JwtService } from "@shared/components/jwt";
import { Router } from "express";
import { UserRepository } from "./infra/repo/repo";
import { UserHttpService } from "./infra/transport/http";
import {
	createUserSchema,
	filterUserSchema,
	loginSchema,
	registerSchema,
	updateUserSchema,
} from "./model/dto";
import { UserUseCase } from "./usecase";

export const userModule = () => {
	const router = Router();
	const repo = new UserRepository();
	const jwtService = new JwtService(
		env.ACCESS_TOKEN_KEY,
		env.REFRESH_TOKEN_KEY,
		env.ACCESS_TOKEN_EXPIRES_IN as any,
		env.REFRESH_TOKEN_EXPIRES_IN as any,
	);
	const useCase = new UserUseCase(repo, jwtService);
	const http = new UserHttpService(
		useCase,
		createUserSchema,
		updateUserSchema,
		filterUserSchema,
		loginSchema,
		registerSchema,
	);

	router.post("/login", http.loginAPI.bind(http));
	router.post("/register", http.registerAPI.bind(http));
	router.get("/profile", http.getProfileAPI.bind(http));

	router.get("/", http.listDataAPI.bind(http));
	router.get("/:id", http.getDataAPI.bind(http));
	router.post("/", http.createDataAPI.bind(http));
	router.patch("/:id", http.updateDataAPI.bind(http));
	router.delete("/:id", http.deleteDataAPI.bind(http));

	return router;
};
