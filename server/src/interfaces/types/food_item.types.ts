
export interface FoodItemBody
{
    restaurantId: string
    categoryId: string
    name: string
    description: string
    price: number
    discountPrice: number
    images?: string[]
    isVeg: boolean
    isAvailable: boolean
    rating?: number
}