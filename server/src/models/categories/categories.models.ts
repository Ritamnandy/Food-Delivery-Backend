
import mongoose, { Schema, Model, type HydratedDocument } from "mongoose";

interface Icategory
{
    name: string,
    image?: string,
}

type CategoryDocument = HydratedDocument<Icategory>;
type categoryModel = Model<Icategory>;

const categorySchema = new Schema<Icategory, categoryModel>( {
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true,
        default: null
    }
}, { timestamps: true } )

const Category = mongoose.model<Icategory, categoryModel>( "Category", categorySchema )

export type { CategoryDocument }
export { Category }