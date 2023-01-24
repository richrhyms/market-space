import '../config';
import { ArlaRecipeModel } from '../models/arla-recipe.model';
import { KoketRecipeModel } from '../models/koket-recipe.model';
import { connectDB } from '../config/db';
import { migrateArlaRecipes, migrateKoketRecipes } from '../utils/recipe-migration'

connectDB().then(async() => {
  migrateArlaRecipes(await ArlaRecipeModel.countDocuments({}).exec())
    .then(() => console.log('\n\nARLA RECIPES DONE!!!'));
  migrateKoketRecipes(await KoketRecipeModel.countDocuments({}).exec())
    .then(() => console.log('\n\nKOKET RECIPES DONE!!!'));
})
