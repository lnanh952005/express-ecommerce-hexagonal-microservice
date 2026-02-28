import { Column, Entity, OneToMany } from "typeorm";
import { TypeORMBaseEntity } from "./base.entity";
import { ProductEntity } from "./product.entity";

@Entity("categories")
export class CategoryEntity extends TypeORMBaseEntity {
	@Column("varchar")
	name: string;

	@Column("text", {
		nullable: true,
		default: null,
	})
	image: string;

	@Column("text", {
		nullable: true,
		default: null,
	})
	description: string;

	@Column("varchar")
	position: string;

	@Column("uuid")
	parentId: string;

	@OneToMany(
		(_type) => ProductEntity,
		(product) => product.category,
	)
	products: ProductEntity[];
}
