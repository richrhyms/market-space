import {sendResponse} from '../utils/response';
import {RequestHandler} from 'express';
import {QueryParams} from '../@types';
import {paginateData } from '../utils';
import RecipeService from "../services/recipe.service";
import {IRecipeObject} from "../models/recipe.model";


const recipeService = new RecipeService();

class RecipeController {
	getRecipes: RequestHandler = async (req, res) => {
		const { pageNo, pageSize } = req.query as QueryParams;
		const paginationOptions = paginateData(pageNo!, pageSize!);

		const recipeList = (await recipeService.getRecipes({...paginationOptions})).map((res:any)=> res as IRecipeObject);

		sendResponse({
			res,
			message: 'List of recipes',
			data: { recipeList }
		});
	};

	getOneRecipe: RequestHandler = async (req, res) => {
		const recipeId = req.params.id;
		const foundRecipe = await recipeService.getOneRecipe(recipeId).then((res:any)=> res as IRecipeObject);

		sendResponse({
			res,
			message: `Returned recipe with id:${recipeId}`,
			data: { foundRecipe }
		});
	};

	groupRecipeByCategories: RequestHandler = async (req, res) => {
		const recipeList = await recipeService.groupRecipesByCategories();
		const categories = await recipeService.getUniqueRecipeCategories();

		sendResponse({
			res,
			message: 'List of recipe by categories',
			data: { recipeList, categories }
		});
	};

	searchRecipes: RequestHandler = async (req, res) => {
		const { query } = req.query as QueryParams;

		const searchObject = {
			indexName: 'recipes',
			params: {
				query: query
			}
		};
		return sendResponse({
			res,
			data: { recipes: [] }
		});
	};

	fetchPopularRecipes: RequestHandler = async (req, res) => {
		const { pageNo, pageSize } = req.query as QueryParams;
		const paginationOptions = paginateData(pageNo!, pageSize!);

		const popularRecipes = await recipeService.getPopularRecipes(paginationOptions);

		sendResponse({
			res,
			message: 'List of popular recipes',
			data: { popularRecipes }
		});
	};
}

export default RecipeController;
