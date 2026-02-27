import { asyncHandler } from "@shared/middlewares/async-handler.middleware";
import { Router } from "express";
import { BrandRepository } from "./infra/repo/repo";
import { BrandHttpService } from "./infra/transport/http";
import { createBrandSchema, filterBrandSchema, updateBrandSchema } from "./model/dto";
import { BrandUseCase } from "./usecase";

export const brandModule = () => {
	const router = Router();
	const repo = new BrandRepository();
	const useCase = new BrandUseCase(repo);
	const http = new BrandHttpService(
		useCase,
		createBrandSchema,
		updateBrandSchema,
		filterBrandSchema,
	);

	router.get("/", asyncHandler(http.listDataAPI.bind(http)));
	router.get("/:id", asyncHandler(http.getDataAPI.bind(http)));
	router.post("/", asyncHandler(http.createDataAPI.bind(http)));
	router.patch("/:id", asyncHandler(http.updateDataAPI.bind(http)));
	router.delete("/:id", asyncHandler(http.deleteDataAPI.bind(http)));

	return router;
};
