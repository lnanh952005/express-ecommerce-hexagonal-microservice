import type { RequestHandler } from "express";
import type { PaginationDTO } from "@/shared/models";
import type { IBrandUseCase } from "../../interface";
import type { CreateBrandDTO } from "../../model/dto";

export class BrandHttpService {
	constructor(private readonly useCase: IBrandUseCase) {}

	createBrandAPI: RequestHandler<unknown, unknown, CreateBrandDTO> = async (req, res) => {
		const id = await this.useCase.createBrand(req.body);
		return res.status(201).json({ id });
	};

	updateBrandAPI: RequestHandler<{ id: string }, unknown, CreateBrandDTO> = async (req, res) => {
		const { id } = req.params;
		await this.useCase.updateBrand(id, req.body);
		return res.status(200).json({ message: "Brand updated" });
	};

	deleteBrandAPI: RequestHandler<{ id: string }> = async (req, res) => {
		const { id } = req.params;
		await this.useCase.deleteBrand(id);
		return res.status(200).json({ message: "Brand deleted" });
	};

	getBrandAPI: RequestHandler<{ id: string }> = async (req, res) => {
		const { id } = req.params;
		const Brand = await this.useCase.getBrandById(id);
		return res.status(200).json(Brand);
	};

	listBrandsAPI: RequestHandler<unknown, unknown, unknown, PaginationDTO> = async (req, res) => {
		const { limit, page } = req.query;
		const brands = await this.useCase.listBrands({ limit, page });
		return res.status(200).json(brands);
	};
}
