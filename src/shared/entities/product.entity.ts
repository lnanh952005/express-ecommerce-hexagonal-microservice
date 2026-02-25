import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";
import { BrandEntity } from "./brand.entity";
import { CategoryEntity } from "./category.entity";

@Entity("products")
export class ProductEntity extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column("varchar")
	name: string;

	@Column("double")
	price: number;

	@Column("double")
	salePrice: number;

	@Column("varchar")
	colors: string;

	@Column("integer")
	quantity: number;

	@Column("text")
	content: string;

	@Column("longtext")
	description: string;

	@Column("double")
	rating: number;

	@Column("integer")
	saleCount: number;

	@Column("enum", {
		enum: ["ACTIVE", "INACTIVE", "DELETED"],
		default: "ACTIVE",
	})
	status: string;

	@Column("varchar")
	brandId: string;

	@Column("varchar")
	categoryId: string;

	@ManyToOne(
		(_type) => BrandEntity,
		(brand) => brand.products,
	)
	@JoinColumn({ name: "brandId" })
	brand: BrandEntity;

	@ManyToOne(
		(_type) => CategoryEntity,
		(category) => category.products,
	)
	@JoinColumn({ name: "categoryId" })
	category: CategoryEntity;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
