export interface IQueryRepository<Entity, GetEntityDTO = undefined> {
	get(id: string): Promise<Entity | null>;
	list(condition: GetEntityDTO): Promise<Entity[]>;
	findByCondition(condition: Record<string, any>): Promise<Entity | null>;
}

export interface ICommandRepository<CreateDTO, UpdateDTO> {
	insert(data: CreateDTO): Promise<string>;
	update(id: string, data: UpdateDTO): Promise<void>;
	delete(id: string): Promise<void>;
}

export interface ICommandHandler<CommandDTO, Result> {
	execute(command: CommandDTO): Promise<Result>;
}

export interface IQueryHandler<QueryDTO, Result> {
	query(query: QueryDTO): Promise<Result>;
}

export interface IUseCase<Entity, CreateDTO, UpdateDTO, GetDTO = undefined> {
	createData(data: CreateDTO): Promise<string>;
	updateData(id: string, data: UpdateDTO): Promise<boolean>;
	getData(id: string): Promise<Entity>;
	listData(filter: GetDTO): Promise<Entity[]>;
	deleteData(id: string): Promise<boolean>;
}
