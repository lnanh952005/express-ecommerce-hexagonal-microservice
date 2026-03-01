import { DataNotFoundError } from "@shared/models/error";
import type {
	IProductRepository,
	IProductUseCase,
	IRPCBrandQueryRepository,
	IRPCCategoryQueryRepository,
} from "../interface";
import type { CreateProductDTO, FilterProductDTO, UpdateProductDTO } from "../model/dto";
import { BrandNotFoundError, CategoryNotFoundError } from "../model/error";
import { type Product, productSchema } from "../model/model";

export class ProductUseCase implements IProductUseCase {
	constructor(
		private readonly repository: IProductRepository,
		private readonly rpcBrandRepo: IRPCBrandQueryRepository,
		private readonly rpcCategoryRepo: IRPCCategoryQueryRepository,
	) {}
	async createData(dto: CreateProductDTO): Promise<string> {
		const [checkBrand, checkCategory] = await Promise.all([
			this.rpcBrandRepo.findById(dto.brandId),
			this.rpcCategoryRepo.findById(dto.categoryId),
		]);
		if (!checkBrand) {
			throw BrandNotFoundError;
		}
		if (!checkCategory) {
			throw CategoryNotFoundError;
		}
		const id = await this.repository.insert(dto);
		return id;
	}

	async updateData(id: string, dto: UpdateProductDTO): Promise<boolean> {
		const Product = await this.repository.findById(id);
		if (!Product) {
			throw DataNotFoundError;
		}
		await this.repository.update(id, dto);
		return true;
	}

	async getData(id: string): Promise<Product> {
		console.log(id);
		const product = await this.repository.findById(id);
		if (!product) {
			throw DataNotFoundError;
		}
		const brand = await this.rpcBrandRepo.findById(product.brandId);
		const category = await this.rpcCategoryRepo.findById(product.categoryId);
		const parsedProduct = productSchema.parse(product);
		return { ...parsedProduct, brand, category };
	}

	async listData(filter: FilterProductDTO): Promise<Product[]> {
		const products = await this.repository.findAll(filter);
		return products.map((p) => productSchema.parse(p));
	}

	async deleteData(id: string): Promise<boolean> {
		const Product = await this.repository.findById(id);
		if (!Product) {
			throw DataNotFoundError;
		}
		await this.repository.delete(id);
		return true;
	}

	async listByIds(ids: string[]): Promise<Product[]> {
		const products = await this.repository.findByIds(ids);
		return products.map((p) => productSchema.parse(p));
	}
}
