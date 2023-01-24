import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { logger } from './utils/main.logger';
import { connectDB, disconnectDB } from './config/db';
import {loadRoutes} from "./config/routes";
import CronScheduler from "./utils/cronScheduler";
import {fetchRecipes} from "./utils/recipe-migration";


dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
loadRoutes(app);
connectDB().then(()=>{
    fetchRecipes().then(
        ()=>{
            new CronScheduler().cronInitiator();
        }
    );
});


/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

process.on('uncaughtException', function (err) {
    logger.error(err);
    logger.error(err.stack);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received.');
    logger.info('Closing http server.');
    server.close(() => {
        logger.info('Http server closed.');
        disconnectDB();
    });
});