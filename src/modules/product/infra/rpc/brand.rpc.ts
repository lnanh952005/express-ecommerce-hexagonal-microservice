import type { IRPCBrandQueryRepository } from "@modules/product/interface";
import { type ProductBrand, productBrandSchema } from "@modules/product/model/model";
import { myAxios } from "@shared/components/axios";
import type { AxiosError } from "axios";

export class RPCBrandRepository implements IRPCBrandQueryRepository {
	private url: string = "/api/v1/brands";

	async findById(id: string): Promise<ProductBrand | null> {
		try {
			const { data } = await myAxios.instance.get(`${this.url}/${id}`);
			const brand = productBrandSchema.parse(data.data);
			return brand;
		} catch (error) {
			const err = error as AxiosError;
			console.log(err.response?.data);
			return null;
		}
	}
}
