import { BaseEntity, CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

export abstract class TypeORMBaseEntity extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
