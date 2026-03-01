import type { ICartRepository } from "@modules/cart/interface";
import type {
	AddProductToCartDTO,
	FilterCartDTO,
	UpdateCartItemDTO,
} from "@modules/cart/model/dto";
import { CartItemEntity } from "@shared/entities/cart.entity";
import { In } from "typeorm";
import { v7 } from "uuid";

export class CartRepository implements ICartRepository {
	findAllByUser(userId: string): Promise<CartItemEntity[]> {
		return CartItemEntity.findBy({
			userId,
		});
	}
	findById(id: string): Promise<CartItemEntity | null> {
		return CartItemEntity.findOneBy({ id });
	}
	findByIds(ids: string[]): Promise<CartItemEntity[]> {
		return CartItemEntity.findBy({
			id: In(ids),
		});
	}
	findAll(filter: FilterCartDTO): Promise<CartItemEntity[]> {
		return CartItemEntity.find({
			where: {
				...filter,
			},
		});
	}
	findByCondition(condition: Record<string, any>): Promise<CartItemEntity | null> {
		return CartItemEntity.findOneBy({
			...condition,
		});
	}
	async insert(data: AddProductToCartDTO): Promise<string> {
		const id = v7();
		await CartItemEntity.insert({
			id,
			...data,
		});
		return id;
	}
	async update(id: string, data: UpdateCartItemDTO): Promise<void> {
		await CartItemEntity.update(
			{ id },
			{
				...data,
			},
		);
	}
	async delete(id: string): Promise<void> {
		await CartItemEntity.delete({ id });
	}

	async deleteByIds(ids: string[]): Promise<void> {
		await CartItemEntity.delete({
			id: In(ids),
		});
	}
}
