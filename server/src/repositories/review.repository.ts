
import type { Types } from "mongoose";
import type { IReviewRepository } from "../interfaces/index.js";

import { Review, type ReviewDocument } from "../models/index.js";


class ReviewRepository implements IReviewRepository
{
    async createReview ( review: Partial<ReviewDocument> )
    {
        return await Review.create( review )
    }
    async deleteReview ( reviewId: Types.ObjectId )
    {
        await Review.findByIdAndDelete( reviewId )
    }
    async updateReview ( reviewId: Types.ObjectId, review: Partial<ReviewDocument> )
    {
        return await Review.findByIdAndUpdate( reviewId, review, { new: true } )
    }
    async getAllReviews ( restaurantId: Types.ObjectId )
    {
        return await Review.find( { restaurantId } )
    }
}

export const reviewRepository = new ReviewRepository()