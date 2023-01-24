import { Document, Schema, model } from 'mongoose';

export interface IArlaRecipe extends Document {
	uid?: string;
  title?: string;
  url?: string;
	image?: string;
  cookingTimeText?: string;
  ratingAverageRounded?: number;
  ratingCount?: number;
  trackingData?: {
		portionCount?: number;
		cookingTime?: number;
		mealType?: string;
		ingredientCount?: number;
		arlaProductCount?: number;
	};
  ingredientGroups?: Array<{
		title: string;
		ingredients?: Array<{
			formattedName?: string;
			formattedAmount?: string;
			isArlaProduct?: boolean;
			pageUrl?: string;
			thumbnailUrl?: string;
		}>;
	}>;
  author?: {
    type?: string;
    name?: string;
  };
  description?: string;
  totalTime?: string;
  recipeYield?: string;
  recipeCategory?: string;
  recipeCuisine?: string;
  keywords?: string;
  nutrition?: {
    calories?: string;
    carbohydrateContent?: string;
    fatContent?: string;
    fiberContent?: string;
    proteinContent?: string;
  };
  recipeIngredient?: Array<string>;
  recipeInstructions?: Array<string>;
  aggregateRating?: {
    ratingValue?: string;
    ratingCount?: string;
  };
  video?: {
		description: string;
		thumbnailUrl: string;
		contentUrl: string;
		embedUrl: string;
		uploadDate: string;
	};
	migrated: boolean;
}

export interface IArlaRecipeObject {
	_id?: IArlaRecipe['_id'];
	uid?: IArlaRecipe['uid'];
  title?: IArlaRecipe['title'];
  url?: IArlaRecipe['url'];
	image?: IArlaRecipe['image'];
  cookingTimeText?: IArlaRecipe['cookingTimeText'];
  ratingAverageRounded?: IArlaRecipe['ratingAverageRounded'];
  ratingCount?: IArlaRecipe['ratingCount'];
  trackingData?: IArlaRecipe['trackingData'];
  ingredientGroups?: IArlaRecipe['ingredientGroups'];
  author?: IArlaRecipe['author'];
  description?: IArlaRecipe['description'];
  totalTime?: IArlaRecipe['totalTime'];
  recipeYield?: IArlaRecipe['recipeYield'];
  recipeCategory?: IArlaRecipe['recipeCategory'];
  recipeCuisine?: IArlaRecipe['recipeCuisine'];
  keywords?: IArlaRecipe['keywords'];
  nutrition?: IArlaRecipe['nutrition'];
  recipeIngredient?: IArlaRecipe['recipeIngredient'];
  recipeInstructions?: IArlaRecipe['recipeInstructions'];
  aggregateRating?: IArlaRecipe['aggregateRating'];
  video?: IArlaRecipe['video'];
  migrated?: IArlaRecipe['migrated'];
}

export const ArlaRecipeSchema = new Schema(
	{
		title: String,
		url: { type: String, unique: true, required: true },
		uid: { type: String, unique: true, required: true },
		image: String,
		cookingTimeText: String,
		ratingAverageRounded: Number,
		ratingCount: Number,
		trackingData: {
			portionCount: Number,
			cookingTime: Number,
			mealType: String,
			ingredientCount: Number,
			arlaProductCount: Number,
		},
		ingredientGroups: [{
			title: String,
			ingredients: [{
				formattedName: String,
				formattedAmount: String,
				isArlaProduct: Boolean,
				pageUrl: String,
				thumbnailUrl: String,
			}],
		}],
		author: Object,
		description: String,
		totalTime: String,
		recipeYield: String,
		recipeCategory: String,
		recipeCuisine: String,
		keywords: String,
		nutrition: {
			calories: String,
			carbohydrateContent: String,
			fatContent: String,
			fiberContent: String,
			proteinContent: String,
		},
		recipeIngredient: [String],
		recipeInstructions: [String],
		aggregateRating: Object,
		video: {
			description: String,
			thumbnailUrl: String,
			contentUrl: String,
			embedUrl: String,
			uploadDate: String,
		},
		migrated: Boolean
	},

	{ timestamps: true, }
);

ArlaRecipeSchema.index({ title: 1, url: 1 });

export const ArlaRecipeModel = model<IArlaRecipe>('ArlaRecipe', ArlaRecipeSchema);
