
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import { orderRepository } from "../repositories/index.js";
import type { IorderRepository, OrderBody } from "../interfaces/index.js";
import type { OrderDocument, UserDocument } from "../models/index.js";


class OrderService
{
    constructor ( private readonly orderRepository: IorderRepository ) { }

    async createOrder ( data: OrderBody ): Promise<OrderDocument>
    {
        const order: OrderDocument | null = await this.orderRepository.create( data )
        if ( !order )
        {
            logger.error( "Order not created" );
            throw ApiError.badRequest( "Order not created", [ "Invalid order data" ] );
        }
        return order
    }
    async deleteOrder ( id: string ): Promise<OrderDocument | null>
    {
        const deletedOrder: OrderDocument | null = await this.orderRepository.delete( id );
        if ( !deletedOrder )
        {
            logger.error( "Order not found or invalid id", { id } );
            throw ApiError.badRequest( "Order not found", [ "Invalid order id" ] );
        }
        return deletedOrder
    }
    async getOrders ( user: UserDocument ): Promise<OrderDocument[]>
    {
        const orders: OrderDocument[] | [] = await this.orderRepository.getAllOrders( user._id.toString() )
        if ( !orders || orders.length === 0 )
        {
            logger.error( "Orders not found", { userId: user._id } );
            throw ApiError.badRequest( "Orders not found", [ "Invalid user id" ] );
        }
        return orders
    }

}


export const orderServices = new OrderService( orderRepository )