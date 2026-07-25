import type { Types } from "mongoose"
import type { Order_Status } from "../../constants.js"

interface Iorder
{
    orderNumber: string
    customerId: Types.ObjectId
    restaurantId: Types.ObjectId
    deliveryPartnerId: Types.ObjectId
    items: Types.ObjectId[]
    tax: Types.Double
    deliveryCharge: Types.Double
    discount: Types.Double
    grandTotal: Types.Double
    paymentId: Types.ObjectId
    status: Order_Status
}

export type { Iorder }