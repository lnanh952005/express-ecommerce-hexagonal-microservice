import type { BrandEntity } from "@shared/entities/brand.entity";
import type { ICommandRepository, IQueryRepository, IUseCase } from "@shared/interfaces";
import type { CreateBrandDTO, FilterBrandDTO, UpdateBrandDTO } from "../model/dto";
import type { Brand } from "../model/model";

export interface IBrandUseCase
	extends IUseCase<Brand, CreateBrandDTO, UpdateBrandDTO, FilterBrandDTO> {}

export interface IBrandRepository
	extends IQueryRepository<BrandEntity, FilterBrandDTO>,
		ICommandRepository<CreateBrandDTO, UpdateBrandDTO> {}
