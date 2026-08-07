
import { z } from "zod";


const foodItemsSchema = z.object( {
    restaurantId: z
        .string()
        .trim(),
    categoryId: z
        .string()
        .trim(),
    name: z
        .string()
        .trim(),
    description: z
        .string()
        .trim(),
    price: z
        .number(),
    discountPrice: z
        .number(),
    images: z
        .string()
        .array()
        .optional(),
    isVeg: z
        .boolean(),
    isAvailable: z
        .boolean(),
    rating: z
        .number()
        .optional(),
} )

export
{ 
    foodItemsSchema
}