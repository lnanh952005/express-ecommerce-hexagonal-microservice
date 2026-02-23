import type { IRepository } from "@/shared/interfaces";
import type { BrandModel } from "../infra/repo/model";
import type { CreateBrandDTO, GetBrandDTO, UpdateBrandDTO } from "../model/dto";
import type { Brand } from "../model/model";

export interface IBrandUseCase {
	getBrandById(id: string): Promise<Brand>;
	listBrands(filter: GetBrandDTO): Promise<Brand[]>;
	createBrand(data: CreateBrandDTO): Promise<number>;
	updateBrand(id: string, data: UpdateBrandDTO): Promise<boolean>;
	deleteBrand(id: string): Promise<boolean>;
}

export interface IBrandRepository
	extends IRepository<BrandModel, CreateBrandDTO, UpdateBrandDTO, GetBrandDTO> {}
