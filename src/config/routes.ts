import { Application } from 'express';
import { authRoutes } from '../routes/auth.route';
import {recipeRoutes} from "../routes/recipe.route";
import { recipeCategoryRoutes } from '../routes/recipe-category.route';


export const loadRoutes = (app: Application) => {
	// API Routes
	app.use('/api/auth', authRoutes);
	app.use('/api/recipe', recipeRoutes);
	app.use('/api/recipe-categories', recipeCategoryRoutes);
};
