import type { ICartRepository, ICartUseCase, IProductQueryRepository } from "../interface";
import type { AddProductToCartDTO, FilterCartDTO, UpdateCartItemDTO } from "../model/dto";
import { ProductNotFoundErr } from "../model/error";
import { type CartItem, cartItemSchema } from "../model/model";

export class CartUseCase implements ICartUseCase {
	constructor(
		private readonly repository: ICartRepository,
		private readonly rpc: IProductQueryRepository,
	) {}
	async getCart(filter: FilterCartDTO): Promise<CartItem[]> {
		const cart = await this.repository.findAll(filter);
		return cart.map((item) => cartItemSchema.parse(item));
	}
	async addProductToCart(dto: AddProductToCartDTO): Promise<string> {
		const product = await this.rpc.findById(dto.productId);
		if (!product) {
			throw ProductNotFoundErr;
		}
		const id = await this.repository.insert(dto);
		return id;
	}
	async updateCartItem(id: string, dto: UpdateCartItemDTO): Promise<boolean> {
		const product = await this.rpc.findById(dto.productId);
		if (!product) {
			throw ProductNotFoundErr;
		}
		await this.repository.update(id, dto);
		return true;
	}
	async removeProductFromCart(id: string[]): Promise<boolean> {
		await this.repository.deleteByIds(id);
		return true;
	}
}
