import type { IRepository } from "@/shared/interfaces/index";
import type { CreateCategoryDTO, GetCategoryDTO, UpdateCategoryDTO } from "../model/dto";
import type { Category } from "../model/model";

export interface ICategoryUseCase {
	getCategory(id: string): Promise<Category>;
	listCategories(condition: GetCategoryDTO): Promise<Category[]>;
	createCategory(data: CreateCategoryDTO): Promise<number>;
	updateCategory(id: string, data: UpdateCategoryDTO): Promise<boolean>;
	deleteCategory(id: string): Promise<boolean>;
}

export interface ICategoryRepository
	extends IRepository<Category, CreateCategoryDTO, UpdateCategoryDTO, GetCategoryDTO> { }
