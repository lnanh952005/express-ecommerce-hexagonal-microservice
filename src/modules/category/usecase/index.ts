import type { ICategoryRepository, ICategoryUseCase } from "@/modules/category/interface/index";
import type { CreateCategoryDTO, GetCategoryDTO, UpdateCategoryDTO } from "../model/dto";
import { CategoryNotFoundError } from "../model/error";
import type { Category } from "../model/model";

export class CategoryUseCase implements ICategoryUseCase {
	constructor(private readonly repository: ICategoryRepository) {}

	listCategories(condition: GetCategoryDTO): Promise<Category[]> {
		return this.repository.list(condition);
	}
	async updateCategory(id: string, data: UpdateCategoryDTO): Promise<boolean> {
		const category = await this.repository.get(id);
		if (!category) {
			throw CategoryNotFoundError;
		}
		return this.repository.update(id, data);
	}

	async getCategory(id: string): Promise<Category> {
		const category = await this.repository.get(id);
		if (!category) {
			throw CategoryNotFoundError;
		}
		return category;
	}

	async deleteCategory(id: string): Promise<boolean> {
		const category = await this.repository.get(id);
		if (!category) {
			throw CategoryNotFoundError;
		}
		return this.repository.delete(id);
	}

	async createCategory(data: CreateCategoryDTO): Promise<number> {
		const id = await this.repository.insert(data);
		return id;
	}
}
