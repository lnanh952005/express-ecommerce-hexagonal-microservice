export interface ITokenPayload {
	sub: string;
	role: string;
}

export interface IJwtprovider {
	sign(payload: ITokenPayload): { accessToken: string; refreshToken: string };
	verifyAccessToken(token: string): ITokenPayload;
	verifyRefreshToken(token: string): ITokenPayload;
}
