
import mongoose, { Schema, Model, type HydratedDocument, Types } from "mongoose";
import { boolean } from "zod";

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

type FoodItemDocument = HydratedDocument<Ifood_item>
type foodItemModel = Model<Ifood_item, {}, Ifood_item>

const foodItemSchema = new Schema<Ifood_item, foodItemModel>( {
    restaurantId: {
        type: Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    categoryId: {
        type: Types.ObjectId,
        ref: "Category",
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Types.Double,
        required: true
    },
    discountPrice: {
        type: Types.Double,
        required: true
    },
    images: [
        {
            type: String,
            trim: true,
            default: null
        }
    ],
    isVeg: {
        type: Boolean,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Types.Double,
        required: true,
        default: 0
    }
}, { timestamps: true } )

const FoodItem = mongoose.model<Ifood_item, foodItemModel>( "FoodItem", foodItemSchema )

export type { FoodItemDocument }
export { FoodItem }