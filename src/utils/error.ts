export class AppError extends Error {
	statusCode?: number | undefined;
	constructor(message: string, statusCode?: number) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}
