

import { type AddressDocument } from "../../models/index.js";
import { Types } from "mongoose";
import type { Iaddress } from "../models/models.interface.js";


export interface IUserAddressRepository
{
    getAddressById ( userId: Types.ObjectId ): Promise<AddressDocument | null>
    create ( address: Partial<Iaddress> ): Promise<AddressDocument>
    update ( addressId: Types.ObjectId, address: Partial<Iaddress> ): Promise<AddressDocument | null>
    delete ( addressId: Types.ObjectId ): Promise<AddressDocument | null>
}