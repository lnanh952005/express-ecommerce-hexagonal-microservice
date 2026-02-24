import type { ICommandRepository, IQueryRepository, IUseCase } from "@/shared/interfaces";
import type { BrandModel } from "../infra/repo/model";
import type { CreateBrandDTO, GetBrandDTO, UpdateBrandDTO } from "../model/dto";
import type { Brand } from "../model/model";

export interface IBrandUseCase
	extends IUseCase<Brand, CreateBrandDTO, UpdateBrandDTO, GetBrandDTO> {}

export interface IBrandRepository
	extends IQueryRepository<BrandModel, GetBrandDTO>,
		ICommandRepository<CreateBrandDTO, UpdateBrandDTO> {}
