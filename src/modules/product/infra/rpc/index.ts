import type { IRPCBrandQueryRepository } from "@modules/product/interface";
import type { ProductBrand } from "@modules/product/model/model";

export class ProxyRPCBrandRepository implements IRPCBrandQueryRepository {
	constructor(private readonly rpcBrandRepo: IRPCBrandQueryRepository) {}
	private cache: Record<string, ProductBrand> = {};

	async findById(id: string): Promise<ProductBrand | null> {
		if (this.cache[id]) {
			return this.cache[id];
		}
		const brand = await this.rpcBrandRepo.findById(id);
		if (brand) {
			this.cache[brand.id] = brand;
		}
		return brand;
	}
}
