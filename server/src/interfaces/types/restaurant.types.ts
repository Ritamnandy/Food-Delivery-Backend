

export interface RestaurantBody
{
    userId: string,
    name: string,
    description: string,
    email: string,
    phone: string[],
    openingTime: Date,
    closingTime: Date,
    isOpen: boolean
}

export interface RestaurantAddressBody
{
    building?: string;
    addressLine: string;
    street: string;
    state: string;
    city?: string;
    country: string;
    pincode: number;
}