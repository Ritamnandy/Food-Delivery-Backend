import type { Request, Response } from 'express';
import { reviewServices } from '../services/review.services.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import type { AuthRequest } from '../middlewares/auth.middlewares.js';

const createReviewController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await reviewServices.createReview( req.body, user );
    return res.status( 201 ).json( ApiResponse.created( "Review created successfully", data ) );
} )


const updateReviewController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await reviewServices.updateReview( req.params.id as string, req.body );
    return res.status( 200 ).json( ApiResponse.ok( "Review updated successfully", data ) );
} )

const deleteReviewController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await reviewServices.deleteReview( req.params.id as string );
    return res.status( 200 ).json( ApiResponse.ok( "Review deleted successfully", data ) );
} )


const getReviewController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await reviewServices.getAllReviews( req.params.id as string ); //id of the restaurant
    return res.status( 200 ).json( ApiResponse.ok( "Review found successfully", data ) );
} )





export
{
    createReviewController,
    updateReviewController,
    deleteReviewController,
    getReviewController
}
