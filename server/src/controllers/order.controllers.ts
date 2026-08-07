
import { orderServices } from "../services/oder.services.js";
import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import type { AuthRequest } from "../middlewares/auth.middlewares.js";


const createOrderController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await orderServices.createOrder( { ...req.body, customerId: user._id } );
    return res.status( 201 ).json( ApiResponse.created( "Order created successfully", data ) );
} )


const deleteOrderController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await orderServices.deleteOrder( req.params.id as string );
    return res.status( 200 ).json( ApiResponse.ok( "Order deleted successfully", data ) );
} )

const getOrderDetailsControllers = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await orderServices.getOrders( user );
    return res.status( 200 ).json( ApiResponse.ok( "Orders found successfully", data ) );
} )

export
{
    createOrderController,
    deleteOrderController,
    getOrderDetailsControllers
}