import type { ICartUseCase } from "@modules/cart/interface";
import type {
	AddProductToCartDTO,
	FilterCartDTO,
	RemoveProductFromCartDTO,
	UpdateCartItemDTO,
} from "@modules/cart/model/dto";
import type { IResponse } from "@shared/interfaces/fortmat-response";
import type { Request, Response } from "express";
import type z from "zod";

export class CartHttpService {
	constructor(
		private readonly useCase: ICartUseCase,
		private readonly addProductToCartSchema: z.ZodType<AddProductToCartDTO>,
		private readonly updateCartItemSchema: z.ZodType<UpdateCartItemDTO>,
		private readonly removeProductFromCartSchema: z.ZodType<RemoveProductFromCartDTO>,
		private readonly filterCartSchema: z.ZodType<FilterCartDTO>,
	) {}

	async addProductToCartAPI(req: Request, res: Response<IResponse>) {
		const body = this.addProductToCartSchema.parse(req.body);
		const result = await this.useCase.addProductToCart(body);
		return res.status(200).json({ code: 200, data: result });
	}

	async updateCartItemAPI(req: Request<{ id: string }>, res: Response<IResponse>) {
		const { id } = req.params;
		const body = this.updateCartItemSchema.parse(req.body);
		const result = await this.useCase.updateCartItem(id, body);
		return res.status(200).json({ code: 200, data: result });
	}

	async removeProductFromCartAPI(req: Request, res: Response<IResponse>) {
		const body = this.removeProductFromCartSchema.parse(req.body);
		const result = await this.useCase.removeProductFromCart(body.ids);
		return res.status(200).json({ code: 200, data: result });
	}

	async getCartAPI(req: Request, res: Response<IResponse>) {
		const query = this.filterCartSchema.parse(req.query);
		const result = await this.useCase.getCart(query);
		return res.status(200).json({ code: 200, data: result });
	}
}
