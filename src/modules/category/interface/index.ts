import type { CategoryEntity } from "@shared/entities/category.entity";
import type { ICommandRepository, IQueryRepository, IUseCase } from "@shared/interfaces/index";
import type { CreateCategoryDTO, FilterCategoryDTO, UpdateCategoryDTO } from "../model/dto";
import type { Category } from "../model/model";
export interface ICategoryUseCase
	extends IUseCase<Category, CreateCategoryDTO, UpdateCategoryDTO, FilterCategoryDTO> {}

export interface ICategoryRepository
	extends IQueryRepository<CategoryEntity, FilterCategoryDTO>,
		ICommandRepository<CreateCategoryDTO, UpdateCategoryDTO> {}
