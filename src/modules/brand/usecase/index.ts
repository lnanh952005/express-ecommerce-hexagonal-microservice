import { DataAlreadyExistsError, DataNotFoundError } from "@shared/models/error";
import type { IBrandRepository, IBrandUseCase } from "../interface";
import type { CreateBrandDTO, FilterBrandDTO, UpdateBrandDTO } from "../model/dto";
import { type Brand, BrandSchema } from "../model/model";

export class BrandUseCase implements IBrandUseCase {
	constructor(private readonly repository: IBrandRepository) {}

	async createData(dto: CreateBrandDTO): Promise<string> {
		const checkExist = await this.repository.findByCondition({ name: dto.name });
		if (checkExist) {
			throw DataAlreadyExistsError;
		}
		const id = await this.repository.insert(dto);
		return id;
	}
	async updateData(id: string, dto: UpdateBrandDTO): Promise<boolean> {
		const brand = await this.repository.findById(id);
		if (!brand) {
			throw DataNotFoundError;
		}
		this.repository.update(id, dto);
		return true;
	}
	async getData(id: string): Promise<Brand> {
		const brand = await this.repository.findById(id);
		if (!brand) {
			throw DataNotFoundError;
		}
		return BrandSchema.parse(brand);
	}
	async listData(filter: FilterBrandDTO): Promise<Brand[]> {
		const brands = await this.repository.findAll(filter);
		return brands.map((brand) => BrandSchema.parse(brand));
	}
	async deleteData(id: string): Promise<boolean> {
		const brand = await this.repository.findById(id);
		if (!brand) {
			throw DataNotFoundError;
		}
		await this.repository.delete(id);
		return true;
	}
}
