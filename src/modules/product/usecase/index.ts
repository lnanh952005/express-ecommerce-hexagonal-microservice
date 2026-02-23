import type { CreateCategoryDTO, GetCategoryDTO, UpdateCategoryDTO } from "../model/dto";
import type { ICategoryRepository, ICategoryUseCase } from "@/modules/category/interface/index";

import { type Category, categorySchema } from "../model/model";
import { DataNotFoundError } from "@/shared/models/error";

export class CategoryUseCase implements ICategoryUseCase {
	constructor(private readonly repository: ICategoryRepository) { }

	async listCategories(filter: GetCategoryDTO): Promise<Category[]> {
		const categories = await this.repository.list(filter);
		return categories.map((category) => categorySchema.parse(category));
	}

	async updateCategory(id: string, data: UpdateCategoryDTO): Promise<boolean> {
		const category = await this.repository.get(id);
		if (!category) {
			throw DataNotFoundError;
		}
		await this.repository.update(id, data);
		return true
	}

	async getCategory(id: string): Promise<Category> {
		const category = await this.repository.get(id);
		if (!category) {
			throw DataNotFoundError;
		}
		return categorySchema.parse(category);
	}

	async deleteCategory(id: string): Promise<boolean> {
		const category = await this.repository.get(id);
		if (!category) {
			throw DataNotFoundError;
		}
		await this.repository.delete(id);
		return true;
	}

	async createCategory(data: CreateCategoryDTO): Promise<number> {
		const id = await this.repository.insert(data);
		return id;
	}
}
