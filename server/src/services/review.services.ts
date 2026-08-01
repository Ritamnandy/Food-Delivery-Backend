
import type { IReviewRepository, ReviewBody, IRestaurantRepository } from "../interfaces/index.js";
import { reviewRepository, restaurantRepository } from "../repositories/index.js";
import { type UserDocument, type ResturantDocument, type ReviewDocument } from "../models/index.js";
import { logger } from "../utils/logger.js";
import { ApiError } from "../utils/ApiError.js";


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
            logger.error( "Restaurant not found", { restaurantId } );
            throw ApiError.badRequest( "Restaurant not found", [ "Invalid restaurant id" ] );
        }
        const createdReview: ReviewDocument | null = await this.reviewRepository.create( { ...review, userId: user._id } );
        if ( !createdReview )
        {
            logger.error( "Review not created", { userId: user._id } );
            throw ApiError.badRequest( "Review not created", [ "Invalid review data" ] );
        }
        return createdReview
    }

    async updateReview ( reviewId: string, reviewData: Partial<ReviewBody> )
    {
        const review: ReviewDocument | null = await this.reviewRepository.update( reviewId, reviewData );
        if ( !review )
        {
            logger.error( "Review not found", { reviewId } );
            throw ApiError.badRequest( "Review not found", [ "Invalid review id" ] );
        }
        return review
    }
    async deleteReview ( reviewId: string )
    {
        const deletedReview: ReviewDocument | null = await this.reviewRepository.delete( reviewId );
        if ( !deletedReview )
        {
            logger.error( "Review not found or invalid id", { reviewId } );
            throw ApiError.badRequest( "Review not found", [ "Invalid review id" ] );
        }

    }
    async getAllReviews ( restaurantId: string )
    {
        const reviews: ReviewDocument[] | [] = await this.reviewRepository.getAll( restaurantId );
        if ( !reviews || reviews.length === 0 )
        {
            logger.error( "Reviews not found or methods return empty array or invalid id", { restaurantId } );
            throw ApiError.badRequest( "Reviews not found", [ "Invalid restaurant id" ] );
        }
        return reviews
    }

}

export const reviewServices = new ReviewServices( reviewRepository, restaurantRepository );