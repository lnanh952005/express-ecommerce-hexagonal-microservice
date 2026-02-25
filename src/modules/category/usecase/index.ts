import type { ICategoryRepository, ICategoryUseCase } from "@/modules/category/interface/index";
import { DataNotFoundError } from "@/shared/models/error";
import type { CreateCategoryDTO, FilterCategoryDTO, UpdateCategoryDTO } from "../model/dto";
import { type Category, categorySchema } from "../model/model";

export class CategoryUseCase implements ICategoryUseCase {
	constructor(private readonly repository: ICategoryRepository) {}
	async createData(data: CreateCategoryDTO): Promise<string> {
		const id = await this.repository.insert(data);
		return id;
	}
	async updateData(id: string, data: UpdateCategoryDTO): Promise<boolean> {
		const category = await this.repository.get(id);
		if (!category) {
			throw DataNotFoundError;
		}
		await this.repository.update(id, data);
		return true;
	}
	async getData(id: string): Promise<Category> {
		const category = await this.repository.get(id);
		if (!category) {
			throw DataNotFoundError;
		}
		return categorySchema.parse(category);
	}
	async listData(filter: FilterCategoryDTO): Promise<Category[]> {
		const categories = await this.repository.list(filter);
		return categories.map((category) => categorySchema.parse(category));
	}
	async deleteData(id: string): Promise<boolean> {
		const category = await this.repository.get(id);
		if (!category) {
			throw DataNotFoundError;
		}
		await this.repository.delete(id);
		return true;
	}
}
