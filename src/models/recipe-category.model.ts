import { Document, Schema, model, Types } from 'mongoose';
import { IRecipe, IRecipeObject } from "./recipe.model";

interface IRecipeCategory extends Document {
	name: string;
	url: string;
	recipes: [string | Types.ObjectId | IRecipeObject];
}

interface IRecipeCategoryObject {
	_id?: IRecipeCategory['_id'];
	name?: IRecipeCategory['name'];
	url?: IRecipeCategory['url'];
	recipes?: IRecipeCategory['recipes'];
}

const RecipeCategorySchema = new Schema(
	{
		name: { type: String, unique: true, required: true, trim: true },
		url: { type: String, unique: true, required: true, trim: true },
		recipes: {
			type: [{ type: Types.ObjectId, ref: 'Recipe' }],
			required: true,
		},
	},
	{ timestamps: true }
);

RecipeCategorySchema.index({ name: 'text', url: 'text' });

const RecipeCategoryModel = model<IRecipeCategory>(
	'RecipeCategory',
	RecipeCategorySchema
);

export { RecipeCategoryModel, RecipeCategorySchema, IRecipeCategoryObject, IRecipeCategory };