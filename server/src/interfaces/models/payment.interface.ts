import type { Types } from "mongoose"
import type { Payment_Methods, Payment_Status } from "../../constants.js"

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

export type { Ipayment }