
import type { UserDocument, AddressDocument } from "../models/index.js";
import { userAddressRepository } from "../repositories/index.js";
import type { IUserAddressRepository, UserAddressBody } from "../interfaces/index.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";


class UserAddressService
{
    constructor ( private readonly useraddressRepository: IUserAddressRepository ) { }
    async addAddress ( user: UserDocument, address: UserAddressBody ): Promise<AddressDocument>
    {
        const newAddress: AddressDocument | null = await this.useraddressRepository.create( {
            ...address,
            userId: user._id
        } )
        if ( !newAddress )
        {
            logger.error( "Address not created", { userId: user._id } );
            throw ApiError.badRequest( "Address not created", [ "Invalid address data" ] );
        }
        return newAddress

    }
    async updateAddress ( addressId: string, address: Partial<UserAddressBody> ): Promise<AddressDocument>
    {
        const updatedAddress: AddressDocument | null = await this.useraddressRepository.update( addressId, address );
        if ( !updatedAddress )
        {
            logger.error( "Address not updated", { addressId } );
            throw ApiError.badRequest( "Address not updated", [ "Invalid address data" ] );
        }
        return updatedAddress
    }

    async deleteAddress ( addressId: string ): Promise<AddressDocument>
    {
        const deletedAddress: AddressDocument | null = await this.useraddressRepository.delete( addressId );
        if ( !deletedAddress )
        {
            logger.error( "Address not deleted", { addressId } );
            throw ApiError.badRequest( "Address not deleted", [ "Invalid address id" ] );
        }
        return deletedAddress
    }
    async getAddresses ( userId: string ): Promise<AddressDocument[] | null>
    {
        const addresses: AddressDocument[] | null = await this.useraddressRepository.getAddressById( userId );
        if ( !addresses || addresses.length === 0 )
        {
            logger.error( "Addresses not found", { userId } );
            throw ApiError.badRequest( "Addresses not found", [ "Invalid user id" ] );
        }
        return addresses
    }
}

export const userAddressServices = new UserAddressService( userAddressRepository )