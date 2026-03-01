import { Router } from "express";
import { ProductRepository } from "./infra/repo/repo";

import { RPCBrandRepository } from "./infra/rpc/brand.rpc";
import { RPCCategoryRepository } from "./infra/rpc/category.rpc";
import { ProductHttpService } from "./infra/transport/http";
import {
	createProductSchema,
	filterProductSchema,
	listProductByIds,
	updateProductSchema,
} from "./model/dto";
import { ProductUseCase } from "./usecase";

export const productModule = () => {
	const router = Router();
	const repo = new ProductRepository();
	const rpcCategory = new RPCCategoryRepository();
	const rpcBrand = new RPCBrandRepository();
	const useCase = new ProductUseCase(repo, rpcBrand, rpcCategory);
	const http = new ProductHttpService(
		useCase,
		createProductSchema,
		updateProductSchema,
		filterProductSchema,
		listProductByIds,
	);

	router.get("/", http.listDataAPI.bind(http));
	router.get("/:id", http.getDataAPI.bind(http));
	router.post("/", http.createDataAPI.bind(http));
	router.post("/list-by-ids", http.listByIdsApi.bind(http));
	router.patch("/:id", http.updateDataAPI.bind(http));
	router.delete("/:id", http.deleteDataAPI.bind(http));

	return router;
};
