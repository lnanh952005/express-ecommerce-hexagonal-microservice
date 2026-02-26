import type { AxiosError } from "axios";
import type {
	IRPCBrandQueryRepository,
	IRPCCategoryQueryRepository,
} from "@modules/product/interface";
import {
	type ProductBrand,
	type ProductCategory,
	productBrandSchema,
	productCategorySchema,
} from "@modules/product/model/model";
import { myAxios } from "@shared/components/axios";

export class RPCBrandRepository implements IRPCBrandQueryRepository {
	private url: string = "/api/v1/brands";

	async get(id: string): Promise<ProductBrand | null> {
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

export class RPCCategoryRepository implements IRPCCategoryQueryRepository {
	url: string;
	constructor() {
		this.url = "/api/v1/categories";
	}
	async get(id: string): Promise<ProductCategory | null> {
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

export class ProxyRPCBrandRepository implements IRPCBrandQueryRepository {
	constructor(private readonly rpcBrandRepo: IRPCBrandQueryRepository) {}
	private cache: Record<string, ProductBrand> = {};

	async get(id: string): Promise<ProductBrand | null> {
		if (this.cache[id]) {
			return this.cache[id];
		}
		const brand = await this.rpcBrandRepo.get(id);
		if (brand) {
			this.cache[brand.id] = brand;
		}
		return brand;
	}
}
