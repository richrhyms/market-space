import { Router } from 'express';
import RecipeCategoryController from '../controllers/recipe-category.controller';
// import { authenticateAdmin } from '../../middleware/auth';

const router = Router();
const recipeCategoryController = new RecipeCategoryController();

router
	.route('/')
	.get(recipeCategoryController.getAll)
	// .post(authenticateAdmin, recipeCategoryController.createOne)

router.route('/:id')
	.get(recipeCategoryController.getOne)
	// .patch(authenticateAdmin, recipeCategoryController.updateOne)
	// .delete(authenticateAdmin, recipeCategoryController.deleteOne);

export { router as recipeCategoryRoutes };
