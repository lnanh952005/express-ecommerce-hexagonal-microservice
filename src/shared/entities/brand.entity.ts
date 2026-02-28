import { Column, Entity, OneToMany } from "typeorm";
import { TypeORMBaseEntity } from "./base.entity";
import { ProductEntity } from "./product.entity";

@Entity("brands")
export class BrandEntity extends TypeORMBaseEntity {
	@Column("varchar")
	name: string;

	@Column("text", {
		nullable: true,
		default: null,
	})
	description: string;

	@Column("varchar", {
		nullable: true,
		default: null,
	})
	tagLine: string;

	@Column("varchar", {
		nullable: true,
		default: null,
	})
	image: string;

	@OneToMany(
		(_type) => ProductEntity,
		(product) => product.brand,
	)
	products: ProductEntity[];
}
