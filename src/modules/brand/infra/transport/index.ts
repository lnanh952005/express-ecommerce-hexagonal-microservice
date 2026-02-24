import type { RequestHandler } from "express";
import type { IResponse } from "@/shared/interfaces/fortmat-response";
import type { PaginationDTO } from "@/shared/models";
import type { IBrandUseCase } from "../../interface";
import type { CreateBrandDTO } from "../../model/dto";

export class BrandHttpService {
	constructor(private readonly useCase: IBrandUseCase) {}

	createBrandAPI: RequestHandler<unknown, IResponse, CreateBrandDTO> = async (req, res) => {
		const id = await this.useCase.createData(req.body);
		return res.status(201).json({ code: 201, data: id });
	};

	updateBrandAPI: RequestHandler<{ id: string }, IResponse, CreateBrandDTO> = async (req, res) => {
		const { id } = req.params;
		await this.useCase.updateData(id, req.body);
		return res.status(200).json({ code: 200, message: "Brand updated", data: true });
	};

	deleteBrandAPI: RequestHandler<{ id: string }, IResponse> = async (req, res) => {
		const { id } = req.params;
		await this.useCase.deleteData(id);
		return res.status(200).json({ code: 200, message: "Brand deleted", data: true });
	};

	getBrandAPI: RequestHandler<{ id: string }, IResponse> = async (req, res) => {
		const { id } = req.params;
		const brand = await this.useCase.getData(id);
		return res.status(200).json({ code: 200, data: brand });
	};

	listBrandsAPI: RequestHandler<unknown, IResponse, unknown, PaginationDTO> = async (req, res) => {
		const brands = await this.useCase.listData(req.query);
		return res.status(200).json({ code: 200, data: brands });
	};
}
