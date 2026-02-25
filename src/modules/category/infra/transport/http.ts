import { BaseHttpService } from "@/shared/components/base";
import type { ICategoryUseCase } from "../../interface";

export class CategoryHttpService extends BaseHttpService<ICategoryUseCase> {
	// createCategoryAPI: RequestHandler<unknown, IResponse, CreateCategoryDTO> = async (req, res) => {
	// 	const id = await this.useCase.createCategory(req.body);
	// 	return res.status(201).json({ code: 201, data: id });
	// };
	// updateCategoryAPI: RequestHandler<{ id: string }, IResponse, CreateCategoryDTO> = async (
	// 	req,
	// 	res,
	// ) => {
	// 	const { id } = req.params;
	// 	await this.useCase.updateCategory(id, req.body);
	// 	return res.status(200).json({ code: 200, message: "Category updated", data: true });
	// };
	// deleteCategoryAPI: RequestHandler<{ id: string }, IResponse> = async (req, res) => {
	// 	const { id } = req.params;
	// 	await this.useCase.deleteCategory(id);
	// 	return res.status(200).json({ code: 200, message: "Category deleted", data: true });
	// };
	// getCategoryAPI: RequestHandler<{ id: string }, IResponse> = async (req, res) => {
	// 	const { id } = req.params;
	// 	const category = await this.useCase.getCategory(id);
	// 	return res.status(200).json({ code: 200, data: category });
	// };
	// listCategoriesAPI: RequestHandler<unknown, IResponse, unknown, FilterCategoryDTO> = async (
	// 	req,
	// 	res,
	// ) => {
	// 	const categories = await this.useCase.listCategories(req.query);
	// 	return res.status(200).json({ code: 200, data: categories });
	// };
}
