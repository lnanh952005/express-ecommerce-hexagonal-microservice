import type {
	CreateProductDTO,
	FilterProductDTO,
	ListProductByIdsDTO,
	UpdateProductDTO,
} from "@modules/product/model/dto";
import { BaseHttpService } from "@shared/components/base";
import type { Request, Response } from "express";
import type z from "zod";
import type { IProductUseCase } from "../../interface";

export class ProductHttpService extends BaseHttpService<IProductUseCase> {
	private readonly listProductByIdsSchema: z.ZodType<ListProductByIdsDTO>;
	constructor(
		useCase: IProductUseCase,
		createProductSchema: z.ZodType<CreateProductDTO>,
		updateProductSchema: z.ZodType<UpdateProductDTO>,
		filterProductSchema: z.ZodType<FilterProductDTO>,
		listProductByIdsSchema: z.ZodType<ListProductByIdsDTO>,
	) {
		super(useCase, createProductSchema, updateProductSchema, filterProductSchema);
		this.listProductByIdsSchema = listProductByIdsSchema;
	}

	listByIdsApi(req: Request, res: Response) {
		const body = this.listProductByIdsSchema.parse(req.body);
		const result = this.useCase.listByIds(body.ids);
		return res.status(200).json({ code: 200, data: result });
	}
}
