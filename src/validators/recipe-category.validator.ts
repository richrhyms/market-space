import Joi from 'joi';
import { Types } from 'mongoose';
import { anyObject } from '../@types';

const RecipeCategoryValidationSchema = {
  name: Joi.string(),
  recipes: Joi.array().custom((values: [], helpers) => {
    const errorIndex = values.findIndex(value => !Types.ObjectId.isValid(value))
    if (errorIndex === -1)
      return values
    else
      return helpers.error(`value specified at index ${errorIndex} for recipes is not a valid ObjectId`);
  }),
}

export function validateRecipeCategoryCreation(recipeCategory: anyObject) {
  return Joi.object({
    ...RecipeCategoryValidationSchema,
    name: RecipeCategoryValidationSchema.name.required(),
  }).validate(recipeCategory);
}

export function validateRecipeCategoryUpdate(recipeCategory: anyObject) {
  return Joi.object(RecipeCategoryValidationSchema)
    .validate(recipeCategory);
}
