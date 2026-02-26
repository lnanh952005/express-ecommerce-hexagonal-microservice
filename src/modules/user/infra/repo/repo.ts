import { v7 } from "uuid";

import { UserEntity } from "@/shared/entities/user.entity";
import type { IUserRepository } from "../../interface";
import type { CreateUserDTO, FilterUserDTO, UpdateUserDTO } from "../../model/dto";

export class UserRepository implements IUserRepository {
	async list(filter: FilterUserDTO): Promise<UserEntity[]> {
		const { page, limit, ...condition } = filter;
		const Users = await UserEntity.find({
			skip: (page - 1) * limit,
			take: limit,
			where: {
				...condition,
			},
		});
		return Users;
	}
	async get(id: string): Promise<UserEntity | null> {
		return await UserEntity.findOneBy({
			id,
		});
	}

	findByCondition(condition: Record<string, any>): Promise<UserEntity | null> {
		return UserEntity.findOneBy({
			...condition,
		});
	}

	async insert(data: CreateUserDTO): Promise<string> {
		const id = v7();
		await UserEntity.insert({
			id,
			...data,
		});
		return id;
	}
	async update(id: string, data: UpdateUserDTO): Promise<void> {
		await UserEntity.update(id, { ...data });
	}
	async delete(id: string): Promise<void> {
		await UserEntity.delete({ id });
	}
}
