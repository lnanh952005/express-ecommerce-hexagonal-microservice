import type { IRPCCategoryQueryRepository } from "@modules/product/interface";
import { type ProductCategory, productCategorySchema } from "@modules/product/model/model";
import { myAxios } from "@shared/components/axios";
import type { AxiosError } from "axios";

export class RPCCategoryRepository implements IRPCCategoryQueryRepository {
	url: string;
	constructor() {
		this.url = "/api/v1/categories";
	}
	async findById(id: string): Promise<ProductCategory | null> {
		try {
			const { data } = await myAxios.instance.get(`${this.url}/${id}`);
			const category = productCategorySchema.parse(data.data);
			return category;
		} catch (error) {
			const err = error as AxiosError;
			console.log(err.response?.data);
			return null;
		}
	}
}
