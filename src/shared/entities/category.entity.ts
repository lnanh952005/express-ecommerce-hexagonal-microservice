import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity("categories")
export class CategoryEntity extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column("varchar")
	name: string;

	@OneToMany(
		(_type) => ProductEntity,
		(product) => product.category,
	)
	products: ProductEntity[];
}
