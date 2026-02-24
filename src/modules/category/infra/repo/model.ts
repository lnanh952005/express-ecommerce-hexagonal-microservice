import { DataTypes, type InferAttributes, type InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "@/shared/components/sequelize";

export const modelName = "Category";

export class CategoryModel extends Model<
	InferAttributes<CategoryModel>,
	InferCreationAttributes<CategoryModel>
> {
	declare id: string;
	declare name: string;
}

CategoryModel.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName,
		tableName: "categories",
	},
);
