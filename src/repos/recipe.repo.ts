import BaseRepo from './base.repo';
import {IRecipe, RecipeModel} from "../models/recipe.model";

class RecipeRepo extends BaseRepo<IRecipe> {
	constructor() {
		super(RecipeModel);
	}
}

export default RecipeRepo;
