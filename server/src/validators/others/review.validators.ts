

import { z } from "zod";


const reviewSchema = z.object( {
    userId: z
        .string()
        .trim(),
    restaurantId: z
        .string()
        .trim(),
    rating: z
        .number()
        .min( 1, { message: "Rating must be at least 1" } )
        .max( 5, { message: "Rating must be at most 5" } ),
    review: z
        .string()
        .trim()
        .min( 3, { message: "Review must be at least 3 characters long" } )
        .max( 1000, { message: "Review must be at most 1000 characters long" } ),
} )

export
{
    reviewSchema
}