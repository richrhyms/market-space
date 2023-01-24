import Joi, { ValidationError as InputError } from 'joi';
import { ValidationError } from '../utils/errorHandler';
import {anyObject, GoogleAuthDto} from '../@types';
import { logger } from '../utils/main.logger';

export const handleValidationError = (error: InputError) => {
	const { details } = error;
	const errorMessage = details[0].message;
	logger.error(errorMessage);
	throw new ValidationError(errorMessage);
};

export const validateCustomerRegistrationData = (data: GoogleAuthDto | anyObject) => {
	const schema = Joi.object({
		token: Joi.string().trim().required()
	});

	return schema.validate(data);
};

export const validateAdminRegistrationData = (data: anyObject) => {
	const schema = Joi.object({
		email: Joi.string().required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		password: Joi.string().required(),
		role: Joi.string().required()
	});

	return schema.validate(data);
};
