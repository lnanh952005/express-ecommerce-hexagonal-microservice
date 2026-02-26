import { Column, Entity } from "typeorm";
import { TypeORMBaseEntity } from "./base.entity";

@Entity("users")
export class UserEntity extends TypeORMBaseEntity {
	@Column("text")
	email: string;

	@Column("varchar")
	name: string;

	@Column("text")
	password: string;

	@Column("enum", {
		enum: ["USER", "ADMIN"],
		default: "USER",
	})
	role: string;
}
