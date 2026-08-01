
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import type { UserDocument, AccessTokenPayload } from "../models/index.js";
import { authServices } from "../services/auth.Services.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export interface AuthRequest extends Request
{
    user?: UserDocument
}

export const verifyJwt = asyncHandler( async ( req: AuthRequest, res: Response, next: NextFunction ) =>
{
    try
    {
        const token = req.header( "Authorization" )?.replace( "Bearer ", "" ) || req.cookies.AccessToken;
        if ( !token )
        {
            throw ApiError.unauthorized( "Unauthorized request", [ " accessToken not found " ] )
        }
        const decodedToken: AccessTokenPayload = jwt.verify( token, process.env.JWT_TOKEN_SECRET as string ) as AccessTokenPayload;
        const user: UserDocument | null = await authServices.getUserById( decodedToken?.id );
        if ( !user || !user.isVerified )
        {
            throw ApiError.unauthorized( "Unauthorized request", [ "User not found" ] );
        }
        req.user = user;
        next();


    } catch ( error )
    {
        if ( error instanceof jwt.TokenExpiredError )
        {
            logger.error( "Token expired", { error: error.message } );

        } else if ( error instanceof jwt.JsonWebTokenError )
        {
            logger.warn( "Invalid or tampered access token", { message: error.message } );
        } else
        {
            logger.error( "Error verifying access token", { message: ( error as Error ).message } )

        }
        throw ApiError.unauthorized( "Unauthorized request", [ "Unauthorized request please login or signup " ] )
    }
} )
