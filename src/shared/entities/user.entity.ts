import { Gender, ModelStatus, UserRole } from "@shared/constants/enum.constant";
import { Column, Entity, OneToMany } from "typeorm";
import { TypeORMBaseEntity } from "./base.entity";
import { CartItemEntity } from "./cart.entity";
import { UserIdentityEntity } from "./user-identity.entity";
import type { UserSesstionEntity } from "./user-session.entity";

@Entity("users")
export class UserEntity extends TypeORMBaseEntity {
	@Column("text")
	email: string;

	@Column("text")
	password: string;

	@Column("varchar")
	firstName: string;

	@Column("varchar")
	lastName: string;

	@Column("text", {
		nullable: true,
		default: null,
	})
	avatar: string;

	@Column("varchar", {
		nullable: true,
		default: null,
	})
	phone: string;

	@Column("text", {
		nullable: true,
		default: null,
	})
	address: string;

	@Column("timestamp", {
		nullable: true,
		default: null,
	})
	dob: Date;

	@Column("enum", {
		enum: Gender,
		nullable: true,
		default: null,
	})
	gender: Gender;

	@Column("enum", {
		enum: ModelStatus,
		default: ModelStatus.ACTIVE,
	})
	status: ModelStatus;

	@Column("enum", {
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;

	@OneToMany(
		(_type) => UserIdentityEntity,
		(identity) => identity.user,
	)
	identities: UserIdentityEntity[];

	@OneToMany(
		(_type) => UserIdentityEntity,
		(session) => session.user,
	)
	sessions: UserSesstionEntity[];

	@OneToMany(
		(_type) => CartItemEntity,
		(cart) => cart.user,
	)
	carts: CartItemEntity[];
}
