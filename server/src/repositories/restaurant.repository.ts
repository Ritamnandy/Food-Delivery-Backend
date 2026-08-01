
import { Restaurant, type ResturantDocument } from "../models/index.js";
import type { IRestaurantRepository, Irestaurant, IrestaurantAddress } from "../interfaces/index.js";
import type { Types } from "mongoose";

class RestaurantRepository implements IRestaurantRepository
{
    async create ( restaurant: Partial<Irestaurant> ): Promise<ResturantDocument | null>
    {
        return await Restaurant.create( restaurant );
    }
    async update ( id: string, restaurant: Partial<Irestaurant> ): Promise<ResturantDocument | null>
    {
        return await Restaurant.findOneAndUpdate( { _id: id }, restaurant, { new: true } );
    }
    async delete ( id: string ): Promise<ResturantDocument | null>
    {
        return await Restaurant.findByIdAndDelete( id );
    }
    async findById ( id: string ): Promise<ResturantDocument | null>
    {
        return await Restaurant.findById( id );
    }
    async addImages ( id: string, image: string[] ): Promise<ResturantDocument | null>
    {
        return await Restaurant.findOneAndUpdate( { _id: id }, { $push: { images: { $each: image } } }, { new: true } );
    }

    addAddress ( id: string, address: Partial<IrestaurantAddress> ): Promise<ResturantDocument | null>
    {
        return Restaurant.findOneAndUpdate( { _id: id }, { $push: { address: address } }, { new: true } );
    }


    async updateAddress ( id: string, address: Partial<IrestaurantAddress> ): Promise<ResturantDocument | null>
    {
        return await Restaurant.findOneAndUpdate( { _id: id, "address._id": id }, { $set: { "address.$": address } }, { new: true } );
    }


}

export const restaurantRepository = new RestaurantRepository();