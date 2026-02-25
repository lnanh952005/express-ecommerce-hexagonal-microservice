import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class BrandEntity extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column("text", {
		nullable: true,
		default: null,
	})
	description: string;
}
