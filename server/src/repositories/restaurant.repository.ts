
import { Restaurant, type ResturantDocument } from "../models/index.js";
import type{ IRestaurantRepository,Irestaurant } from "../interfaces/index.js";
import type { Types } from "mongoose";

class RestaurantRepository implements IRestaurantRepository
{
    async create ( restaurant: Partial<Irestaurant> ): Promise<ResturantDocument |null>
    {
        return await Restaurant.create( restaurant );
    }
    async findByEmail ( email: string ): Promise<ResturantDocument | null>
    {
        return await Restaurant.findOne( { email } );
    }
    async findById ( id: Types.ObjectId ): Promise<ResturantDocument | null>
    {
        return await Restaurant.findById( id );
    }
}

export const restaurantRepository = new RestaurantRepository();