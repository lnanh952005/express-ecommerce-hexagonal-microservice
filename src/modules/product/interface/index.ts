import type { ICommandRepository, IQueryRepository, IUseCase } from "@/shared/interfaces/index";
import type { ProductModel } from "../infra/repo/model";
import type { CreateProductDTO, GetProductDTO, UpdateProductDTO } from "../model/dto";
import type { Product, ProductBrand, ProductCategory } from "../model/model";

export interface IProductUseCase
	extends IUseCase<Product, CreateProductDTO, UpdateProductDTO, GetProductDTO> {}

export interface IProductRepository
	extends IQueryRepository<ProductModel, GetProductDTO>,
		ICommandRepository<CreateProductDTO, UpdateProductDTO> {}

export interface IRPCBrandQueryRepository {
	get(id: string): Promise<ProductBrand | null>;
}

export interface IRPCCategoryQueryRepository {
	get(id: string): Promise<ProductCategory | null>;
}
