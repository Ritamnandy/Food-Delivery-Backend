
import type { IEmailQueueRepository } from "../interfaces/repositories/email_queue.repository.interface.js";
import type { verificationEmailJobData, forgotPasswordEmailJobData, orderConfirmedEmailJobData, PasswordChangedJobData } from "../interfaces/queues/queues.interface.js";

import { EmailQueue, NotificationQueue } from "../jobs/queue.jobs.js";

const option = {
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: true,
    backoff: {
        type: "exponential",
        delay: 1000
    },

}


class EmailQueueRepository implements IEmailQueueRepository
{
    public async VerificationMail ( data: verificationEmailJobData ): Promise<void>
    {
        await EmailQueue.add( "send-Verification-Email", data, option );
    }

    public async ForgetPasswordMail ( data: forgotPasswordEmailJobData ): Promise<void>
    {
        await EmailQueue.add( "send-forget-password-emaill", data, option );
    }



    public async OrderConfirmedMail ( data: orderConfirmedEmailJobData ): Promise<void>
    {
        await NotificationQueue.add( "send-order-confirmed-email", data, option );
    }
    public async PasswordChangedMail ( data: PasswordChangedJobData ): Promise<void>
    {
        await NotificationQueue.add( "send-password-changed-email", data, option );
    }
}


export const emailQueueRepository = new EmailQueueRepository();