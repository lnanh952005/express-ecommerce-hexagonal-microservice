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

	router.get("/", http.listDataAPI.bind(http));
	router.get("/:id", http.getDataAPI.bind(http));
	router.post("/", http.createDataAPI.bind(http));
	router.patch("/:id", http.updateDataAPI.bind(http));
	router.delete("/:id", http.deleteDataAPI.bind(http));

	return router;
};
