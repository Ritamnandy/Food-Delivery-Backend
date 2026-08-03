
import { Order_Status } from "../constants.js";
import type {  IorderRepository, OrderBody } from "../interfaces/index.js";
import { Order, type OrderDocument } from "../models/index.js";

class OrderRepository implements IorderRepository
{
    async create ( data: OrderBody ): Promise<OrderDocument>
    {
        return Order.create( data );
    }
    async delete ( id: string ): Promise<OrderDocument | null>
    {
        return Order.findByIdAndUpdate( { _id: id }, { $set: { status: Order_Status.CANCELLED } }, { new: true } );
    }
    async getAllOrders ( customerId: string ): Promise<OrderDocument[] | []>
    {
        return Order.find( { customerId, status: { $ne: Order_Status.DELIVERED } } );
    }
}

export const orderRepository = new OrderRepository()