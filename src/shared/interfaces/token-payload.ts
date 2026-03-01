import type { ROLE } from "@shared/constants/index.constant";

export interface ITokenPayload {
	sub: string;
	role: keyof typeof ROLE;
}

export interface IJwtprovider {
	sign(payload: ITokenPayload): { accessToken: string; refreshToken: string };
	verifyAccessToken(token: string): ITokenPayload;
	verifyRefreshToken(token: string): ITokenPayload;
}
