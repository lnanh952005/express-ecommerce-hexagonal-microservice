import type { Request, Response } from "express";
import type z from "zod";
import type { IUseCase } from "../interfaces";
import type { IResponse } from "../interfaces/fortmat-response";

export abstract class BaseHttpService<T extends IUseCase<any, any, any, any>> {
	constructor(
		protected readonly useCase: T,
		private readonly createSchema: z.ZodType,
		private readonly updateSchema: z.ZodType,
		private readonly filterSchema: z.ZodType,
	) {}

	async createDataAPI(req: Request, res: Response<IResponse>) {
		const body = this.createSchema.parse(req.body);
		const result = await this.useCase.createData(body);
		return res.status(201).json({ code: 201, data: result });
	}

	async updateDataAPI(req: Request<{ id: string }>, res: Response<IResponse>) {
		const { id } = req.params;
		const body = this.updateSchema.parse(req.body);
		const result = await this.useCase.updateData(id, body);
		return res.status(200).json({ code: 200, data: result });
	}

	async getDataAPI(req: Request<{ id: string }>, res: Response<IResponse>) {
		const { id } = req.params;
		const result = await this.useCase.getData(id);
		return res.status(200).json({ code: 200, data: result });
	}

	async listDataAPI(req: Request, res: Response<IResponse>) {
		const filter = this.filterSchema.parse(req.query);
		const result = await this.useCase.listData(filter);
		return res.status(200).json({ code: 200, data: result });
	}

	async deleteDataAPI(req: Request<{ id: string }>, res: Response<IResponse>) {
		const { id } = req.params;
		const result = await this.useCase.deleteData(id);
		return res.status(200).json({ code: 200, data: result });
	}
}
