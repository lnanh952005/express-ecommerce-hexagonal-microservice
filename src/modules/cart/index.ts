import { Router } from "express";
import { CartRepository } from "./infra/repo";
import { RPCProductQueryRepository } from "./infra/rpc";
import { CartHttpService } from "./infra/transport/http";
import {
	addProductToCartSchema,
	filterCartSchema,
	removeProductFromCartSchema,
	updateCartItemSchema,
} from "./model/dto";
import { CartUseCase } from "./usecase";

export const setupCartModule = () => {
	const router = Router();

	const cartRepo = new CartRepository();
	const rpcProductRepo = new RPCProductQueryRepository();
	const cartUseCase = new CartUseCase(cartRepo, rpcProductRepo);
	const http = new CartHttpService(
		cartUseCase,
		addProductToCartSchema,
		updateCartItemSchema,
		removeProductFromCartSchema,
		filterCartSchema,
	);

	router.post("/", http.addProductToCartAPI.bind(http));
	router.patch("/:id", http.updateCartItemAPI.bind(http));
	router.delete("/", http.removeProductFromCartAPI.bind(http));
	router.get("/", http.getCartAPI.bind(http));

	return router;
};
