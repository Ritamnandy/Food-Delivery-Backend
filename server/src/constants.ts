
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





export
{
    User_Roles,
    Login_Type,
    Order_Status,
    Payment_Status,
    Payment_Methods,
    Db_Name
}