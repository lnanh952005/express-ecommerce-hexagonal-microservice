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
	declare id: string;
	declare name: string;

	declare price: number;
	declare salePrice: number;
	declare colors: string;
	declare quantity: number;
	declare brandId: string;
	declare categoryId: string;
	declare content?: string;
	declare description?: string;
	declare rating: number;
	declare saleCount: number;
	declare status: CreationOptional<ModelStatus>;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
}

ProductModel.init(
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
		brandId: {
			type: DataTypes.UUID,
		},
		categoryId: {
			type: DataTypes.UUID,
		},
		colors: {
			type: DataTypes.STRING,
		},
		content: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		price: {
			type: DataTypes.DECIMAL,
		},
		quantity: {
			type: DataTypes.INTEGER,
		},
		rating: {
			type: DataTypes.DECIMAL,
		},
		status: {
			type: DataTypes.ENUM("ACTIVE", "INACTIVE", "DELETED"),
			defaultValue: "ACTIVE",
		},
		saleCount: {
			type: DataTypes.INTEGER,
		},
		salePrice: {
			type: DataTypes.DECIMAL,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		sequelize,
		modelName,
		timestamps: true,
		tableName: "products",
	},
);

export class ProductBrandModel extends Model<
	InferAttributes<ProductBrandModel>,
	InferCreationAttributes<ProductBrandModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
}

ProductBrandModel.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "ProductBrand",
		timestamps: false,
		tableName: "brands",
	},
);

export class ProductCategoryModel extends Model<
	InferAttributes<ProductCategoryModel>,
	InferCreationAttributes<ProductCategoryModel>
> {
	declare id: CreationOptional<number>;
	declare name: string;
}

ProductCategoryModel.init(
	{
		id: {
			primaryKey: true,
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "ProductCategory",
		timestamps: false,
		tableName: "categories",
	},
);

ProductModel.belongsTo(ProductCategoryModel, { foreignKey: "categoryId" });
ProductCategoryModel.hasMany(ProductModel, { foreignKey: "categoryId" });

ProductModel.belongsTo(ProductBrandModel, { foreignKey: "brandId" });
ProductBrandModel.hasMany(ProductModel, { foreignKey: "brandId" });
