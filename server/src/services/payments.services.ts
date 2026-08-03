
import { paymentRepository } from "../repositories/payment.repository.js";
import type { PaymentBody, IPaymentRepository } from "../interfaces/index.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import type { paymentDocument } from "../models/index.js";

class PaymentServices
{
    constructor ( private readonly paymentRepository: IPaymentRepository ) { }

    async makePayment ( paymentBody: PaymentBody ): Promise<paymentDocument>
    {
        const payment = await this.paymentRepository.makePayment( paymentBody );
        if ( !payment )
        {
            throw ApiError.internalServerError( "Payment failed", [ "Payment failed" ] );
        }
        return payment;
    }

    async cancelPayment ( paymentId: string ): Promise<paymentDocument | null>
    {
        const payment = await this.paymentRepository.cancelPayment( paymentId );
        if ( !payment )
        {
            logger.error( "Payment cancellation failed", { paymentId } );
            throw ApiError.badRequest( "Payment cancellation failed", [ "Payment cancellation failed or payment not found" ] );
        }
        return payment;
    }
}


export const paymentServices = new PaymentServices( paymentRepository );
