
import "./configs/env.config.js";
import { logger } from "./utils/logger.js";
// import app from "./app.js";
import { connectDb } from "./db/connect.db.js";


connectDb().then( () =>
{
    // app.listen( process.env.PORT, () =>
    // {
    //     logger.info( `Server running on http://localhost:${ process.env.PORT }` );
    // } );
} ).catch( ( error ) =>
{
    logger.error( "Database connection failed and server failed to start", { error } );
} );