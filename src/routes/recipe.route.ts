import { Router } from 'express';
import RecipeController from "../controllers/recipe.controller";

const router = Router();
const recipeController = new RecipeController();

router.get('/', recipeController.getRecipes);

router.get('/:id', recipeController.getOneRecipe);

/*router.post(
	'/chart-recipe-checkout',
	recipeController.chartCheckout
);*/
router.get('/search', recipeController.searchRecipes);

router.get(
	'/categories',
	recipeController.groupRecipeByCategories
);

router.get(
	'/fetch-popular-recipes',
	recipeController.fetchPopularRecipes
)
export { router as recipeRoutes };
