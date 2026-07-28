import crypto from "crypto"
const Db_Name = "Food_Delivery_DB"


enum User_Roles
{
    CUSTOMER = "customer",
    RESTAURANT_OWNER = "restaurant_owner",
    ADMIN = "admin",
    DELIVERY_PARTNER = "delivery_partner"
}
enum Login_Type
{
    GOOGLE = "google",
    EMAIL_PASSWORD = "email_password"
}

enum Order_Status
{
    READY_FOR_PICKUP = "ready_for_pickup",
    ACCEPTED = "accepted",
    ON_THE_WAY = "on_the_way",
    PREPARING = "preparing",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}

enum Payment_Status
{
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled",
    REFUNDED = "refunded"
}

enum Payment_Methods
{
    CASH_ON_DELIVERY = "cash_on_delivery",
    UPI = "upi",
    CARD = "card",
    NET_BANKING = "net_banking"
}

const getOtp = (): string =>
{
    return crypto.randomInt( 100000, 999999 ).toString()
}

const signupKey = ( email: string ): string =>
{
    return `signup-data:${ email }`
}
const otpKey = ( email: string ): string =>
{
    return `otp-key:${ email }`
}

const resendCoolDownKey = ( email: string ): string =>
{
    return `resend-otp-cooldown:${ email }`
}
const resetCooldownKey = ( email: string ): string =>
{
    return `reset-password-cooldown:${ email }`
}
const resetKey = ( email: string ): string =>
{
    return `reset-password:${ email }`
}

const getUserKey = ( email: string ) => `user-data:${ email }`


const hashToken = ( token: string ): string =>
{
    return crypto.createHash( "sha256" ).update( token ).digest( "hex" )
}
const rowToken = (): string => crypto.randomBytes( 32 ).toString( "hex" );

export
{
    User_Roles,
    Login_Type,
    Order_Status,
    Payment_Status,
    Payment_Methods,
    signupKey,
    otpKey,
    getOtp,
    resendCoolDownKey,
    resetCooldownKey,
    hashToken,
    rowToken,
    resetKey,
    getUserKey,
    Db_Name
}