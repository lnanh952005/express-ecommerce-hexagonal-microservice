import type { RequestHandler } from "express";
import type { ICategoryUseCase } from "../../interface";
import type { CreateCategoryDTO, GetCategoryDTO } from "../../model/dto";

export class CategoryHttpService {
	constructor(private readonly useCase: ICategoryUseCase) { }

	createCategoryAPI: RequestHandler<unknown, unknown, CreateCategoryDTO> = async (req, res) => {
		const { name } = req.body;
		const id = await this.useCase.createCategory({ name });
		return res.status(201).json({ id });
	};

	updateCategoryAPI: RequestHandler<{ id: string }, unknown, CreateCategoryDTO> = async (
		req,
		res,
	) => {
		const { id } = req.params;
		const { name } = req.body;
		await this.useCase.updateCategory(id, { name });
		return res.status(200).json({ message: "Category updated" });
	};

	deleteCategoryAPI: RequestHandler<{ id: string }> = async (req, res) => {
		const { id } = req.params;
		await this.useCase.deleteCategory(id);
		return res.status(200).json({ message: "Category deleted" });
	};

	getCategoryAPI: RequestHandler<{ id: string }> = async (req, res) => {
		const { id } = req.params;
		const category = await this.useCase.getCategory(id);
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}
		return res.status(200).json(category);
	};

	listCategoriesAPI: RequestHandler<unknown, unknown, unknown, GetCategoryDTO> = async (
		req,
		res,
	) => {

		const categories = await this.useCase.listCategories(req.query);
		return res.status(200).json(categories);
	};
}
