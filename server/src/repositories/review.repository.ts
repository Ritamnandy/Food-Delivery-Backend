
import type { Types } from "mongoose";
import type { IReviewRepository, Ireview } from "../interfaces/index.js";

import { Review, type ReviewDocument } from "../models/index.js";


class ReviewRepository implements IReviewRepository
{
    async findById ( reviewId: Types.ObjectId ): Promise<ReviewDocument | null>
    {
        return await Review.findById( reviewId )
    }
    async create ( review: Ireview ): Promise<ReviewDocument>
    {
        return await Review.create( review )
    }
    async delete ( reviewId: Types.ObjectId ): Promise<ReviewDocument | null>
    {
        return await Review.findByIdAndDelete( reviewId )
    }
    async update ( reviewId: Types.ObjectId, review: Partial<Ireview> ): Promise<ReviewDocument | null>
    {
        return await Review.findByIdAndUpdate( reviewId, review, { new: true } )
    }
    async getAll ( restaurantId: Types.ObjectId ): Promise<ReviewDocument[] | []>
    {
        return await Review.find( { restaurantId } )
    }
}

export const reviewRepository = new ReviewRepository()