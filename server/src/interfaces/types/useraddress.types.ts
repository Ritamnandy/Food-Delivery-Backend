
export interface UserAddressBody
{
    addressLine: string;
    houseNo?: number;
    street: string;
    city?: string;
    state: string;
    country: string;
    pincode: number;
    isDefault: boolean;
}