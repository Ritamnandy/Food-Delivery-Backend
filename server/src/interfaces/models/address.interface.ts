import type { Types } from "mongoose";

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

export type { Iaddress }