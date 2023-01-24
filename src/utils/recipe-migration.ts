import ArlaRecipeRepo from "../repos/arla-recipe.repo";
import {IArlaRecipeObject} from "../models/arla-recipe.model";
import {IRecipeIngredient, IRecipeObject, RecipeSourceConstant, RecipeStatusConstant} from "../models/recipe.model";
import RecipeService from "../services/recipe.service";
import {IKoketRecipeObject} from "../models/koket-recipe.model";
import KoketRecipeRepo from "../repos/koket-recipe.repo";
import {logger} from "./main.logger";
import {fetchArlaRecipeData} from "../scripts/fetch-arla-recipes";
import {fetchKoketRecipeData} from "../scripts/fetch-koket-recipes";

const recipeService = new RecipeService();
const arlaRecipeRepo = new ArlaRecipeRepo();
const koketRecipeRepo = new KoketRecipeRepo();

const ingredientUnits = new Set(['g', 'dl', 'msk', 'cm', 'tsk'])

export async function fetchRecipes() {
	const recipes = await recipeService.getRecipes({skip:0,limit:1}) as any[];
	if(recipes.length > 0){
		logger.info('Skipping Data fetch command cron:  Recipe data already exist!💃');
		return;
	}
	await fetchArlaRecipeData();
	await fetchKoketRecipeData();
	await migrateRecipes();
}

export async function migrateRecipes( limit: number = 10) {
	await migrateArlaRecipes(limit);
	await migrateKoketRecipes(limit);
}

function mapRecipeIngredients(ingredients: string[]) {
	return ingredients.map(ingredient => {
		ingredient = ingredient.replace(/^ca\s+/g, '')
		const ingredientArr = ingredient.split(/\s+/)
		
		const res: IRecipeIngredient = { notIncluded: false }
		if (/^[\d.,½¼¾]+$/.test(ingredientArr[0])) {
			res.quantity = ingredientArr[0]
			if (ingredientUnits.has(ingredientArr[1])) {
				res.unit = ingredientArr[1]
				res.name = ingredientArr.slice(2).join(' ')
			} else {
				res.name = ingredientArr.slice(1).join(' ')
			}
		}
		else {
			res.name = ingredient
		}

		return res
	})
}

export async function migrateArlaRecipes(limit: number = 10) {
	try {
		const pendingArlaRecipes: IArlaRecipeObject[] = (await arlaRecipeRepo.find({migrated: {$ne:true}}, {limit:limit}))
			.map(res=> res as IArlaRecipeObject)
			.filter(obj=> (obj.image!=null  && obj.title!=null));

		for (const arla of pendingArlaRecipes) {
			logger.info('running cron:  Migrating recipe data', arla);
			let res:IRecipeObject = {
				source : RecipeSourceConstant.ARLA,
				author: arla.author,
				name: arla.title,
				url: arla.url,
				image: arla.image,
				cookingTime: arla.cookingTimeText,
				description: arla.description,
				recipeYield: arla.recipeYield,
				recipeIngredients: mapRecipeIngredients(arla.recipeIngredient!),
				recipeInstructions: arla.recipeInstructions,
				thumbnail: arla.image,
				categoryGroupText: arla.recipeCategory,
				category: arla.recipeCategory,
				categories: arla.keywords?.split(','),
				tax: '',
				storeId: arla.uid,
				youFoodCode:'YF_' + RecipeSourceConstant.ARLA + arla.uid,
				status: RecipeStatusConstant.ON_SALE,
				averageWeight: arla.ratingAverageRounded,
				nutrition: arla.nutrition,
				priceData: {
					amount: '10',
					value: 10,
					unit: 'kr',
				},
				aggregateRating: arla.aggregateRating,
				video: arla.video,
				popularityScore: 0.01
			}
			logger.info('Migrating recipe data... converted ', res);

			const created = await recipeService.createRecipe(res);
			logger.info('Migrating recipe data... created ', created);

			const updated = await arlaRecipeRepo.findOneAndUpdate(
				{ _id: arla._id },
				{ $set: {migrated: true} },
				{ new: true }
			);
			logger.info('Migrating recipe data... Updated ', updated);

		}
	} catch (error) {
		console.log(error);
	}
}

export async function migrateKoketRecipes(limit: number = 10) {
	try {
		const pendingKoketRecipes: IKoketRecipeObject[] = (await koketRecipeRepo.find({migrated: {$ne:true}}, {limit:limit}))
			.map(res=> res as IKoketRecipeObject)
			.filter(obj=> (obj.url!=null && obj.name!=null));

		for (const koket of pendingKoketRecipes) {
			logger.info('Migrating recipe data... found ', koket);

			let res:IRecipeObject = {
				source : RecipeSourceConstant.KOKET,
				author: koket.author,
				name: koket.name,
				url: koket.url,
				image: koket.image,
				cookingTime: koket.cooking_time,
				description: koket.description,
				recipeYield: koket.recipeYield,
				recipeIngredients: mapRecipeIngredients(koket.recipeIngredient!),
				recipeInstructions: koket.recipeInstructions,
				thumbnail: koket.image,
				categoryGroupText: '',
				category: '',
				categories: [],
				tax: '',
				storeId: koket.id,
				youFoodCode:'YF_' + RecipeSourceConstant.KOKET + koket.id,
				status: RecipeStatusConstant.ON_SALE,
				nutrition: {calories: koket.description},
				priceData: {
					amount: '10',
					value: 10,
					unit: 'kr',
				},
				aggregateRating: koket.aggregateRating,
				video: koket.video,
				popularityScore: 0.01
			}

			logger.info('Migrating recipe data... converted ', res);
			const created = await recipeService.createRecipe(res);
			logger.info('Migrating recipe data... created ', created);

			const updated = await koketRecipeRepo.findOneAndUpdate(
				{ _id: koket._id },
				{ $set: {migrated: true} },
				{ new: true }
			);
			logger.info('Migrating recipe data... Updated ', updated);

		}
	} catch (error) {
		console.log(error);
	}
}