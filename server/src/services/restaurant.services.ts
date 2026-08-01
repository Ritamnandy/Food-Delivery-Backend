
import { restaurantRepository } from "../repositories/index.js";
import type { IRestaurantRepository, RestaurantBody } from "../interfaces/index.js";
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

}




export const restaurantServices = new RestaurantService( restaurantRepository )