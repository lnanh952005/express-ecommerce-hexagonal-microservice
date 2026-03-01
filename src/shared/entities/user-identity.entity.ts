import { IdentifyType, ModelStatus } from "@shared/constants/enum.constant";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { TypeORMBaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity("user-identities")
export class UserIdentityEntity extends TypeORMBaseEntity {
	@Column("uuid")
	userId: string;

	@Column("varchar")
	identifier: string;

	@Column("text")
	password: string;

	@Column("enum", {
		enum: ModelStatus,
		default: ModelStatus.ACTIVE,
	})
	status: ModelStatus;

	@Column("enum", {
		enum: IdentifyType,
		default: IdentifyType.EMAIL_PASSWORD,
	})
	type: IdentifyType;

	@ManyToOne(
		(_type) => UserEntity,
		(user) => user.id,
	)
	@JoinColumn({ name: "userId" })
	user: UserEntity;
}
