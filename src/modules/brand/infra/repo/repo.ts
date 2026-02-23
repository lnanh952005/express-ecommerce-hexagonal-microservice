import type { IBrandRepository } from "../../interface";
import type { CreateBrandDTO, GetBrandDTO, UpdateBrandDTO } from "../../model/dto";
import { BrandModel } from "./model";

export class BrandRepository implements IBrandRepository {
	async list(condition: GetBrandDTO): Promise<BrandModel[]> {
		const { page, limit, ...filter } = condition;
		const brands = await BrandModel.findAll({
			offset: (page - 1) * limit,
			limit,
			where: {
				...filter,
			},
		});
		return brands;
	}
	async get(id: string): Promise<BrandModel | null> {
		return await BrandModel.findByPk(id);
	}

	findByCondition(condition: Record<string, any>): Promise<BrandModel | null> {
		return BrandModel.findOne({
			where: condition,
		});
	}
	async insert(data: CreateBrandDTO): Promise<number> {
		const brand = await BrandModel.create(data);
		return brand.id;
	}
	async update(id: string, data: UpdateBrandDTO): Promise<void> {
		await BrandModel.update(data, {
			where: { id },
		});
	}
	async delete(id: string): Promise<void> {
		await BrandModel.destroy({
			where: { id },
		});
	}
}
