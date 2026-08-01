

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