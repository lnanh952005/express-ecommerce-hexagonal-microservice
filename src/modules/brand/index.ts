import { Router } from "express";
import { validateBody, validateQuery } from "@/shared/components/validate";
import { asyncHandler } from "@/shared/middlewares/async-handler.middleware";
import { BrandRepository } from "./infra/repo/repo";
import { BrandHttpService } from "./infra/transport";
import { createBrandSchema, getBrandSchema, updateBrandSchema } from "./model/dto";
import { BrandUseCase } from "./usecase";

export const brandModule = () => {
	const router = Router();
	const repo = new BrandRepository();
	const useCase = new BrandUseCase(repo);
	const http = new BrandHttpService(useCase);

	router.get("/", validateQuery(getBrandSchema), asyncHandler(http.listBrandsAPI.bind(http)));
	router.get("/:id", asyncHandler(http.getBrandAPI.bind(http)));
	router.post("/", validateBody(createBrandSchema), asyncHandler(http.createBrandAPI.bind(http)));
	router.patch(
		"/:id",
		validateBody(updateBrandSchema),
		asyncHandler(http.updateBrandAPI.bind(http)),
	);
	router.delete("/:id", asyncHandler(http.deleteBrandAPI.bind(http)));

	return router;
};
