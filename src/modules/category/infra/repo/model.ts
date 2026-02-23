import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/shared/components/sequelize";

export class Category extends Model {}

export const modelName = "Category";

export const CategoryModel = Category.init(
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
	},
	{
		sequelize,
		modelName,
		tableName: "categories",
	},
);
