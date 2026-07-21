
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

const envPath = path.join( __dirname, "../../.env" );

const result = dotenv.config( { path: envPath, quiet: true } );

if ( result.error )
{
    console.error( "Error loading environment variables", { error: result.error } );
    process.exit( 1 );
}