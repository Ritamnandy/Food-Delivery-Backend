
import type { Types } from "mongoose";
import type { Login_Type, User_Roles, Order_Status, Payment_Status, Payment_Methods } from "../../constants.js"

//user interface
interface Iuser
{
    firstName: string,
    lastName: string,
    email: string,
    phoneno: string,
    password: string,
    role: User_Roles,
    loginType: Login_Type
    isVerified: boolean
    googleId?: string
    avatar?: string
    avatarId?: string
    refreshToken?: string
}

interface IuserMethods
{
    generateAccessToken: () => string,
    generateRefreshToken: () => string,
    comparePassword: ( password: string ) => Promise<boolean>,
    getPhoneNo: () => string
}

// address interface
interface Iaddress
{
    addressLine: string;
    houseNo?: number;
    street: string;
    city?: string;
    state: string;
    country: string;
    pincode: number;
    isDefault: boolean;
    userId: Types.ObjectId;
}

// food item interface
interface Ifood_item
{
    restaurantId: Types.ObjectId
    categoryId: Types.ObjectId
    name: string
    description: string
    price: Types.Double
    discountPrice: Types.Double
    images?: string[]
    isVeg: boolean
    isAvailable: boolean
    rating: Types.Double
}
// order interface
interface Iorder
{
    orderNumber: string
    customerId: Types.ObjectId
    restaurantId: Types.ObjectId
    deliveryPartnerId: Types.ObjectId
    items: Types.ObjectId[]
    tax: Types.Double
    deliveryCharge: Types.Double
    discount: Types.Double
    grandTotal: Types.Double
    paymentId: Types.ObjectId
    status: Order_Status
}

// category interface
interface Icategory
{
    name: string,
    image?: string,
}

// delivery partner interface
interface Ideliverypartner
{
    userId: Types.ObjectId
    vehicleType: string
    vehicleNumber: string
    isAvailable: boolean
    rating: Types.Double
    totalDeliveries: number
}

// payment interface

interface Ipayment
{
    orderId: Types.ObjectId
    customerId: Types.ObjectId
    amount: Types.Double
    paymentMethod: Payment_Methods
    transactionId: string
    status: Payment_Status
    paidAt: Date
}

// restaurant address interface
interface IrestaurantAddress
{
    building?: string;
    addressLine: string;
    street: string;
    state: string;
    city?: string;
    country: string;
    pincode: number;
}
// restaurant  interface
interface Irestaurant
{
    ownerId: Types.ObjectId
    name: string
    description: string
    logo: symbol
    banner?: symbol
    phone: string[]
    email: string
    openingTime: Date
    closingTime: Date
    isOpen: boolean
    rating: Types.Double
    address: IrestaurantAddress
}

// review interface
interface Ireview
{
    userId: Types.ObjectId,
    restaurantId: Types.ObjectId,
    rating: Types.Double,
    review: string
}


export type {
    Iaddress,
    Ifood_item,
    Iuser,
    IuserMethods,
    Iorder,
    Icategory,
    Ideliverypartner,
    Ipayment,
    Irestaurant,
    Ireview

}