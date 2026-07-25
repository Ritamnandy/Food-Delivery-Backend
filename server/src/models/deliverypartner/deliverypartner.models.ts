
import mongoose, { Types, type HydratedDocument, Model, Schema } from "mongoose";

import type { Ideliverypartner } from "../../interfaces/models/deliverypartner.interface.js";

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