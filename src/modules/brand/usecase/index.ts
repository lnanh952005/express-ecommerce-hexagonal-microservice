import { DataAlreadyExistsError, DataNotFoundError } from "@/shared/models/error";
import type { IBrandRepository, IBrandUseCase } from "../interface";
import type { CreateBrandDTO, GetBrandDTO, UpdateBrandDTO } from "../model/dto";
import { type Brand, BrandSchema } from "../model/model";

export class BrandUseCase implements IBrandUseCase {
	constructor(private readonly repository: IBrandRepository) {}
	async listBrands(filter: GetBrandDTO): Promise<Brand[]> {
		const brands = await this.repository.list(filter);
		return brands.map((brand) => BrandSchema.parse(brand));
	}
	async createBrand(data: CreateBrandDTO): Promise<string> {
		const checkExist = await this.repository.findByCondition({ name: data.name });
		if (checkExist) {
			throw DataAlreadyExistsError;
		}
		const id = await this.repository.insert(data);
		return id;
	}
	async updateBrand(id: string, data: UpdateBrandDTO): Promise<boolean> {
		const brand = await this.repository.get(id);
		if (!brand) {
			throw DataNotFoundError;
		}
		this.repository.update(id, data);
		return true;
	}

	async deleteBrand(id: string): Promise<boolean> {
		const brand = await this.repository.get(id);
		if (!brand) {
			throw DataNotFoundError;
		}
		await this.repository.delete(id);
		return true;
	}

	async getBrandById(id: string): Promise<Brand> {
		const brand = await this.repository.get(id);
		if (!brand) {
			throw DataNotFoundError;
		}
		return BrandSchema.parse(brand);
	}
}
