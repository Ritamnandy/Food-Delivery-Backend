

import { authServices } from '../services/auth.Services.js';
import type { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { AuthRequest } from '../middlewares/auth.middlewares.js';
import { ApiError } from '../utils/ApiError.js';

const registerController = asyncHandler( async ( req: Request, res: Response ) =>
{

    await authServices.register( req.body );
    return res.status( 201 ).json( ApiResponse.accepted( "verification email sent" ) );
} )

const verifyEmailController = asyncHandler( async ( req: Request, res: Response ) =>
{

    const data = await authServices.verifyEmail( { email: req.body.email, token: req.body.token } );

    return res.status( 200 ).json( ApiResponse.ok( "Email verified", data ) );
} )

const resendCodeController = asyncHandler( async ( req: Request, res: Response ) =>
{
    await authServices.reSendCode( req.body.email );
    return res.status( 200 ).json( ApiResponse.ok( "Verification code resent", "" ) );
} )

const loginController = asyncHandler( async ( req: Request, res: Response ) =>
{

    const data = await authServices.loginUser( req.body );
    return res.status( 200 ).json( ApiResponse.ok( "Login successful", data ) );
} )

const logoutController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    if ( !req.user )
    {
        return res.status( 401 ).json( ApiError.unauthorized( "Unauthorized request", [ "User not found" ] ) );
    }
    await authServices.logoutUser( req.user );
    return res.status( 200 ).json( ApiResponse.ok( "Logout successful", "user logged out successfully" ) );
} )

const refreshTokenController = asyncHandler( async ( req: Request, res: Response ) =>
{
    const { token } = req.body;
    const data = await authServices.refreshAccessToken( token );
    return res.status( 200 ).json( ApiResponse.ok( "Token refreshed", data ) );
} )

const forgotPasswordController = asyncHandler( async ( req: Request, res: Response ) =>
{
    await authServices.forgetPassword( req.body );
    return res.status( 200 ).json( ApiResponse.ok( "Password reset link sent if user exists", "" ) );
} )

const resetPassWordController = asyncHandler( async ( req: Request, res: Response ) =>
{

    await authServices.resetPassWord( req.body );
    return res.status( 200 ).json( ApiResponse.ok( "Password reset successful", "" ) );
} )

const getUserController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    if ( !req.user )
    {
        return res.status( 401 ).json( ApiError.unauthorized( "Unauthorized request", [ "User not found" ] ) );
    }
    const data = await authServices.userDetails( req.user );
    return res.status( 200 ).json( ApiResponse.ok( "User found", data ) );
} )



export
{
    registerController,
    verifyEmailController,
    resendCodeController,
    loginController,
    logoutController,
    refreshTokenController,
    forgotPasswordController,
    resetPassWordController,
    getUserController
}