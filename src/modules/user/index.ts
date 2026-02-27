import { env } from "@shared/components/env";
import { JwtService } from "@shared/components/jwt";
import { asyncHandler } from "@shared/middlewares/async-handler.middleware";
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

export const brandModule = () => {
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

	router.get("/", asyncHandler(http.listDataAPI.bind(http)));
	router.get("/:id", asyncHandler(http.getDataAPI.bind(http)));
	router.post("/", asyncHandler(http.createDataAPI.bind(http)));
	router.patch("/:id", asyncHandler(http.updateDataAPI.bind(http)));
	router.delete("/:id", asyncHandler(http.deleteDataAPI.bind(http)));

	router.post("/login", asyncHandler(http.loginAPI.bind(http)));
	router.post("/register", asyncHandler(http.registerAPI.bind(http)));
	router.get("/profile", asyncHandler(http.getProfileAPI.bind(http)));

	return router;
};
