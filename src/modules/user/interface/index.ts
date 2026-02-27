import type { UserEntity } from "@shared/entities/user.entity";
import type { ICommandRepository, IQueryRepository, IUseCase } from "@shared/interfaces";
import type {
	CreateUserDTO,
	FilterUserDTO,
	LoginDTO,
	RegisterDTO,
	UpdateUserDTO,
} from "../model/dto";
import type { Profile, User } from "../model/model";

export interface IUserUseCase extends IUseCase<User, CreateUserDTO, UpdateUserDTO, FilterUserDTO> {
	login(dto: LoginDTO): Promise<{ accessToken: string; refreshToken: string }>;
	register(dto: RegisterDTO): Promise<true>;
	getProfile(id: string): Promise<Profile>;
}

export interface IUserRepository
	extends IQueryRepository<UserEntity, FilterUserDTO>,
		ICommandRepository<CreateUserDTO, UpdateUserDTO> {}
