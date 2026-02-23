export interface IRepository<Entity, CreateDTO, UpdateDTO, ConditionDTO = undefined>
	extends IQueryRepository<Entity, ConditionDTO>,
		ICommandRepository<CreateDTO, UpdateDTO> {}

export interface IQueryRepository<Entity, ConditionDTO = undefined> {
	get(id: string): Promise<Entity | null>;
	list(condition: ConditionDTO): Promise<Entity[]>;
}

export interface ICommandRepository<CreateDTO, UpdateDTO> {
	insert(data: CreateDTO): Promise<number>;
	update(id: string, data: UpdateDTO): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}
