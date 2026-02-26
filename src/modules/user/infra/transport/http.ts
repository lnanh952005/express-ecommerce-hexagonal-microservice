import type { LoginDTO, RegisterDTO } from "@modules/user/model/dto";
import { BaseHttpService } from "@shared/components/base";
import type { IResponse } from "@shared/interfaces/fortmat-response";
import type { Request, Response } from "express";
import type z from "zod";
import type { IUserUseCase } from "../../interface";

export class UserHttpService extends BaseHttpService<IUserUseCase> {
	private readonly loginSchema: z.ZodType<LoginDTO>;
	private readonly registerSchema: z.ZodType<RegisterDTO>;
	constructor(
		useCase: IUserUseCase,
		createSchema: z.ZodType,
		updateSchema: z.ZodType,
		filterSchema: z.ZodType,
		loginSchema: z.ZodType<LoginDTO>,
		registerSchema: z.ZodType<RegisterDTO>,
	) {
		super(useCase, createSchema, updateSchema, filterSchema);
		this.loginSchema = loginSchema;
		this.registerSchema = registerSchema;
	}

	async loginAPI(req: Request, res: Response<IResponse>) {
		const body = this.loginSchema.parse(req.body);
		const result = await this.useCase.login(body);
		return res.status(200).json({ code: 200, data: result });
	}

	async registerAPI(req: Request, res: Response<IResponse>) {
		const body = this.registerSchema.parse(req.body);
		const result = await this.useCase.register(body);
		return res.status(201).json({ code: 201, data: result });
	}
}
