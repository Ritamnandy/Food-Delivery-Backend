import type { Types } from "mongoose"

interface Ifood_item
{
    restaurantId: Types.ObjectId
    categoryId: Types.ObjectId
    name: string
    description: string
    price: Types.Double
    discountPrice: Types.Double
    images?: string[]
    isVeg: boolean
    isAvailable: boolean
    rating: Types.Double
}

export type { Ifood_item }