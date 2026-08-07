
import { userAddressServices } from '../services/userAddress.services.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import type { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { AuthRequest } from '../middlewares/auth.middlewares.js';


const createAddressController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await userAddressServices.addAddress( user, req.body );
    return res.status( 201 ).json( ApiResponse.created( "Address created successfully", data ) );
} )


const updateUserAddress = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await userAddressServices.updateAddress( req.params.id as string, req.body );
    return res.status( 200 ).json( ApiResponse.ok( "Address updated successfully", data ) );
} )


const deleteAddressController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await userAddressServices.deleteAddress( req.params.id as string );
    return res.status( 200 ).json( ApiResponse.ok( "Address deleted successfully", data ) );
} )


const getAddressController = asyncHandler( async ( req: AuthRequest, res: Response ) =>
{
    const user = req.user;
    if ( !user )
    {
        return res.status( 404 ).json( ApiError.unauthorized( "User not found", [ "unauthorized request" ] ) );
    }
    const data = await userAddressServices.getAddresses( req.params.id as string );
    return res.status( 200 ).json( ApiResponse.ok( "Address found successfully", data ) );
} )


export
{
    createAddressController,
    updateUserAddress,
    deleteAddressController,
    getAddressController
}
