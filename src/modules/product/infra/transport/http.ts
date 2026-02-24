import type { RequestHandler } from "express";
import type { IResponse } from "@/shared/interfaces/fortmat-response";
import type { IProductUseCase } from "../../interface";
import type { CreateProductDTO, GetProductDTO } from "../../model/dto";

export class ProductHttpService {
	constructor(private readonly useCase: IProductUseCase) {}

	createProductAPI: RequestHandler<unknown, IResponse, CreateProductDTO> = async (req, res) => {
		const id = await this.useCase.createProduct(req.body);
		return res.status(201).json({ code: 201, data: id });
	};

	updateProductAPI: RequestHandler<{ id: string }, IResponse, CreateProductDTO> = async (
		req,
		res,
	) => {
		const { id } = req.params;
		await this.useCase.updateProduct(id, req.body);
		return res.status(200).json({ code: 200, message: "Product updated", data: true });
	};

	deleteProductAPI: RequestHandler<{ id: string }, IResponse> = async (req, res) => {
		const { id } = req.params;
		await this.useCase.deleteProduct(id);
		return res.status(200).json({ code: 200, message: "Product deleted", data: true });
	};

	getProductAPI: RequestHandler<{ id: string }, IResponse> = async (req, res) => {
		const { id } = req.params;
		const product = await this.useCase.getProduct(id);
		return res.status(200).json({ code: 200, data: product });
	};

	listProductsAPI: RequestHandler<unknown, IResponse, unknown, GetProductDTO> = async (
		req,
		res,
	) => {
		const products = await this.useCase.listProducts(req.query);
		return res.status(200).json({ code: 200, data: products });
	};
}
