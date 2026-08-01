
import { Types } from "mongoose"
import type { Ireview, ReviewBody } from "../../interfaces/index.js"
import type { ReviewDocument } from "../../models/index.js"
export interface IReviewRepository
{
    findById: ( reviewId:string ) => Promise<ReviewDocument | null>
    create: ( review: ReviewBody ) => Promise<ReviewDocument>
    delete: ( reviewId: string ) => Promise<ReviewDocument | null>
    update: ( reviewId: string, review: Partial<ReviewBody> ) => Promise<ReviewDocument | null>
    getAll: ( restaurantId: string ) => Promise<ReviewDocument[] | []>
}