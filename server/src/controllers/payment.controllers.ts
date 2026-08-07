
import { z } from "zod";
import type { Request, Response } from 'express';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { paymentServices } from "../services/payments.services.js";
import type { AuthRequest } from "../middlewares/auth.middlewares.js";





const makePaymentController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = paymentServices.makePayment( { ...req.body, customerId: user._id } );
    return res.status( 201 ).json( ApiResponse.created( "Payment made successfully", data ) );
} )

const cancelPaymentController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await paymentServices.cancelPayment( req.params.id as string );
    return res.status( 200 ).json( ApiResponse.ok( "Payment cancelled successfully", data ) );
} )

export
{
    makePaymentController,
    cancelPaymentController
}