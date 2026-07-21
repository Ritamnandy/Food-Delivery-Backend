
import mongoose from "mongoose";
import { logger } from "../utils/logger.js";
import { Db_Name } from "../constants.js";


const URL = `${ process.env.MONGODB_URL as string }/${ Db_Name }?authSource=admin`;


export const connectDb = async () =>
{
    try
    {
        const response = await mongoose.connect( URL );
        logger.info( "Database connected", { port: response.connection.port } );
    } catch ( error )
    {
        if ( error instanceof mongoose.Error )
        {
            logger.error( "Database connection failed", {
                error: error.message,
            } );

        }
        throw error instanceof Error ? error.message : new Error( "Something went wrong during database connection" );
    }
}

