
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) =>
{
    let error = err
    if ( !( error as ApiError ) )
    {
        let statusCode = 500
        let message = "something went wrong"
        let errors = [ "unknown error" ]
        if ( error instanceof mongoose.Error.CastError )
        {
            statusCode = 400
            message = `invalid ${ error.path } ${ error.value }`
            errors = [ message ]

        } else if ( ( error as any )?.code === 11000 )
        {
            // duplicate key error 
            statusCode = 400
            const field = Object.keys( ( error as any ).keyValue || {} ).join( ", " )
            message = `${ field } already exists`
            errors = [ message ]
        } else if ( error instanceof mongoose.Error.ValidationError )
        {
            statusCode = 400
            message = Object.values( error.errors ).map( ( { message } ) => message ).join( ", " )
            errors = [ message ]
        } else if ( error instanceof jwt.JsonWebTokenError )
        {
            statusCode = 401
            message = "invalid token"
            errors = [ error.message ]
        } else if ( error instanceof jwt.TokenExpiredError )
        {
            statusCode = 401
            message = "token expired"
            errors = [ "Unauthorized request please login or register again" ]
        } else if ( error instanceof Error )
        {
            statusCode = ( error as any ).statusCode || 500
            message = error.message || message
            errors = [ message ]
        }
        error = new ApiError( statusCode, message, [], error instanceof Error ? error.stack : undefined )
    }
    const apiError = error as ApiError
    const response = {
        success: false,
        message: apiError.message,
        errors: apiError.error || [],
        data: apiError.data,
        ...( process.env.NODE_ENV === "development" ? { stack: apiError.stack } : {} ),
    };
    if ( apiError.statusCode >= 500 )
    {
        console.error( apiError );
    }
    return res.status( apiError.statusCode || 500 ).json( response );
}

export { errorHandler }