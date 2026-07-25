

import type { verificationEmailJobData, forgotPasswordEmailJobData, orderConfirmedEmailJobData, PasswordChangedJobData } from "../queues/queues.interface.js"


interface IEmailQueueRepository
{
    VerificationMail: ( data: verificationEmailJobData ) => Promise<void>;
    ForgetPasswordMail: ( data: forgotPasswordEmailJobData ) => Promise<void>;
    OrderConfirmedMail: ( data: orderConfirmedEmailJobData ) => Promise<void>;
    PasswordChangedMail: ( data: PasswordChangedJobData ) => Promise<void>;
}

export type { IEmailQueueRepository }