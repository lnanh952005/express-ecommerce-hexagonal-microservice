import { v7 } from "uuid";
import type { ICategoryRepository } from "@/modules/category/interface/index";
import { CategoryEntity } from "@/shared/entities/category.entity";
import type { CreateCategoryDTO, FilterCategoryDTO, UpdateCategoryDTO } from "../../model/dto";

export class CategoryRepository implements ICategoryRepository {
	findByCondition(condition: Record<string, any>): Promise<CategoryEntity | null> {
		return CategoryEntity.findOneBy({
			...condition,
		});
	}
	async list(filter: FilterCategoryDTO): Promise<CategoryEntity[]> {
		const { limit, page, ...condition } = filter;
		const categories = await CategoryEntity.find({
			skip: (page - 1) * limit,
			take: limit,
			where: {
				...condition,
			},
		});
		return categories;
	}

	async get(id: string): Promise<CategoryEntity | null> {
		const category = await CategoryEntity.findOneBy({ id });
		return category;
	}

	async insert(data: CreateCategoryDTO): Promise<string> {
		const id = v7();
		await CategoryEntity.insert({
			id,
			...data,
		});
		return id;
	}

	async update(id: string, data: UpdateCategoryDTO): Promise<void> {
		await CategoryEntity.update({ id }, { ...data });
	}

	async delete(id: string): Promise<void> {
		await CategoryEntity.delete({ id });
	}
}
