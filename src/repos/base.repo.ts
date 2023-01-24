import {
	Model,
	Document,
	UpdateQuery,
	QueryOptions,
	FilterQuery,
} from 'mongoose';
import { anyObject } from '../@types';

class BaseRepo<T extends Document> {
	protected constructor(private model: Model<T>) {}

	async insert(data: any): Promise<any| null> {
		return (await this.model.create(data)).toObject();
	}

	async insertOne(data: any) {
		return await this.model.create(data);
	}

	async insertMany(data: T[]) {
		return await this.model.insertMany(data);
	}

	async findById(id: string) {
		return await this.model.findById(id).lean().exec();
	}

	async findOne(query: FilterQuery<T>, options: QueryOptions = {}) {
		return await this.model.findOne(query, null, options).lean().exec();
	}

	async find(query: FilterQuery<T>, options: QueryOptions) {
		return await this.model.find(query, null, options).lean().exec();
	}

	async updateOne(findQuery: FilterQuery<T>, updateQuery: UpdateQuery<T>) {
		return this.model.updateOne(findQuery, updateQuery).exec();
	}

	async updateMany(findQuery: FilterQuery<T>, updateQuery: UpdateQuery<T>) {
		return this.model.updateMany(findQuery, updateQuery).exec();
	}

	async findOneAndUpdate(
		findQuery: FilterQuery<T>,
		updateQuery: UpdateQuery<T>,
		options: QueryOptions,
		populate: anyObject = {}
	) {
		return this.model
			.findOneAndUpdate(findQuery, updateQuery, {
				...options,
				new: true,
				...populate
			})
			.lean()
			.exec();
	}

	async deleteOne(query: FilterQuery<T>) {
		return await this.model.deleteOne(query).exec();
	}

	async deleteMany(query: FilterQuery<T>) {
		return await this.model.deleteMany(query).exec();
	}

	async distinct(key: string, query: FilterQuery<T>) {
		return await this.model.distinct(key, query).exec();
	}
	async findOneAndDelete(query: FilterQuery<T>) {
		return await this.model.findOneAndDelete(query).exec();
	}

	async aggregate(pipeline: any[]) {
		return this.model.aggregate(pipeline).exec();
	}
}

export default BaseRepo;
