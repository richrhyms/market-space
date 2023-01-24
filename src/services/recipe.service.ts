import { QueryOptions } from 'mongoose';
import RecipeRepo from "../repos/recipe.repo";
import {IRecipeObject} from "../models/recipe.model";


const recipeRepo = new RecipeRepo();


class RecipeService {
	async createRecipe(recipe: IRecipeObject) {
		return await recipeRepo.insertOne(recipe);
	}

	async groupRecipesByCategories() {
		return await recipeRepo.aggregate([
			{ $limit: 200 },
			// First Stage
			{
				$unwind: { path: '$categories', preserveNullAndEmptyArrays: true }
			},
			// Second Stage
			{
				$group: {
					_id: '$categories',
					recipes: { $push: '$$ROOT' },
					numberOfRecipes: {
						$sum: 1
					}
				}
			},
			{
				$sort: { numberOfRecipes: -1 }
			},
			{ $limit: 10 }
		]);
	}
	async getUniqueRecipeCategories() {
		return await recipeRepo.distinct('categories', {});
	}

	async editRecipe(id: string, data: IRecipeObject) {
		return await recipeRepo.findOneAndUpdate(
			{ _id: id },
			{ $set: data },
			{ new: true }
		);
	}

	async getOneRecipe(id: string){
		return await recipeRepo.findOne({ _id: id });
	}

	async getRecipes({
		skip,
		limit,
	}: {
		skip: number;
		limit: number;
	}) {
		return await recipeRepo.find({}, { skip, limit });
	}

	async getPopularRecipes(paginationOptions: QueryOptions) {
		return await recipeRepo.find({
			popularityScore: {
				$gt: 0,
			}
		}, {
			sort: { popularityScore: 'desc' },
			...paginationOptions,
		});
	}
	
	async handleSearchQuery(query: string, paginationOptions: QueryOptions) {
		return await recipeRepo.find(
			{
				$text: {
					$search: query,
					$caseSensitive: false
				}
			},
			{ ...paginationOptions, projection: { score: { $meta: 'textScore' } } });
	}

	// Please don't use this
	async __getRecipes() {
		return await recipeRepo.find({}, {});
	}

	async fetchPopularRecipes() {

	}
}

export default RecipeService;
