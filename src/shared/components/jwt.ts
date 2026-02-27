import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import type { IJwtprovider, ITokenPayload } from "../interfaces/token-payload";

export class JwtService implements IJwtprovider {
	constructor(
		private readonly accessKey: string,
		private readonly refreshKey: string,
		private readonly accessExpiresIn: StringValue,
		private readonly refreshExpiresIn: StringValue,
	) {}

	sign(payload: ITokenPayload) {
		const accessToken = jwt.sign(payload, this.accessKey, {
			expiresIn: this.accessExpiresIn,
		});
		const refreshToken = jwt.sign(payload, this.refreshKey, {
			expiresIn: this.refreshExpiresIn,
		});
		return { accessToken, refreshToken };
	}

	verifyAccessToken(token: string) {
		return jwt.verify(token, this.accessKey) as ITokenPayload;
	}

	verifyRefreshToken(token: string) {
		return jwt.verify(token, this.refreshKey) as ITokenPayload;
	}
}
