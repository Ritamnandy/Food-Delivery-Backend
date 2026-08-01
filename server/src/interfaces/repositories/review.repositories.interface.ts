
import { Types } from "mongoose"
import type { Ireview } from "../../interfaces/index.js"
import type { ReviewDocument } from "../../models/index.js"
export interface IReviewRepository
{
    findById: ( reviewId:string ) => Promise<ReviewDocument | null>
    create: ( review: Ireview ) => Promise<ReviewDocument>
    delete: ( reviewId: string ) => Promise<ReviewDocument | null>
    update: ( reviewId: string, review: Partial<Ireview> ) => Promise<ReviewDocument | null>
    getAll: ( restaurantId: string ) => Promise<ReviewDocument[] | []>
}