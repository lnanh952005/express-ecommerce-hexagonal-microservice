
import type { ICategoryRepository } from "@/modules/category/interface/index";
import { categorySchema } from "../../model/model";
import { CategoryModel } from "./model";

export class CategoryRepository implements ICategoryRepository {
	async list(condition: {
		page: number;
		limit: number;
		name?: string | undefined;
	}): Promise<{ id: string; name: string }[]> {
		const categories = await CategoryModel.findAll({
			offset: (condition.page - 1) * condition.limit,
			limit: condition.limit,
			where: condition,
		});
		return categories.map((category) => categorySchema.parse(category));
	}

	async get(id: string): Promise<{ id: string; name: string } | null> {
		const category = await CategoryModel.findByPk(id);
		if (!category) {
			return null;
		}
		return categorySchema.parse(category);
	}

	async insert(data: { name: string }): Promise<number> {
		const result = await CategoryModel.create(data);
		return result.get({ plain: true }).id;
	}
	async update(id: string, data: { name?: string | undefined }): Promise<boolean> {
		await CategoryModel.update(data, { where: { id } });
		return true;
	}
	async delete(id: string): Promise<boolean> {
		await CategoryModel.destroy({ where: { id } });
		return true;
	}
}
