import { BrandEntity } from "@shared/entities/brand.entity";
import { In } from "typeorm";
import { v7 } from "uuid";
import type { IBrandRepository } from "../../interface";
import type { CreateBrandDTO, FilterBrandDTO, UpdateBrandDTO } from "../../model/dto";
export class BrandRepository implements IBrandRepository {
	findByIds(ids: string[]): Promise<BrandEntity[]> {
		return BrandEntity.find({
			where: {
				id: In(ids),
			},
		});
	}
	async findAll(filter: FilterBrandDTO): Promise<BrandEntity[]> {
		const { page, limit, ...condition } = filter;
		const brands = await BrandEntity.find({
			skip: (page - 1) * limit,
			take: limit,
			where: {
				...condition,
			},
		});
		return brands;
	}
	async findById(id: string): Promise<BrandEntity | null> {
		return await BrandEntity.findOneBy({
			id,
		});
	}

	findByCondition(condition: Record<string, any>): Promise<BrandEntity | null> {
		return BrandEntity.findOneBy({
			...condition,
		});
	}

	async insert(data: CreateBrandDTO): Promise<string> {
		const id = v7();
		await BrandEntity.insert({
			id,
			...data,
		});
		return id;
	}
	async update(id: string, data: UpdateBrandDTO): Promise<void> {
		await BrandEntity.update(id, { ...data });
	}
	async delete(id: string): Promise<void> {
		await BrandEntity.delete({ id });
	}
}
