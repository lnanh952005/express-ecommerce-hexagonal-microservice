import type { ICategoryRepository } from "@/modules/category/interface/index";
import type { CreateCategoryDTO, GetCategoryDTO, UpdateCategoryDTO } from "../../model/dto";
import { CategoryModel } from "./model";

export class CategoryRepository implements ICategoryRepository {
	findByCondition(condition: Record<string, any>): Promise<CategoryModel | null> {
		return CategoryModel.findOne({
			where: { ...condition },
		});
	}
	async list(condition: GetCategoryDTO): Promise<CategoryModel[]> {
		const { limit, page, ...filter } = condition;
		console.log(filter)
		const categories = await CategoryModel.findAll({
			offset: (page - 1) * limit,
			limit: limit,
			where: {
				...filter,
			},
		});
		return categories;
	}

	async get(id: string): Promise<CategoryModel | null> {
		const category = await CategoryModel.findByPk(id);
		return category;
	}

	async insert(data: CreateCategoryDTO): Promise<number> {
		const result = await CategoryModel.create(data);
		return result.id;
	}

	async update(id: string, data: UpdateCategoryDTO): Promise<void> {
		await CategoryModel.update(data, { where: { id } });
	}

	async delete(id: string): Promise<void> {
		await CategoryModel.destroy({ where: { id } });
	}
}
