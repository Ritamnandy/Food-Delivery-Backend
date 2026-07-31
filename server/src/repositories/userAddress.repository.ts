
import type { IUserAddressRepository, Iaddress } from "../interfaces/index.js";
import { type AddressDocument, Address } from "../models/index.js";
import type { Types } from "mongoose";

class UserAddressRepository implements IUserAddressRepository
{
    async getAddressById ( userId: Types.ObjectId ): Promise<AddressDocument | null>
    {
        return Address.findOne( { user: userId } );
    }
    async create ( address: Partial<Iaddress> ): Promise<AddressDocument>
    {
        return Address.create( address );
    }
    async update ( addressId: Types.ObjectId, address: Partial<Iaddress> ): Promise<AddressDocument | null>
    {
        return Address.findOneAndUpdate( addressId, address, { new: true } );
    }
    async delete ( addressId: Types.ObjectId ): Promise<AddressDocument | null>
    {
        return Address.findOneAndDelete( addressId );
    }
}

export const userAddressRepository = new UserAddressRepository()