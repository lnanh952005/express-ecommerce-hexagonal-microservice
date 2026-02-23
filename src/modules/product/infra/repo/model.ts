import {
	type CreationOptional,
	DataTypes,
	type InferAttributes,
	type InferCreationAttributes,
	Model,
} from "sequelize";
import { sequelize } from "@/shared/components/sequelize";
import type { ModelStatus } from "@/shared/models";

export const modelName = "Product";

export class ProductModel extends Model<
	InferAttributes<ProductModel>,
	InferCreationAttributes<ProductModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;

    declare price: number;
    declare salePrice: number;
    declare colors: string;
    declare quantity: number;
    declare brandId: number;
    declare categoryId: number;
    declare content: string;
    declare description: string;
    declare rating: number;
    declare saleCount: number;
    declare status: ModelStatus
    declare createdAt: Date;
    declare updatedAt: Date;
}

export class BrandModel extends Model<
	InferAttributes<BrandModel>,
	InferCreationAttributes<BrandModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
}

export class CategoryModel extends Model<
	InferAttributes<CategoryModel>,
	InferCreationAttributes<CategoryModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
}



ProductModel.init(
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
		timestamps: true,
		tableName: "products",
	},
);
