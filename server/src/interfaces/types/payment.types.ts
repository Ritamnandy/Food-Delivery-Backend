

import type { Payment_Methods, Payment_Status } from "../../constants.js"


export interface PaymentBody
{
    customerId: string
    amount: number
    paymentMethod: Payment_Methods
    transactionId: string
    status: Payment_Status
    paidAt: Date
}