import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity("brands")
export class BrandEntity extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column("varchar")
	name: string;

	@Column("text", {
		nullable: true,
		default: null,
	})
	description: string;

	@OneToMany(
		(_type) => ProductEntity,
		(product) => product.brand,
	)
	products: ProductEntity[];
}
