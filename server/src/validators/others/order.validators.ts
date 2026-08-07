

import { z } from "zod";
import { Order_Status } from "../../constants.js";

const orderSchema = z.object( {
    orderNumber: z
        .string()
        .trim(),
    customerId: z
        .string()
        .trim(),
    restaurantId: z
        .string()
        .trim(),
    deliveryPartnerId: z
        .string()
        .trim(),
    items: z
        .string()
        .array(),
    tax: z
        .string()
        .trim(),
    deliveryCharge: z
        .number(),
    discount: z
        .number(),
    grandTotal: z
        .number(),
    paymentId: z
        .string()
        .trim(),
    status: z.nativeEnum( Order_Status, {
        message: "Invalid order status",
    } )

} )


export
{
    orderSchema
}