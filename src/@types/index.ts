import { Response } from 'express';


export interface ResponseParam<T> {
	res: Response<ResponseBody<T>>;
}

export interface ResponseBody<T> {
	message?: string;
	data?: T;
	statusCode?: number;
	success?: boolean;
}

export interface ResponseParams {
	res: Response;
	message?: string;
	data?: anyObject;
	statusCode?: number;
}
export type anyObject = Record<string, unknown>;

export interface QueryParams {
	query?: any;
	pageNo?: string;
	pageSize?: string;
	withRecipes?: string;
	withShopper?: string;
	withUser?: string;
	customerId?: any;
}
export interface GoogleAuthDto {
	token: string;
}