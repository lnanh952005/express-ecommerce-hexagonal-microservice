import type { ICommandRepository, IQueryRepository, IUseCase } from "@/shared/interfaces/index";

import type { CategoryModel } from "../infra/repo/model";
import type { CreateCategoryDTO, GetCategoryDTO, UpdateCategoryDTO } from "../model/dto";
import type { Category } from "../model/model";
export interface ICategoryUseCase
	extends IUseCase<Category, CreateCategoryDTO, UpdateCategoryDTO, GetCategoryDTO> {}

export interface ICategoryRepository
	extends IQueryRepository<CategoryModel, GetCategoryDTO>,
		ICommandRepository<CreateCategoryDTO, UpdateCategoryDTO> {}
