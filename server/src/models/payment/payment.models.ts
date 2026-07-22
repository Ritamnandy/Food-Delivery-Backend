
import mongoose, { Types, type HydratedDocument, Model, Schema } from "mongoose";
import { Payment_Methods, Payment_Status } from "../../constants.js";

interface Ipayment
{
    orderId: Types.ObjectId
    customerId: Types.ObjectId
    amount: Types.Double
    paymentMethod: Payment_Methods
    transactionId: string
    status: Payment_Status
    paidAt: Date
}


type paymentDocument = HydratedDocument<Ipayment>
type paymentModel = Model<Ipayment>


const paymentSchema = new Schema<Ipayment, paymentModel>( {
    orderId: {
        type: Types.ObjectId,
        ref: "Order",
        required: true
    },
    customerId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Types.Double,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: Payment_Methods,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Payment_Status,
        required: true
    },
    paidAt: {
        type: Date,
        required: true
    }
}, { timestamps: true } )


const Payment = mongoose.model<Ipayment, paymentModel>( "Payment", paymentSchema )

export type { paymentDocument }
export { Payment }