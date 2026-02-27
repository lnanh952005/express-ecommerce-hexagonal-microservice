import { ModelStatus } from "@shared/constants/enum.constant";
import type { IJwtprovider, ITokenPayload } from "@shared/interfaces/token-payload";
import { DataNotFoundError } from "@shared/models/error";
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
import { type Profile, profileSchema, type User, userSchema } from "../model/model";

export class UserUseCase implements IUserUseCase {
	constructor(
		private readonly repository: IUserRepository,
		private readonly jwtService: IJwtprovider,
	) {}

	async createData(dto: CreateUserDTO): Promise<string> {
		const checkExist = await this.repository.findByCondition({ email: dto.email });
		if (checkExist) {
			throw UserAlreadyExistsError;
		}
		const hashedPassword = hashPassword(dto.password);
		const id = await this.repository.insert({ ...dto, password: hashedPassword });
		return id;
	}
	async updateData(id: string, dto: UpdateUserDTO): Promise<boolean> {
		const user = await this.repository.get(id);
		if (!user) {
			throw DataNotFoundError;
		}
		if (dto.password) {
			dto.password = hashPassword(dto.password);
		}
		this.repository.update(id, dto);
		return true;
	}
	async getData(id: string): Promise<User> {
		const user = await this.repository.get(id);
		console.log(user);
		if (!user) {
			throw DataNotFoundError;
		}
		return userSchema.parse(user);
	}
	async listData(filter: FilterUserDTO): Promise<User[]> {
		const users = await this.repository.list(filter);
		return users.map((user) => userSchema.parse(user));
	}
	async deleteData(id: string): Promise<boolean> {
		const user = await this.repository.get(id);
		if (!user || user.status === ModelStatus.DELETED) {
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

	async getProfile(id: string): Promise<Profile> {
		const user = await this.repository.get(id);
		return profileSchema.parse(user);
	}

	verifyToken(token: string): Promise<ITokenPayload> {
		throw new Error("Method not implemented.");
	}
}
