import type { CartItemEntity } from "@shared/entities/cart.entity";
import type { ICommandRepository, IQueryRepository } from "@shared/interfaces";
import type { AddProductToCartDTO, FilterCartDTO, UpdateCartItemDTO } from "../model/dto";
import type { CartItem, CartProduct } from "../model/model";

export interface ICartRepository
	extends IQueryRepository<CartItemEntity, FilterCartDTO>,
		ICommandRepository<AddProductToCartDTO, UpdateCartItemDTO> {
	deleteByIds(ids: string[]): Promise<void>;
	findAllByUser(userId: string): Promise<CartItemEntity[]>;
}

export interface ICartUseCase {
	getCart(filter: FilterCartDTO): Promise<CartItem[]>;
	addProductToCart(dto: AddProductToCartDTO): Promise<string>;
	updateCartItem(id: string, dto: UpdateCartItemDTO): Promise<boolean>;
	removeProductFromCart(id: string[]): Promise<boolean>;
}

export interface IProductQueryRepository {
	findById(id: string): Promise<CartProduct | null>;
	findByIds(ids: string[]): Promise<CartProduct[]>;
}
