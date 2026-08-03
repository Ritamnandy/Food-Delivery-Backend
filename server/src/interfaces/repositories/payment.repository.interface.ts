
import type { PaymentBody } from "../index.js";
import type { paymentDocument } from "../../models/index.js";

interface IPaymentRepository
{
    makePayment: ( paymentBody: PaymentBody ) => Promise<paymentDocument>;
    cancelPayment: ( paymentId: string ) => Promise<paymentDocument | null>;
}

export type { IPaymentRepository }