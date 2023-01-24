import { ICustomerObject } from '../models/customer.model';
import { IAdminObject } from '../models/admin.model';
import { IShopperObject } from '../models/shopper.model';
import { Request } from 'express';
import {IOrderObject} from "../models/order.model";

export interface IRequest extends Request {
	customer?: ICustomerObject;
	admin?: IAdminObject;
	shopper?: IShopperObject;
	body: any;
	query: any;
}

export interface CustomRequest<T> extends Request {
	body: T;
	query: any;
}

export interface OrderRequest{
	customer: ICustomerObject;
	order: IOrderObject;
}
