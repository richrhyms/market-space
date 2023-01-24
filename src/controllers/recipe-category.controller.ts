import { RequestHandler } from 'express';
import RecipeCategoryService from '../services/recipe-category.service';
import { sendResponse } from '../utils/response';
import { handleValidationError } from '../validators';
import {
	validateRecipeCategoryCreation,
	validateRecipeCategoryUpdate
} from '../validators/recipe-category.validator';

const recipeCategoryService = new RecipeCategoryService();

export default class RecipeCategoryController {
	createOne: RequestHandler = async (req, res) => {
		/*  #swagger.tags = ['Recipe Categories'] */
		const {
			error,
			value: validRecipeCategory
		} = validateRecipeCategoryCreation(req.body);
		if (error) handleValidationError(error);

		/* #swagger.responses[201] = {
		schema: { "$ref": "#/definitions/RecipeCategories" },
		description: "RecipeCategory created successfully." } */
		sendResponse({
			res,
			message: 'recipeCategory created',
			data: { recipeCategory: await recipeCategoryService.createOne(validRecipeCategory) },
			statusCode: 201
		});
	};

	getAll: RequestHandler = async (_, res) => {
		/*  #swagger.tags = ['Recipe Categories'] */

		/* #swagger.responses[200] = {
		schema: { "$ref": "#/definitions/RecipeCategories" },
		description: "RecipeCategories retrieved successfully." } */
		sendResponse({
			res,
			message: 'recipeCategories',
			data: { categories: await recipeCategoryService.getAll() }
		});
	};

	getOne: RequestHandler = async (req, res) => {
		/*  #swagger.tags = ['Recipe Categories'] */

		/* #swagger.responses[200] = {
		schema: { "$ref": "#/definitions/RecipeCategories" },
		description: "RecipeCategory retrieved successfully." } */
		sendResponse({
			res,
			message: 'success',
			data: { recipeCategory: await recipeCategoryService.getOne(req.params.id) }
		});
	};

	updateOne: RequestHandler = async (req, res) => {
		/*  #swagger.tags = ['Recipe Categories'] */
		const {
			error,
			value: validRecipeCategory
		} = validateRecipeCategoryUpdate(req.body);

		if (error) handleValidationError(error);

		/* #swagger.responses[200] = {
		schema: { "$ref": "#/definitions/RecipeCategories" },
		description: "RecipeCategory updated successfully." } */
		sendResponse({
			res,
			message: 'recipeCategory updated',
			data: { recipeCategory: await recipeCategoryService.updateOne(req.params.id, validRecipeCategory) }
		});
	};

	deleteOne: RequestHandler = async (req, res) => {
		/*  #swagger.tags = ['Recipe Categories'] */

		/* #swagger.responses[200] = {
		schema: { "$ref": "#/definitions/RecipeCategories" },
		description: "RecipeCategory deleted successfully." } */
		sendResponse({
			res,
			message: 'recipeCategory deleted',
			data: { recipeCategory: await recipeCategoryService.deleteOne(req.params.id) }
		});
	};
}
