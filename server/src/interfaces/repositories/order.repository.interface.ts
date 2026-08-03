import type { OrderDocument } from "../../models/index.js";
import type { Iorder } from "../models/models.interface.js";
import type { OrderBody } from "../types/oder.types.js";


interface IorderRepository
{
    create ( data: OrderBody ): Promise<OrderDocument | null>
    delete ( id: string ): Promise<OrderDocument | null>
    getAllOrders ( customerId: string ): Promise<OrderDocument[] | []>
}

export type { IorderRepository };