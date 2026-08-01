
import type { Types } from "mongoose";
import type { IReviewRepository, Ireview } from "../interfaces/index.js";

import { Review, type ReviewDocument } from "../models/index.js";


class ReviewRepository implements IReviewRepository
{
    async findById ( reviewId: string ): Promise<ReviewDocument | null>
    {
        return await Review.findById( { _id: reviewId } )
    }
    async create ( review: Ireview ): Promise<ReviewDocument>
    {
        return await Review.create( review )
    }
    async delete ( reviewId: string ): Promise<ReviewDocument | null>
    {
        return await Review.findByIdAndDelete( reviewId )
    }
    async update ( reviewId: string, review: Partial<Ireview> ): Promise<ReviewDocument | null>
    {
        return await Review.findByIdAndUpdate( reviewId, review, { new: true } )
    }
    async getAll ( restaurantId: string ): Promise<ReviewDocument[] | []>
    {
        return await Review.find( { restaurantId } )
    }
}

export const reviewRepository = new ReviewRepository()