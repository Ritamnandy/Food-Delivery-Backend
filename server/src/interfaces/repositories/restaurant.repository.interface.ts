
import type { Types } from "mongoose"
import type { ResturantDocument } from "../../models/index.js"
import type { Irestaurant,IrestaurantAddress } from "../models/models.interface.js"

export interface IRestaurantRepository
{
    create: ( restaurant: Partial<Irestaurant> ) => Promise<ResturantDocument | null>
    update: ( id: string, restaurant: Partial<Irestaurant> ) => Promise<ResturantDocument | null>
    delete: ( id: string ) => Promise<ResturantDocument | null>
    findById: ( id: string ) => Promise<ResturantDocument | null>
    addImages: ( id: string, image: string[] ) => Promise<ResturantDocument | null>
    addAddress: ( id: string, address: Partial<IrestaurantAddress> ) => Promise<ResturantDocument | null>
    updateAddress: ( id: string, address: Partial<IrestaurantAddress> ) => Promise<ResturantDocument | null>


}