import type { Types } from "mongoose";

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

export type { IrestaurantAddress, Irestaurant }