import { Router } from "express";
import { validateBody, validateQuery } from "@/shared/components/validate";
import { asyncHandler } from "@/shared/middlewares/async-handler.middleware";
import { CategoryRepository } from "./infra/repo/repo";
import { CategoryHttpService } from "./infra/transport/http";
import { createCategorySchema, getCategorySchema, updateCategorySchema } from "./model/dto";
import { CategoryUseCase } from "./usecase";

export const categoryModule = () => {
	const router = Router();
	const repo = new CategoryRepository();
	const useCase = new CategoryUseCase(repo);
	const http = new CategoryHttpService(useCase);

	router.get(
		"/",
		validateQuery(getCategorySchema),
		asyncHandler(http.listCategoriesAPI.bind(http)),
	);
	router.get("/:id", asyncHandler(http.getCategoryAPI.bind(http)));
	router.post(
		"/",
		validateBody(createCategorySchema),
		asyncHandler(http.createCategoryAPI.bind(http)),
	);
	router.patch(
		"/:id",
		validateBody(updateCategorySchema),
		asyncHandler(http.updateCategoryAPI.bind(http)),
	);
	router.delete("/:id", asyncHandler(http.deleteCategoryAPI.bind(http)));

	return router;
};
