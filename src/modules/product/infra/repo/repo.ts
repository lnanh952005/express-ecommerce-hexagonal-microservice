import { v7 } from "uuid";
import type { IProductRepository } from "../../interface";
import type { CreateProductDTO, GetProductDTO, UpdateProductDTO } from "../../model/dto";

import { ProductModel } from "./model";

export class ProductRepository implements IProductRepository {
	findByCondition(condition: Record<string, any>): Promise<ProductModel | null> {
		return ProductModel.findOne({
			where: { ...condition },
		});
	}
	async list(condition: GetProductDTO): Promise<ProductModel[]> {
		const { limit, page, ...filter } = condition;
		const products = await ProductModel.findAll({
			offset: (page - 1) * limit,
			limit: limit,
			where: {
				...filter,
			},
		});
		return products;
	}

	async get(id: string): Promise<ProductModel | null> {
		const Product = await ProductModel.findByPk(id);
		return Product;
	}

	async insert(data: CreateProductDTO): Promise<string> {
		const product = await ProductModel.create({
			id: v7(),
			...data,
		});
		return product.id;
	}

	async update(id: string, data: UpdateProductDTO): Promise<void> {
		await ProductModel.update(data, { where: { id } });
	}

	async delete(id: string): Promise<void> {
		await ProductModel.destroy({ where: { id } });
	}
}
