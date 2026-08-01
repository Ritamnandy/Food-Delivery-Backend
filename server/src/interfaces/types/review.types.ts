import type { Types } from "mongoose";


export interface ReviewBody
{
    userId: string
    restaurantId: string
    rating: Types.Double,
    review: string
}