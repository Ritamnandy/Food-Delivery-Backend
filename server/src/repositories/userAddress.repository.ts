
import type { IUserAddressRepository, Iaddress } from "../interfaces/index.js";
import { type AddressDocument, Address } from "../models/index.js";
import type { Types } from "mongoose";

class UserAddressRepository implements IUserAddressRepository
{
    async getAddressById ( userId: string ): Promise<AddressDocument[] | null>
    {
        return Address.find( { userId: userId } );
    }
    async create ( address: Partial<Iaddress> ): Promise<AddressDocument>
    {
        return Address.create( address );
    }
    async update ( addressId: string, address: Partial<Iaddress> ): Promise<AddressDocument | null>
    {
        return Address.findOneAndUpdate( { _id: addressId }, address, { new: true } );
    }
    async delete ( addressId: string ): Promise<AddressDocument | null>
    {
        return Address.findOneAndDelete( { _id: addressId } );
    }
}

export const userAddressRepository = new UserAddressRepository()