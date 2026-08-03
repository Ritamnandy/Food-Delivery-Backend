
import { Payment, type paymentDocument } from "../models/index.js";
import type { PaymentBody, IPaymentRepository } from "../interfaces/index.js";
import { Payment_Status } from "../constants.js";


class PaymentRepository implements IPaymentRepository
{
    async makePayment ( paymentBody: PaymentBody ): Promise<paymentDocument>
    {
        return Payment.create( paymentBody );
    }

    async cancelPayment ( paymentId: string ): Promise<paymentDocument | null>
    {
        return Payment.findByIdAndUpdate( paymentId, { status: Payment_Status.CANCELLED }, { new: true } );
    }
}

export const paymentRepository = new PaymentRepository();
