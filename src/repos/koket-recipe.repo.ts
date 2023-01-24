import BaseRepo from './base.repo';
import {IKoketRecipe, KoketRecipeModel} from "../models/koket-recipe.model";

class KoketRecipeRepo extends BaseRepo<IKoketRecipe> {
	constructor() {
		super(KoketRecipeModel);
	}
}

export default KoketRecipeRepo;
