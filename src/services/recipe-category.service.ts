import { Types } from 'mongoose';
import {IRecipeCategory, IRecipeCategoryObject, RecipeCategoryModel} from "../models/recipe-category.model";
import RecipeCategoryRepo from "../repos/recipe-category.repo";

const recipeCategoryRepo = new RecipeCategoryRepo();

export default class RecipeCategoryService {
	async createOne(data: IRecipeCategoryObject) {
		data.url = data.name!.toLowerCase().replace(/\s+/g, '-')
		return await recipeCategoryRepo.insertOne(data as IRecipeCategory);
	}

	async getOne(_id: string | Types.ObjectId) {
		return await RecipeCategoryModel.findOne({ _id })
		.populate({ path: 'recipes' })
		.lean()
		.exec();
	}

	async getAll() {
		return await RecipeCategoryModel.find()
			.populate({ path: 'recipes' })
			.lean()
			.exec();
	}

	async updateOne(_id: string | Types.ObjectId, data: IRecipeCategoryObject) {
		if (data.name) data.url = data.name.toLowerCase().replace(/\s+/g, '-')
		
		return await recipeCategoryRepo.findOneAndUpdate(
			{ _id },
			{ $set: data },
			{ new: true }
		);
	}

	async deleteOne(_id : string | Types.ObjectId ) {
		return await recipeCategoryRepo.deleteOne({ _id });
	}
}
