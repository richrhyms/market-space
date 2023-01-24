import axios from 'axios';
import { ArlaRecipeModel, IArlaRecipeObject } from '../models/arla-recipe.model';
import { connectDB } from '../config/db';
import {load} from "cheerio/lib/slim";

export const fetchArlaRecipeData = ()=> {
  connectDB()
      .then(async () => {
        axios.defaults.baseURL = 'https://www.arla.se';

        async function fetchRecipes(skip: number = 0) {
          const {items: recipes, totalCount} = (await axios(`/cvi/facet/api/sv/recipes?skip=${skip}`)).data.gridCards

          for (let recipeDetails of recipes) {
            const {ingredientGroups} = (await axios(`/cvi/recipes/api/sv/ingredients/${recipeDetails.uid}`)).data
            recipeDetails.ingredientGroups = ingredientGroups

            const recipePage = (await axios(recipeDetails.url)).data
            const $ = load(recipePage)
            let moreRecipeDetails = JSON.parse($('script[type="application/ld+json"]').text())[2]

            const arlaRecipeDetails: IArlaRecipeObject = {
              uid: recipeDetails.uid,
              title: recipeDetails.title,
              url: recipeDetails.url,
              image: moreRecipeDetails.image,
              cookingTimeText: recipeDetails.cookingTimeText,
              ratingAverageRounded: recipeDetails.ratingAverageRounded,
              ratingCount: recipeDetails.ratingCount,
              trackingData: {
                portionCount: recipeDetails.buyButton.portionCount,
                cookingTime: recipeDetails.trackingData.cookingTime,
                mealType: recipeDetails.trackingData.mealType,
                ingredientCount: recipeDetails.trackingData.ingredientCount,
                arlaProductCount: recipeDetails.trackingData.arlaProductCount,
              },
              ingredientGroups: recipeDetails.ingredientGroups,
              author: {
                type: moreRecipeDetails.author.type,
                name: moreRecipeDetails.author.name,
              },
              description: moreRecipeDetails.description,
              totalTime: moreRecipeDetails.totalTime,
              recipeYield: moreRecipeDetails.recipeYield,
              recipeCategory: moreRecipeDetails.recipeCategory,
              recipeCuisine: moreRecipeDetails.recipeCuisine,
              keywords: moreRecipeDetails.keywords,
              nutrition: moreRecipeDetails.nutrition ? {
                calories: moreRecipeDetails.nutrition.calories,
                carbohydrateContent: moreRecipeDetails.nutrition.carbohydrateContent,
                fatContent: moreRecipeDetails.nutrition.fatContent,
                fiberContent: moreRecipeDetails.nutrition.fiberContent,
                proteinContent: moreRecipeDetails.nutrition.proteinContent,
              } : {},
              recipeIngredient: moreRecipeDetails.recipeIngredient,
              recipeInstructions: moreRecipeDetails.recipeInstructions[0]?.itemListElement.map((item: { text: string }) => item.text),
              aggregateRating: moreRecipeDetails.aggregateRating ? {
                ratingValue: moreRecipeDetails.aggregateRating.ratingValue,
                ratingCount: moreRecipeDetails.aggregateRating.ratingCount,
              } : {},
              video: moreRecipeDetails.video ? {
                description: moreRecipeDetails.video.description,
                thumbnailUrl: moreRecipeDetails.video.thumbnailUrl,
                contentUrl: moreRecipeDetails.video.contentUrl,
                embedUrl: moreRecipeDetails.video.embedUrl,
                uploadDate: moreRecipeDetails.video.uploadDate,
              } : moreRecipeDetails.video,
            }

            try {
              const arlaRecipe = new ArlaRecipeModel(arlaRecipeDetails);
              await arlaRecipe.save();
              console.log(`added ${arlaRecipeDetails.title} to database`)
            } catch (error) {
              await ArlaRecipeModel.findOneAndUpdate(
                  {code: arlaRecipeDetails.url},
                  arlaRecipeDetails
              );
              console.log(`updated ${arlaRecipeDetails.title} in database`)
            }
          }

          if (skip + recipes.length < totalCount) await fetchRecipes(skip + recipes.length)
        }

        await fetchRecipes(await ArlaRecipeModel.countDocuments({}).exec())
      })
      .then(() => console.log('\n\n\nDone!!!'))
      .catch((error) => console.log(error));
}