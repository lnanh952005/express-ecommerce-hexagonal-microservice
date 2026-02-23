export class AppError extends Error {
	statusCode?: number | undefined;
	constructor(message: string, statusCode?: number) {
		super(message);
		Object.setPrototypeOf(this, AppError.prototype);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

export const DataAlreadyExistsError = new AppError("Data already exists", 400);
export const DataNotFoundError = new AppError("Data not found", 404);
