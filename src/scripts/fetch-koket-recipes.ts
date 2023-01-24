import axios from 'axios';
import { connectDB } from '../config/db';
import { load } from 'cheerio'
import { IKoketRecipeObject, KoketRecipeModel } from '../models/koket-recipe.model';

const hitsPerPage = 40
export const fetchKoketRecipeData = ()=> {
  connectDB()
      .then(async () => {
        async function fetchRecipes(page: number = 1) {
          const {hits: recipes, nbPages: numberOfPages} = (await axios({
            url: 'https://tdevjqoq7l-dsn.algolia.net/1/indexes/production_www_latest/query',
            method: 'post',
            headers: {
              'X-Algolia-Application-Id': 'TDEVJQOQ7L',
              'X-Algolia-Api-Key': 'f0dba4bb6a529419431b95b41c6bdcc1'
            },
            data: {
              "query": "",
              "maxValuesPerFacet": 100,
              "typoTolerance": "min",
              "queryType": "prefixNone",
              hitsPerPage,
              page,
              "attributesToRetrieve": [
                "id",
                "url",
                "name",
                "type",
                "computed_properties",
                "cooking_time",
                "image",
                "video",
                "profiles",
                "profile_type",
                "source",
                "source_image",
                "source_type",
                "sponsored",
                "sponsored_type",
                "sponsored_top_text",
                "hide_sponsor",
                "rating_value",
                "rating_count",
                "first_publish_at",
                "features"
              ],
              "attributesToHighlight": [],
              "numericFilters": [
                "latest_sort < 1664473080170",
                "type_id=0"
              ],
              "facets": "category_ids,profile_ids,source_id",
              "facetFilters": []
            }
          })).data

          for (let recipeDetails of recipes) {
            const recipePage = (await axios(`https://www.koket.se${recipeDetails.url}`)).data
            const $ = load(recipePage)
            let moreRecipeDetails = JSON.parse($('script[type="application/ld+json"]').text())[1]

            const koketRecipeDetails: IKoketRecipeObject = {
              ...recipeDetails,
              ...moreRecipeDetails,
              recipeInstructions: moreRecipeDetails.recipeInstructions.map((item: { text: string }) => item.text),
            }

            try {
              const koketRecipe = new KoketRecipeModel(koketRecipeDetails);
              await koketRecipe.save();
              console.log(`added ${koketRecipeDetails.name} to database`)
            } catch (error) {
              await KoketRecipeModel.findOneAndUpdate(
                  {code: koketRecipeDetails.url},
                  koketRecipeDetails
              );
              console.log(`updated ${koketRecipeDetails.name} in database`)
            }
          }

          if (page < numberOfPages) await fetchRecipes(++page)
        }

        await fetchRecipes(Math.floor(await KoketRecipeModel.countDocuments({}).exec() / hitsPerPage) + 1)
      })
      .then(() => console.log('\n\n\nDone!!!'))
      .catch((error) => console.log(error));
}