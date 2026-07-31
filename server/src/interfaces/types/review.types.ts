import type { Types } from "mongoose";


export interface ReviewBody
{
    restaurantId: Types.ObjectId,
    rating: Types.Double,
    review: string
}