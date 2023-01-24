import cron from 'node-cron';
import { logger } from './main.logger';
import {migrateRecipes} from "./recipe-migration";
import {connectDB} from "../config/db";

const { RUN_RECIPE_MIGRATION } = process.env;
const { MIGRATION_DATA_LIMIT } = process.env;
class CronScheduler {
	async cronInitiator() {
		// Handle Recipe migrations
		cron.schedule('* * * * *', async () => {
			if(MIGRATION_DATA_LIMIT && (RUN_RECIPE_MIGRATION==='TRUE')){
				logger.info('running cron to migrate recipe data from sources to our recipe model');
				await migrateRecipes(Number(MIGRATION_DATA_LIMIT));
			}
		});
	}
}

export default CronScheduler;
