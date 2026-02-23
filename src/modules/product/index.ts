import { Router } from "express";
import { validateBody, validateQuery } from "@/shared/components/validate";
import { CategoryRepository } from "./infra/repo/repo";
import { CategoryHttpService } from "./infra/transport/http";
import { createCategorySchema, getCategorySchema, updateCategorySchema } from "./model/dto";
import { CategoryUseCase } from "./usecase";
import { AsyncHandler } from "@/shared/middlewares/async-handler.middleware";

export const categoryModule = () => {
	const router = Router();
	const repo = new CategoryRepository();
	const useCase = new CategoryUseCase(repo);
	const http = new CategoryHttpService(useCase);

	router.get("/", validateQuery(getCategorySchema), http.listCategoriesAPI.bind(http));
	router.get("/:id", AsyncHandler(http.getCategoryAPI.bind(http)));
	router.post("/", validateBody(createCategorySchema), http.createCategoryAPI.bind(http));
	router.patch("/:id", validateBody(updateCategorySchema), http.updateCategoryAPI.bind(http));
	router.delete("/:id", http.deleteCategoryAPI.bind(http));

	return router;
};
