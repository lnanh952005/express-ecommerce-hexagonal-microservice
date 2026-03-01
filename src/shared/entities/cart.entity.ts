import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { TypeORMBaseEntity } from "./base.entity";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

@Entity("cart-items")
@Index(["userId", "productId"], { unique: true })
export class CartItemEntity extends TypeORMBaseEntity {
	@Column("uuid")
	userId: string;

	@Column("uuid")
	productId: string;

	@Column("integer")
	quantity: number;

	@ManyToOne(
		(_type) => UserEntity,
		(user) => user.carts,
	)
	@JoinColumn({ name: "userId" })
	user: UserEntity;

	@ManyToOne(
		(_type) => ProductEntity,
		(product) => product.carts,
	)
	@JoinColumn({ name: "productId" })
	product: ProductEntity;
}
