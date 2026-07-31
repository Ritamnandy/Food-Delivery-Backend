
import { Types } from "mongoose"

import type { ReviewDocument } from "../../models/index.js"
export interface IReviewRepository
{
    createReview: ( review: Partial<ReviewDocument> ) => Promise<ReviewDocument>
    deleteReview: ( reviewId: Types.ObjectId ) => Promise<void>
    updateReview: ( reviewId: Types.ObjectId, review: Partial<ReviewDocument> ) => Promise<ReviewDocument | null>
    getAllReviews: ( restaurantId: Types.ObjectId ) => Promise<ReviewDocument[]>
}