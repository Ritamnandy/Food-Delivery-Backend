

import { type AddressDocument } from "../../models/index.js";
import { Types } from "mongoose";
import type { Iaddress } from "../models/models.interface.js";


export interface IUserAddressRepository
{
    getAddressById ( userId: string ): Promise<AddressDocument[] | null>
    create ( address: Partial<Iaddress> ): Promise<AddressDocument>
    update ( addressId: string, address: Partial<Iaddress> ): Promise<AddressDocument | null>
    delete ( addressId: string ): Promise<AddressDocument | null>
}