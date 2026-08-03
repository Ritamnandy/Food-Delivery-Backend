
import { restaurantRepository } from "../repositories/index.js";
import type { IRestaurantRepository, RestaurantBody,RestaurantAddressBody } from "../interfaces/index.js";
import { ApiError } from "../utils/ApiError.js";
import { logger } from "../utils/logger.js";
import type { ResturantDocument, UserDocument } from "../models/index.js";


class RestaurantService
{
    constructor ( private readonly restaurantRepository: IRestaurantRepository ) { }

    async createRestaurant ( user: UserDocument, body: RestaurantBody )
    {
        const restaurant: ResturantDocument | null = await this.restaurantRepository.create( { ...body, } )
        if ( !restaurant )
        {
            logger.error( "Restaurant not created", { userId: user._id } );
            throw ApiError.badRequest( "Restaurant not created", [ "Invalid restaurant data" ] );
        }
        return restaurant
    }

    async updateRestaurant ( id: string, restaurant: Partial<RestaurantBody> ): Promise<ResturantDocument | null>
    {
        const updatedRestaurant: ResturantDocument | null = await this.restaurantRepository.update( id, restaurant );
        if ( !updatedRestaurant )
        {
            logger.error( "Restaurant not updated", { id } );
            throw ApiError.badRequest( "Restaurant not updated", [ "Invalid restaurant data" ] );
        }
        return updatedRestaurant
    }

    async deleteRestaurant ( id: string )
    {
        const deletedRestaurant: ResturantDocument | null = await this.restaurantRepository.delete( id );
        if ( !deletedRestaurant )
        {
            logger.error( "Restaurant not found or invalid id", { id } );
            throw ApiError.badRequest( "Restaurant not found", [ "Invalid restaurant id" ] );
        }
    }
    async getRestaurant ( id: string ): Promise<ResturantDocument | null>
    {
        const restaurant: ResturantDocument | null = await this.restaurantRepository.findById( id );
        if ( !restaurant )
        {
            logger.error( "Restaurant not found", { id } );
            throw ApiError.badRequest( "Restaurant not found", [ "Invalid restaurant id" ] );
        }
        return restaurant
    }
    async addImages ( id: string, image: string[] ): Promise<ResturantDocument | null>
    {
        const updatedRestaurant: ResturantDocument | null = await this.restaurantRepository.addImages( id, image );
        if ( !updatedRestaurant )
        {
            logger.error( "Restaurant not updated", { id } );
            throw ApiError.badRequest( "Restaurant not updated", [ "Invalid restaurant data" ] );
        }
        return updatedRestaurant
    }
    async addAddress ( id: string, address: Partial<RestaurantAddressBody> ): Promise<ResturantDocument | null>
    {
        const updatedRestaurant: ResturantDocument | null = await this.restaurantRepository.addAddress( id, address );
        if ( !updatedRestaurant )
        {
            logger.error( "Restaurant not updated", { id } );
            throw ApiError.badRequest( "Restaurant not updated", [ "Invalid restaurant data" ] );
        }
        return updatedRestaurant
    }

    async updateAddress ( id: string, address: Partial<RestaurantAddressBody> ): Promise<ResturantDocument | null>
    {
        const updatedRestaurant: ResturantDocument | null = await this.restaurantRepository.updateAddress( id, address );
        if ( !updatedRestaurant )
        {
            logger.error( "Restaurant not updated", { id } );
            throw ApiError.badRequest( "Restaurant not updated", [ "Invalid restaurant data" ] );
        }
        return updatedRestaurant
    }

}




export const restaurantServices = new RestaurantService( restaurantRepository )