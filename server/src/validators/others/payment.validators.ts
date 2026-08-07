
import { z } from "zod";
import { Payment_Methods, Payment_Status } from "../../constants.js";


const paymentSchema = z.object( {
    customerId: z
        .string()
        .trim(),
    amount: z
        .number(),
    paidAt: z.coerce.date(),
    paymentMethod: z.nativeEnum( Payment_Methods, {
        message: "Invalid payment method",
    } ),
    transactionId: z
        .string()
        .trim(),
    status: z.nativeEnum( Payment_Status, {
        message: "Invalid payment status",
    } )
} )

export
{
    paymentSchema
}