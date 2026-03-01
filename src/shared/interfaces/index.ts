export interface IQueryRepository<Entity, FilterDTO> {
	findById(id: string): Promise<Entity | null>;
	findByIds(ids: string[]): Promise<Entity[]>;
	findAll(filter: FilterDTO): Promise<Entity[]>;
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

export interface IUseCase<Entity, CreateDTO, UpdateDTO, FilterDTO> {
	createData(dto: CreateDTO): Promise<string>;
	updateData(id: string, dto: UpdateDTO): Promise<boolean>;
	getData(id: string): Promise<Entity>;
	listData(filter: FilterDTO): Promise<Entity[]>;
	deleteData(id: string): Promise<boolean>;
}
