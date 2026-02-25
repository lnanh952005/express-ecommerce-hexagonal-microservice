import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { BrandEntity } from "./brand.entity";
import { CategoryEntity } from "./category.entity";

@Entity("products")
export class ProductEntity extends BaseEntity {
	@PrimaryColumn('uuid')
	id: string;

	@Column('string')
	name: string;

	@Column("double")
	price: number;

	@Column("double")
	salePrice: number;

	@Column('string')
	colors: string;

	@Column('integer')
	quantity: number;

	@ManyToOne((_type) => BrandEntity)
	@JoinColumn()
	brand: BrandEntity;

	@ManyToOne((_type) => CategoryEntity)
	@JoinColumn()
	category: CategoryEntity;

	@Column('text')
	content: string;

	@Column('text')
	description: string;

	@Column('double')
	rating: number;

	@Column('integer')
	saleCount: number;

	@Column('enum',{
		enum: ["ACTIVE", "INACTIVE", "DELETED"],
		default: "ACTIVE",
	})
	status: string;
}
