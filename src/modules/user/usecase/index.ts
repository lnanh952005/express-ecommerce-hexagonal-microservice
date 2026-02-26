import type { JwtService } from "@shared/components/jwt";
import { DataAlreadyExistsError, DataNotFoundError } from "@shared/models/error";
import { comparePassword, hashPassword } from "@shared/utils/bcrypt";
import type { IUserRepository, IUserUseCase } from "../interface";
import type {
	CreateUserDTO,
	FilterUserDTO,
	LoginDTO,
	RegisterDTO,
	UpdateUserDTO,
} from "../model/dto";
import { InvalidCredentialsError, UserAlreadyExistsError, UserNotFoundError } from "../model/error";
import { type User, userSchema } from "../model/model";

export class UserUseCase implements IUserUseCase {
	constructor(
		private readonly repository: IUserRepository,
		private readonly jwtService: JwtService,
	) {}

	async createData(data: CreateUserDTO): Promise<string> {
		const checkExist = await this.repository.findByCondition({ name: data.name });
		if (checkExist) {
			throw DataAlreadyExistsError;
		}
		const id = await this.repository.insert(data);
		return id;
	}
	async updateData(id: string, data: UpdateUserDTO): Promise<boolean> {
		const User = await this.repository.get(id);
		if (!User) {
			throw DataNotFoundError;
		}
		this.repository.update(id, data);
		return true;
	}
	async getData(id: string): Promise<User> {
		const User = await this.repository.get(id);
		if (!User) {
			throw DataNotFoundError;
		}
		return userSchema.parse(User);
	}
	async listData(filter: FilterUserDTO): Promise<User[]> {
		const Users = await this.repository.list(filter);
		return Users.map((User) => userSchema.parse(User));
	}
	async deleteData(id: string): Promise<boolean> {
		const User = await this.repository.get(id);
		if (!User) {
			throw DataNotFoundError;
		}
		await this.repository.delete(id);
		return true;
	}

	async login(dto: LoginDTO): Promise<{ accessToken: string; refreshToken: string }> {
		const user = await this.repository.findByCondition({ email: dto.email });
		if (!user) {
			throw UserNotFoundError;
		}
		const isMatch = comparePassword(dto.password, user.password);
		if (!isMatch) {
			throw InvalidCredentialsError;
		}
		const { accessToken, refreshToken } = this.jwtService.sign({ sub: user.id, role: user.role });
		return { accessToken, refreshToken };
	}

	async register(dto: RegisterDTO): Promise<true> {
		const user = await this.repository.findByCondition({ email: dto.email });
		if (user) {
			throw UserAlreadyExistsError;
		}
		const hashedPassword = hashPassword(dto.password);
		this.repository.insert({ ...dto, password: hashedPassword });
		return true;
	}
}
