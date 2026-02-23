import {
	type CreationOptional,
	DataTypes,
	type InferAttributes,
	type InferCreationAttributes,
	Model,
} from "sequelize";
import { sequelize } from "@/shared/components/sequelize";

export const modelName = "Brand";

export class BrandModel extends Model<
	InferAttributes<BrandModel>,
	InferCreationAttributes<BrandModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare description: string | null;
}

BrandModel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			defaultValue: null,
		},
	},
	{
		sequelize,
		modelName,
		tableName: "brands",
		timestamps: true,
	},
);
