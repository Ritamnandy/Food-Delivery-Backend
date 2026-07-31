
import { Types } from "mongoose"
import type { Ireview } from "../../interfaces/index.js"
import type { ReviewDocument } from "../../models/index.js"
export interface IReviewRepository
{
    findById: ( reviewId: Types.ObjectId ) => Promise<ReviewDocument | null>
    create: ( review: Ireview ) => Promise<ReviewDocument>
    delete: ( reviewId: Types.ObjectId ) => Promise<ReviewDocument | null>
    update: ( reviewId: Types.ObjectId, review: Partial<Ireview> ) => Promise<ReviewDocument | null>
    getAll: ( restaurantId: Types.ObjectId ) => Promise<ReviewDocument[] | []>
}