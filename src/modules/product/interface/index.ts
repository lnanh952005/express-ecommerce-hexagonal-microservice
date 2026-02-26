import type { ProductEntity } from "@shared/entities/product.entity";
import type { ICommandRepository, IQueryRepository, IUseCase } from "@shared/interfaces/index";
import type { CreateProductDTO, FilterProductDTO, UpdateProductDTO } from "../model/dto";
import type { Product, ProductBrand, ProductCategory } from "../model/model";

export interface IProductUseCase
	extends IUseCase<Product, CreateProductDTO, UpdateProductDTO, FilterProductDTO> {}

export interface IProductRepository
	extends IQueryRepository<ProductEntity, FilterProductDTO>,
		ICommandRepository<CreateProductDTO, UpdateProductDTO> {}

export interface IRPCBrandQueryRepository {
	get(id: string): Promise<ProductBrand | null>;
}

export interface IRPCCategoryQueryRepository {
	get(id: string): Promise<ProductCategory | null>;
}
