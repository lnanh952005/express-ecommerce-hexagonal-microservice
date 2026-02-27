import { asyncHandler } from "@shared/middlewares/async-handler.middleware";
import { Router } from "express";
import { CategoryRepository } from "./infra/repo/repo";
import { CategoryHttpService } from "./infra/transport/http";
import { createCategorySchema, filterCategorySchema, updateCategorySchema } from "./model/dto";
import { CategoryUseCase } from "./usecase";

export const categoryModule = () => {
	const router = Router();
	const repo = new CategoryRepository();
	const useCase = new CategoryUseCase(repo);
	const http = new CategoryHttpService(
		useCase,
		createCategorySchema,
		updateCategorySchema,
		filterCategorySchema,
	);

	router.get("/", asyncHandler(http.listDataAPI.bind(http)));
	router.post("/", asyncHandler(http.createDataAPI.bind(http)));
	router.get("/:id", asyncHandler(http.getDataAPI.bind(http)));
	router.patch("/:id", asyncHandler(http.updateDataAPI.bind(http)));
	router.delete("/:id", asyncHandler(http.deleteDataAPI.bind(http)));

	return router;
};
