import type { Order_Status } from "../../constants.js"


export interface OrderBody
{
    orderNumber: string
    customerId: string
    restaurantId: string
    deliveryPartnerId: string
    items: string[]
    tax: number
    deliveryCharge: number
    discount: number
    grandTotal: number
    paymentId: string
    status: Order_Status
}