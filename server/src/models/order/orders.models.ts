
import mongoose, { Types, type HydratedDocument, Model, Schema } from "mongoose";
import { Order_Status } from "../../constants.js";
import type { Iorder } from "../../interfaces/index.js";


type OrderDocument = HydratedDocument<Iorder>
type orderModel = Model<Iorder>


const orderSchema = new Schema<Iorder, orderModel>( {
    orderNumber: {
        type: String,
        required: true,
        trim: true
    },
    customerId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurantId: {
        type: Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    deliveryPartnerId: {
        type: Types.ObjectId,
        ref: "DeliveryPartner",
    },
    items: [
        {
            type: Types.ObjectId,
            ref: "FoodItem"
        }
    ],
    tax: {
        type: Types.Double,
        required: true
    },
    deliveryCharge: {
        type: Types.Double,
        required: true
    },
    discount: {
        type: Types.Double,
        required: true
    },
    grandTotal: {
        type: Types.Double,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Order_Status,
    },
    paymentId: {
        type: Types.ObjectId,
        ref: "Payment"
    }
}, { timestamps: true } )


const Order = mongoose.model<Iorder, orderModel>( "Order", orderSchema )

export type { OrderDocument }
export { Order }