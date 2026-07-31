
import type { Types } from "mongoose"
import type { ResturantDocument } from "../../models/index.js"
import type { Irestaurant } from "../models/models.interface.js"

export interface IRestaurantRepository
{
    create: ( restaurant: Partial<Irestaurant> ) => Promise<ResturantDocument | null>
    findByEmail: ( email: string ) => Promise<ResturantDocument | null>
    findById: ( id: Types.ObjectId ) => Promise<ResturantDocument | null>

}