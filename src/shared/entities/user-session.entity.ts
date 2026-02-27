import { SessionType } from "@shared/constants/enum.constant";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TypeORMBaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity("user-sessions")
export class UserSesstionEntity extends TypeORMBaseEntity {
	@Column("uuid")
	userId: string;

	@Column("varchar")
	identityId: string;

	@Column("timestamp")
	expiredAt: Date;

	@Column("varchar", {
		nullable: true,
		default: null,
	})
	ip: string;

	@Column("text", {
		nullable: true,
		default: null,
	})
	geo: string;

	@Column("text", {
		nullable: true,
		default: null,
	})
	device: string;

	@Column("enum", {
		enum: SessionType,
		default: SessionType.ACCESS_TOKEN,
	})
	type: SessionType;

	@ManyToOne(
		(_type) => UserEntity,
		(user) => user.id,
	)
	@JoinColumn({ name: "userId" })
	user: UserEntity;
}
