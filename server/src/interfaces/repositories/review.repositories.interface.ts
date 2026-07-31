
import { Types } from "mongoose"

import type { ReviewDocument } from "../../models/index.js"
export interface IReviewRepository
{
    findById: ( reviewId: Types.ObjectId ) => Promise<ReviewDocument | null>
    create: ( review: Partial<ReviewDocument> ) => Promise<ReviewDocument>
    delete: ( reviewId: Types.ObjectId ) => Promise<ReviewDocument | null>
    update: ( reviewId: Types.ObjectId, review: Partial<ReviewDocument> ) => Promise<ReviewDocument | null>
    getAll: ( restaurantId: Types.ObjectId ) => Promise<ReviewDocument[] | []>
}