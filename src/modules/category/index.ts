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

	router.get("/", http.listDataAPI.bind(http));
	router.post("/", http.createDataAPI.bind(http));
	router.get("/:id", http.getDataAPI.bind(http));
	router.patch("/:id", http.updateDataAPI.bind(http));
	router.delete("/:id", http.deleteDataAPI.bind(http));

	return router;
};
