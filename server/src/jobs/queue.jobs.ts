
import { Queue } from "bullmq";
import { connection } from "../db/redisconnect.db.js";

const defaultJobOptions = {
    attempts: 3,
    backoff: {
        type: "exponential",
        delay: 5000
    },
    removeOnComplete: { count: 1000 }, // keep last 1000, don't grow forever
    removeOnFail: { count: 1000 }
}

const EmailQueue = new Queue( "EmailQueue", {
    connection,
    defaultJobOptions
} )

const NotificationQueue = new Queue( "NotificationQueue", {
    connection,
    defaultJobOptions
} )

export { EmailQueue, NotificationQueue }