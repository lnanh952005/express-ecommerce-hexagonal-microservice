import { ProductEntity } from "@shared/entities/product.entity";
import { In } from "typeorm";
import { v7 } from "uuid";
import type { IProductRepository } from "../../interface";
import type { CreateProductDTO, FilterProductDTO, UpdateProductDTO } from "../../model/dto";

export class ProductRepository implements IProductRepository {
	findByIds(ids: string[]): Promise<ProductEntity[]> {
		return ProductEntity.find({
			where: {
				id: In(ids),
			},
		});
	}
	findByCondition(condition: Record<string, any>): Promise<ProductEntity | null> {
		return ProductEntity.findOneBy({ ...condition });
	}
	async findAll(filter: FilterProductDTO): Promise<ProductEntity[]> {
		const { limit, page, ...condition } = filter;
		const products = await ProductEntity.find({
			skip: (page - 1) * limit,
			take: limit,
			where: {
				...condition,
			},
		});
		return products;
	}

	async findById(id: string): Promise<ProductEntity | null> {
		const product = await ProductEntity.findOne({
			where: { id },
		});
		return product;
	}

	async insert(data: CreateProductDTO): Promise<string> {
		const id = v7();
		await ProductEntity.insert({
			id,
			...data,
		});
		return id;
	}

	async update(id: string, data: UpdateProductDTO): Promise<void> {
		await ProductEntity.update({ id }, { ...data });
	}

	async delete(id: string): Promise<void> {
		await ProductEntity.delete({ id });
	}
}
