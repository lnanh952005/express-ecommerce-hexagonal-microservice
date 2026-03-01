import type { IProductQueryRepository } from "@modules/cart/interface";
import { type CartProduct, cartProductSchema } from "@modules/cart/model/model";
import { myAxios } from "@shared/components/axios";

export class RPCProductQueryRepository implements IProductQueryRepository {
	private readonly url: string = "api/v1/products";
	async findById(id: string): Promise<CartProduct | null> {
		try {
			const { data } = await myAxios.instance.get(`${this.url}/${id}`);
			return cartProductSchema.parse(data.data);
		} catch (error: any) {
			console.log(error.message);
			return null;
		}
	}
	async findByIds(ids: string[]): Promise<CartProduct[]> {
		try {
			const { data } = await myAxios.instance.post(`${this.url}/list-by-ids`, { ids });
			return data.data.map((item: any) => cartProductSchema.parse(item));
		} catch (error: any) {
			console.log(error.message);
			return [];
		}
	}
}
