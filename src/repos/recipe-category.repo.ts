import BaseRepo from './base.repo';
import {IRecipeCategory, RecipeCategoryModel} from "../models/recipe-category.model";

class RecipeCategoryRepo extends BaseRepo<IRecipeCategory> {
	constructor() {
		super(RecipeCategoryModel);
	}
}

export default RecipeCategoryRepo;
