import { Document, Schema, model } from 'mongoose';


export enum RecipeSourceConstant {
	KOKET = 'KOKET',
	ARLA = 'ARLA',
}
export enum RecipeStatusConstant {
	ON_SALE = 'ON_SALE',
	NOT_ON_SALE = 'NOT_ON_SALE',
	OTHER = 'OTHER',
}

export interface IRecipeIngredient {
	name?: string;
	quantity?: string;
	unit?: string;
	notIncluded?: boolean;
}

export interface IRecipe extends Document {
	source?: RecipeSourceConstant;
	author?: {
    type?: string;
    name?: string;
  };
	name?: string;
	url?: string;
	image?: string;
	cookingTime?: string;
	description?: string;
	recipeYield?: string;
	recipeIngredients?: IRecipeIngredient[];
	recipeInstructions?: Array<string>;
	thumbnail?: string;
	categoryGroupText?: string;
	category?: string;
	categories?: Array<string>;
	tax?: string;
	storeId?: string;
	youFoodCode?: string;
	status?: RecipeStatusConstant;
	quantity: number;
	averageWeight?: number;
	nutrition?: {
		calories?: string;
		carbohydrateContent?: string;
		fatContent?: string;
		fiberContent?: string;
		proteinContent?: string;
	};
	priceData: {
		amount: string;
		value: number;
		comparePrice?: string;
		comparePriceUnit?: string;
		unit: string;
	};
	aggregateRating?: {
		ratingValue?: string;
		ratingCount?: string;
		bestRating?: string;
		worstRating?: string;
	};
	video?: {
		description?: string;
		thumbnailUrl?: string;
		contentUrl?: string;
		embedUrl?: string;
		uploadDate?: string;
	};
	popularityScore: number;
}

export interface IRecipeObject {
	source?: IRecipe['source'];
	author?: IRecipe['author'];
	name?: IRecipe['name'];
	url?: IRecipe['url'];
	image?: IRecipe['image'];
	cookingTime?: IRecipe['cookingTime'];
	description?: IRecipe['description'];
	recipeYield?: IRecipe['recipeYield'];
	recipeIngredients?: IRecipe['recipeIngredients'];
	recipeInstructions?: IRecipe['recipeInstructions'];
	thumbnail?: IRecipe['thumbnail'];
	categoryGroupText?: IRecipe['categoryGroupText'];
	category?: IRecipe['category'];
	categories?: IRecipe['categories'];
	tax?: IRecipe['tax'];
	storeId?: IRecipe['storeId'];
	youFoodCode?: IRecipe['youFoodCode'];
	status?: IRecipe['status'];
	quantity?: IRecipe['quantity'];
	averageWeight?: IRecipe['averageWeight'];
	nutrition?: IRecipe['nutrition'];
	priceData?: IRecipe['priceData'];
	aggregateRating?: IRecipe['aggregateRating'];
	video?: IRecipe['video'];
	popularityScore?: IRecipe['popularityScore'];
}

export const RecipeSchema = new Schema(
	{
		source: String,
		author: Object,
		name: String,
		url: String,
		image: String,
		cookingTime: String,
		description: String,
		recipeYield: String,
		recipeIngredients: [{
			name: String,
			quantity: String,
			unit: String,
			notIncluded: Boolean,
		}],
		recipeInstructions: [String],
		thumbnail: String,
		categoryGroupText: String,
		category: String,
		categories: [String],
		tax: String,
		storeId: String,
		youFoodCode: String,
		status: String,
		quantity: Number,
		priceData: {
			amount: String,
			value: Number,
			comparePrice: String,
			comparePriceUnit: String,
			unit: String,
		},
		aggregateRating: {
			ratingValue: String,
			ratingCount: String,
			bestRating: String,
			worstRating: String,
		},
		averageWeight:Number,
		video: {
			description: String,
			thumbnailUrl: String,
			contentUrl: String,
			embedUrl: String,
			uploadDate: String,
		},
		nutrition: {
			calories: String,
			carbohydrateContent: String,
			fatContent: String,
			fiberContent: String,
			proteinContent: String,
		},
		popularityScore: Number,
	},

	{ timestamps: true, }
);


export const Recipe = {
	source: "ARLA",
	name: "recipe_name",
	url: "https://recipe_link",
	image: "String",
	cookingTime: "String",
	description: "String",
	recipeYield: "String",
	recipeIngredients: [{
		name: "String",
		quantity: "String",
		unit: "String",
		notIncluded: false,
	}],
	recipeInstructions: ["String"],
	thumbnail: "String",
	categoryGroupText: "String",
	category: "String",
	categories: ["String"],
	tax: "String",
	storeId: "String",
	youFoodCode: "String",
	status: "String",
	quantity: "Number",
	priceData: {
		amount: "String",
		value: "Number",
		comparePrice: "String",
		comparePriceUnit: "String",
		unit: "String",
	},
	aggregateRating: {
		ratingValue: "String",
		ratingCount: "String",
		bestRating: "String",
		worstRating: "String",
	},
	video: {
		description: "String",
		thumbnailUrl: "String",
		contentUrl: "String",
		embedUrl: "String",
		uploadDate: "String",
	},
	nutrition: {
		calories: "String",
		carbohydrateContent: "String",
		fatContent: "String",
		fiberContent: "String",
		proteinContent: "String",
	},
	popularityScore: "Number",
}

RecipeSchema.index({ name: 'text', url: 'text' });

export const RecipeModel = model<IRecipe>('Recipe', RecipeSchema);