import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
export class CategoryEntity extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column('string')
	name: string;
}
