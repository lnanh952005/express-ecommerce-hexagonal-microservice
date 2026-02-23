export interface IRepository<Entity, CreateDTO, UpdateDTO, GetEntityDTO = undefined>
	extends IQueryRepository<Entity, GetEntityDTO>,
	ICommandRepository<CreateDTO, UpdateDTO> { }

export interface IQueryRepository<Entity, GetEntityDTO> {
	get(id: string): Promise<Entity | null>;
	list(condition: GetEntityDTO): Promise<Entity[]>;
	findByCondition(condition: Record<string, any>): Promise<Entity | null>;
}

export interface ICommandRepository<CreateDTO, UpdateDTO> {
	insert(data: CreateDTO): Promise<number>;
	update(id: string, data: UpdateDTO): Promise<void>;
	delete(id: string): Promise<void>;
}


export interface ICommandHandler<CommandDTO, Result> {
	execute(command: CommandDTO): Promise<Result>;
}


export interface IQueryHandler<QueryDTO, Result> {
	query(query: QueryDTO): Promise<Result>;
}

export interface IUseCase {
	a: string;
}