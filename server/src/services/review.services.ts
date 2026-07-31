
import type { IReviewRepository, ReviewBody, IRestaurantRepository } from "../interfaces/index.js";
import { reviewRepository, restaurantRepository } from "../repositories/index.js";
import { type UserDocument, type ResturantDocument, type ReviewDocument } from "../models/index.js";

import { ApiError } from "../utils/ApiError.js";
import type { Types } from "mongoose";


class ReviewServices
{
    constructor ( private readonly reviewRepository: IReviewRepository,
        private readonly restaurantRepository: IRestaurantRepository
    ) { }

    async createReview ( review: ReviewBody, user: UserDocument )
    {
        const { restaurantId } = review
        const restaurant: ResturantDocument | null = await this.restaurantRepository.findById( restaurantId )
        if ( !restaurant )
        {
            throw ApiError.badRequest( "Restaurant not found", [ "Invalid restaurant id" ] );
        }
        const createdReview: ReviewDocument | null = await this.reviewRepository.create( { ...review, userId: user._id } );
        if ( !createdReview )
        {
            throw ApiError.badRequest( "Review not created", [ "Invalid review data" ] );
        }
        return createdReview
    }

    async updateReview ( reviewId: Types.ObjectId, reviewData: Partial<ReviewBody> )
    {
        const review: ReviewDocument | null = await this.reviewRepository.update( reviewId, reviewData );
        if ( !review )
        {
            throw ApiError.badRequest( "Review not found", [ "Invalid review id" ] );
        }
        return review
    }
    async deleteReview ( reviewId: Types.ObjectId )
    {
        const deletedReview: ReviewDocument | null = await this.reviewRepository.delete( reviewId );
        if ( !deletedReview )
        {
            throw ApiError.badRequest( "Review not found", [ "Invalid review id" ] );
        }

    }
    async getAllReviews ( restaurantId: Types.ObjectId )
    {
        const reviews: ReviewDocument[] | [] = await this.reviewRepository.getAll( restaurantId );
        if ( !reviews || reviews.length === 0 )
        {
            throw ApiError.badRequest( "Reviews not found", [ "Invalid restaurant id" ] );
        }
        return reviews
    }

}

export const reviewServices = new ReviewServices( reviewRepository, restaurantRepository );