import { DataNotFoundError } from "@/shared/models/error";
import type {
	IProductRepository,
	IProductUseCase,
	IRPCBrandQueryRepository,
	IRPCCategoryQueryRepository,
} from "../interface";
import type { CreateProductDTO, GetProductDTO, UpdateProductDTO } from "../model/dto";
import { BrandNotFoundError, CategoryNotFoundError } from "../model/error";
import { type Product, productSchema } from "../model/model";

export class ProductUseCase implements IProductUseCase {
	constructor(
		private readonly repository: IProductRepository,
		private readonly rpcBrandRepo: IRPCBrandQueryRepository,
		private readonly rpcCategoryRepo: IRPCCategoryQueryRepository,
	) {}
	async createData(data: CreateProductDTO): Promise<string> {
		const [checkBrand, checkCategory] = await Promise.all([
			this.rpcBrandRepo.get(data.brandId),
			this.rpcCategoryRepo.get(data.categoryId),
		]);
		if (!checkBrand) {
			throw BrandNotFoundError;
		}
		if (!checkCategory) {
			throw CategoryNotFoundError;
		}
		const id = await this.repository.insert(data);
		return id;
	}

	async updateData(id: string, data: UpdateProductDTO): Promise<boolean> {
		const Product = await this.repository.get(id);
		if (!Product) {
			throw DataNotFoundError;
		}
		await this.repository.update(id, data);
		return true;
	}

	async getData(id: string): Promise<Product> {
		const product = await this.repository.get(id);
		if (!product) {
			throw DataNotFoundError;
		}
		const brand = await this.rpcBrandRepo.get(product.brandId);
		const category = await this.rpcCategoryRepo.get(product.categoryId);
		const parsedProduct = productSchema.parse(product);
		return { ...parsedProduct, brand, category };
	}

	async listData(filter: GetProductDTO): Promise<Product[]> {
		const products = await this.repository.list(filter);
		return products.map((p) => productSchema.parse(p));
	}

	async deleteData(id: string): Promise<boolean> {
		const Product = await this.repository.get(id);
		if (!Product) {
			throw DataNotFoundError;
		}
		await this.repository.delete(id);
		return true;
	}
}
