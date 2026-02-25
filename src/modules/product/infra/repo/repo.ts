import { v7 } from "uuid";
import { ProductEntity } from "@/shared/entities/product.entity";
import type { IProductRepository } from "../../interface";
import type { CreateProductDTO, FilterProductDTO, UpdateProductDTO } from "../../model/dto";

export class ProductRepository implements IProductRepository {
	findByCondition(condition: Record<string, any>): Promise<ProductEntity | null> {
		return ProductEntity.findOneBy({ ...condition });
	}
	async list(filter: FilterProductDTO): Promise<ProductEntity[]> {
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

	async get(id: string): Promise<ProductEntity | null> {
		const product = await ProductEntity.findOneBy({ id });
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
