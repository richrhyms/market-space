import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library/build/src/auth/oauth2client';
import CustomerRepo from '../repos/customer.repo';
import { UserError } from '../utils/errorHandler';
import { anyObject } from '../@types';

type GooglePayload = {
	given_name?: string;
	family_name?: string;
	email?: string;
	email_verified?: boolean;
	picture?: string;
};

const CONFIG = process.env;

const customerRepo = new CustomerRepo();
const oauth2Client = new OAuth2Client(CONFIG.GOOGLE_CLIENT_ID);


class AuthService {
	async customerGoogleSignIn(token: string) {
		const {
			email,
			given_name,
			family_name,
			picture
		} = await this.verifyGoogleToken(token);
		console.log(email, 'email');
		return await this.doSingUp(email!,given_name!,family_name!,picture!)
	}

	async login(user: anyObject) {
		return this.generateJWT(user);
	}


	async doSingUp(email: string, given_name: string, family_name: string, picture: string) {
		let customer = await customerRepo.findOne({ email });

		if (customer) return this.login(customer);

		const customerObject = this.buildCustomerObject(
			given_name,
			family_name,
			email,
			picture,
			null
		);

		customer = await customerRepo.insert(customerObject);
		console.log(customer, 'customer');
		return this.generateJWT(customer);
	}

	async verifyGoogleToken(token: string) {
		const ticket = await oauth2Client.verifyIdToken({
			idToken: token,
			audience: this.getAudienceFromEnv()
		});

		const {
			email,
			email_verified,
			given_name,
			family_name,
			picture
		} = ticket.getPayload() as GooglePayload;

		if (!email_verified) throw new UserError('Email unverified');

		return { email, given_name, family_name, picture };
	}


	buildCustomerObject(
		givenName: string,
		familyName: string,
		email: string,
		picture: any,
		appleId: any
	): any {
		return {
			email: email!,
			avatar: picture!,
			firstName: givenName!,
			lastName: familyName!,
			deviceId: 'deviceId', // @TODO DON'T FORGET TO REPLACE WITH ACTUAL DEVICE ID!!!!!!!!
			phoneNumber: '',
			addresses: [],
			ipAddress: 'ipAddress',
			shopperRating: 0,
			loyaltyPoints: 0,
			loyaltyRank: 0,
			friends: 'friends',
			appleId: appleId,
			inviteToken: 'inviteToken'
		};
	}

	generateJWT(payload: any) {
		const token = jwt.sign({ ...payload }, CONFIG.JWT_PRIVATE_KEY!, {
			expiresIn: CONFIG.JWT_EXPIRY_TIME
		});

		return token;
	}


	getAudienceFromEnv(): string | string[]{
		const audience = CONFIG.OAUTH_AUDIENCE_IDS?.split(",") ?? [];
		console.log('AUDIENCE::', audience)
		return audience;
	}
}

export default AuthService;
