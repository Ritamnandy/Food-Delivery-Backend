import type { Types } from "mongoose";

interface Ireview
{
    userId: Types.ObjectId,
    restaurantId: Types.ObjectId,
    foodId: Types.ObjectId,
    rating: Types.Double,
    review: string
}

export type { Ireview }
