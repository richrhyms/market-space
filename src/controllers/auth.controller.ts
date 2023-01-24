import { RequestHandler } from 'express';
import AuthService from '../services/auth.service';
import { sendResponse } from '../utils/response';
import {
	handleValidationError,
	validateCustomerRegistrationData
} from '../validators';

// import {GoogleAuthDto} from "../@types";
const authService = new AuthService();

class AuthController {
	customerGoogleSignIn: RequestHandler = async (req, res) => {
		const {token} = req.body as any ; //GoogleAuthDto;
		const { error, value: googleToken } = validateCustomerRegistrationData({token});
		if (error) return handleValidationError(error);

		const validToken = await authService.customerGoogleSignIn(googleToken.token);


		return sendResponse({
			res,
			statusCode: 201,
			data: { validToken },
			message: 'Sign in successful.'
		});
	};
}

export default AuthController;
