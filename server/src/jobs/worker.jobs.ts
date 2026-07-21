
import { Worker } from "bullmq";
import { connection } from "../db/redisconnect.db.js";
import
{
    sendVerificationEmail,
    sendForgotPasswordnEmail,
    sentPasswordChangedMail,
    sentOrderConfirmedMail,
} from "../utils/mail.js";
import { logger } from "../utils/logger.js";
interface PasswordChangedJobData
{
    email: string
    userName: string
}
interface verificationEmailJobData extends PasswordChangedJobData
{
    token: string
}
interface forgotPasswordEmailJobData extends PasswordChangedJobData
{

    link: string
}
interface orderConfirmedEmailJobData
{
    email: string
    userName: string
    link: string
}


const emailWorker = new Worker( "EmailQueue", async ( job ) =>
{
    switch ( job.name )
    {
        case 'send-Verification-Email': {
            const { email, userName, token } = job.data as verificationEmailJobData;
            await sendVerificationEmail( email, userName, token );
            break;
        }
        case 'send-forgot-password-email': {
            const { email: forgotEmail, userName, link } = job.data as forgotPasswordEmailJobData;
            await sendForgotPasswordnEmail( forgotEmail, userName, link );
            break;
        }
        default:
            logger.warn( `Unknown job name: ${ job.name }` );
            break;
    }
}, { connection, concurrency: 5 } );




const notificationWorker = new Worker( "NotificationQueue", async ( job ) =>
{
    switch ( job.name )
    {
        case 'send-order-confirmed-email': {
            const { email, userName } = job.data as orderConfirmedEmailJobData;
            await sentOrderConfirmedMail( email, userName );
            break;
        }
        case 'send-password-changed-email': {
            const { email, userName } = job.data as PasswordChangedJobData;
            await sentPasswordChangedMail( email, userName );
            break;
        }
        default:
            logger.warn( `Unknown job name: ${ job.name }` );
            break;
    }
}, { connection, concurrency: 5 } );



emailWorker.on( "completed", ( job ) =>
{
    logger.info( `Email job completed: ${ job.id }` );

} )
emailWorker.on( "failed", ( job, err ) =>
{
    logger.error( `Email job failed: ${ job?.id }`, err );

} )

notificationWorker.on( "completed", ( job ) =>
{
    logger.info( `Notification job completed: ${ job.id }` );
} )
notificationWorker.on( "failed", ( job, err ) =>
{
    logger.error( `Notification job failed: ${ job?.id }`, err );
} )

