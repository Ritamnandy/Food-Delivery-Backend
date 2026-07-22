
import mongoose, { Types, type HydratedDocument, Model, Schema } from "mongoose";

interface Ireview
{
    userId: Types.ObjectId,
    restaurantId: Types.ObjectId,
    foodId: Types.ObjectId,
    rating: Types.Double,
    review: string
}

type ReviewDocument = HydratedDocument<Ireview>

type reviewModel = Model<Ireview>


const reviewSchema = new Schema<Ireview, reviewModel>( {
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurantId: {
        type: Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    foodId: {
        type: Types.ObjectId,
        ref: "FoodItem",
        required: true
    },
    rating: {
        type: Types.Double,
        required: true
    },
    review: {
        type: String,
        required: true
    }
}, { timestamps: true } )


const Review = mongoose.model<Ireview, reviewModel>( "Review", reviewSchema )

export type { ReviewDocument }
export { Review }