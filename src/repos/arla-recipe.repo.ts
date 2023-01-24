import BaseRepo from './base.repo';
import {ArlaRecipeModel, IArlaRecipe} from "../models/arla-recipe.model";

class ArlaRecipeRepo extends BaseRepo<IArlaRecipe> {
	constructor() {
		super(ArlaRecipeModel);
	}
}

export default ArlaRecipeRepo;
