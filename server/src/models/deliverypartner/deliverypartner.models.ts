
import mongoose, { Types, type HydratedDocument, Model, Schema } from "mongoose";

interface Ideliverypartner
{
    userId: Types.ObjectId
    vehicleType: string
    vehicleNumber: string
    isAvailable: boolean
    rating: Types.Double
    totalDeliveries: number
}

type DeliverypartnerDocument = HydratedDocument<Ideliverypartner>
type deliverypartnerModel = Model<Ideliverypartner>

const deliverypartnerSchema = new Schema<Ideliverypartner, deliverypartnerModel>( {
    userId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    vehicleType: {
        type: String,
        required: true,
        trim: true
    },
    vehicleNumber: {
        type: String,
        required: true,
        trim: true
    },
    isAvailable: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Types.Double,
        required: true
    },
    totalDeliveries: {
        type: Number,
        required: true
    }
}, { timestamps: true } )



const DeliveryPartner = mongoose.model<Ideliverypartner, deliverypartnerModel>( "DeliveryPartner", deliverypartnerSchema )

export type { DeliverypartnerDocument }
export { DeliveryPartner }