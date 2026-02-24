import { Router } from "express";
import { validateBody, validateQuery } from "@/shared/components/validate";

import { asyncHandler } from "@/shared/middlewares/async-handler.middleware";
import { ProductRepository } from "./infra/repo/repo";
import { RPCBrandRepository, RPCCategoryRepository } from "./infra/repo/rpc";
import { ProductHttpService } from "./infra/transport/http";
import { createProductSchema, getProductSchema, updateProductSchema } from "./model/dto";
import { ProductUseCase } from "./usecase";

export const productModule = () => {
	const router = Router();
	const repo = new ProductRepository();
	const rpcCategory = new RPCCategoryRepository();
	const rpcBrand = new RPCBrandRepository();
	const useCase = new ProductUseCase(repo, rpcBrand, rpcCategory);
	const http = new ProductHttpService(useCase);

	router.get("/", validateQuery(getProductSchema), asyncHandler(http.listProductsAPI.bind(http)));
	router.get("/:id", asyncHandler(http.getProductAPI.bind(http)));
	router.post(
		"/",
		validateBody(createProductSchema),
		asyncHandler(http.createProductAPI.bind(http)),
	);
	router.patch(
		"/:id",
		validateBody(updateProductSchema),
		asyncHandler(http.updateProductAPI.bind(http)),
	);
	router.delete("/:id", asyncHandler(http.deleteProductAPI.bind(http)));

	return router;
};
