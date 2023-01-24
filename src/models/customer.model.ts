import { Document, Schema, model } from 'mongoose';

enum Subscriptions {
	Premium = 'premium',
	Regular = 'regular'
}

enum Classifications {
	Active = 'active',
	Churned = 'churned',
	Returned = 'returned',
	Loyal = 'loyal'
}

interface ICustomer extends Document {
	email: string;
	lastName: string;
	firstName: string;
	deviceId: string;
	avatar: string;
	phoneNumber: string;
	addresses: string[];
	subscription: Subscriptions;
	classification: Classifications;
	ipAddress: string;
	shopperRating: number;
	loyaltyPoints: number;
	loyaltyRank: number;
	friends: string; // TODO
	inviteToken: string;
	lastLogin: Date;
	active: boolean;
}

interface ICustomerObject {
	_id?: ICustomer['_id'];
	email?: ICustomer['email'];
	lastName?: ICustomer['lastName'];
	firstName?: ICustomer['firstName'];
	deviceId?: ICustomer['deviceId'];
	avatar?: ICustomer['avatar'];
	phoneNumber?: ICustomer['phoneNumber'];
	addresses?: ICustomer['addresses'];
	subscription?: ICustomer['subscription'];
	classification?: ICustomer['classification'];
	ipAddress?: ICustomer['ipAddress'];
	shopperRating?: ICustomer['shopperRating'];
	loyaltyPoints?: ICustomer['loyaltyPoints'];
	loyaltyRank?: ICustomer['loyaltyRank'];
	friends?: ICustomer['friends'];
	inviteToken?: ICustomer['inviteToken'];
	lastLogin?: ICustomer['lastLogin'];
	active?: ICustomer['active'];
}

const CustomerSchema = new Schema(
	{
		active: { type: Boolean, default: false },
		email: { type: String, trim: true, required: true },
		lastName: { type: String, trim: true, required: true },
		firstName: { type: String, trim: true, required: true },
		deviceId: { type: String, trim: true, required: true },
		avatar: { type: String, trim: true },
		phoneNumber: { type: String, trim: true },
		addresses: { type: [String] },
		subscription: {
			type: String,
			enum: Object.values(Subscriptions),
			default: Subscriptions.Regular,
			required: true
		},
		classification: {
			type: String,
			enum: Object.values(Classifications)
		},
		ipAddress: { type: String, trim: true, required: true },
		shopperRating: { type: Number, required: true },
		loyaltyPoints: { type: Number, required: true },
		loyaltyRank: { type: Number, required: true },
		friends: { type: String, trim: true, required: true },
		inviteToken: { type: String, required: true },
		lastLogin: { type: Date, default: null },
		appleId: { type: String, trim: true },
		googleId: { type: String, trim: true }
	},
	{ timestamps: true }
);

CustomerSchema.index({ email: 1 });

const CustomerModel = model<ICustomer>('Customer', CustomerSchema);

export {
	CustomerModel,
	ICustomer,
	CustomerSchema,
	ICustomerObject,
	Classifications,
	Subscriptions
};


