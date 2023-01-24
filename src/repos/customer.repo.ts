import { CustomerModel, ICustomer } from '../models/customer.model';
import BaseRepo from './base.repo';

class CustomerRepo extends BaseRepo<ICustomer> {
	constructor() {
		super(CustomerModel);
	}
}

export default CustomerRepo;
