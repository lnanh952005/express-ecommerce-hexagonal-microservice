import type { ICategoryRepository, ICategoryUseCase } from "@modules/category/interface/index";
import { DataNotFoundError } from "@shared/models/error";
import type { CreateCategoryDTO, FilterCategoryDTO, UpdateCategoryDTO } from "../model/dto";
import { ParentCategoryNotFoundErr } from "../model/error";
import { type Category, categorySchema } from "../model/model";

export class CategoryUseCase implements ICategoryUseCase {
	constructor(private readonly repository: ICategoryRepository) {}
	async createData(dto: CreateCategoryDTO): Promise<string> {
		if (dto.parentId) {
			const parent = await this.repository.get(dto.parentId);
			if (!parent) {
				throw ParentCategoryNotFoundErr;
			}
		}
		const id = await this.repository.insert(dto);
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
		const result = await this.repository.list(filter);
		const categories: Category[] = result.map((category) => categorySchema.parse(category));
		// map id -> category
		const categoryMap = new Map<string, Category>();

		// init children trước
		for (const cate of categories) {
			cate.children = [];
			categoryMap.set(cate.id, cate);
		}

		const rootCategories: Category[] = [];

		for (const cate of categories) {
			if (!cate.parentId) {
				rootCategories.push(cate);
			} else {
				const parent = categoryMap.get(cate.parentId);
				if (parent) {
					parent.children?.push(cate);
				}
			}
		}
		return rootCategories;
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
