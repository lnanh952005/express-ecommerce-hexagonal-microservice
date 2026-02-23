import type { IRepository } from "@/shared/interfaces/index";
import type { CategoryModel } from "../infra/repo/model";
import type { CreateCategoryDTO, GetCategoryDTO, UpdateCategoryDTO } from "../model/dto";
import type { Product, ProductBrand, ProductCategory } from "../model/model";

export interface IProductUseCase {
	getProduct(id: string): Promise<Product>;
	listProducts(filter: GetCategoryDTO): Promise<Product[]>;
	createProduct(data: CreateCategoryDTO): Promise<number>;
	updateProduct(id: string, data: UpdateCategoryDTO): Promise<boolean>;
	deleteProduct(id: string): Promise<boolean>;
}

export interface IProductRepository
	extends IRepository<CategoryModel, CreateCategoryDTO, UpdateCategoryDTO, GetCategoryDTO> { }


export interface IBrandQueryRepository {
	get(id: number): Promise<ProductBrand | null>
}

export interface ICategoryQueryRepository {
	get(index: number): Promise<ProductCategory | null>;
}