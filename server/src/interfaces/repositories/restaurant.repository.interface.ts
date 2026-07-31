
import type { Types } from "mongoose"
import type { ResturantDocument } from "../../models/index.js"


export interface IRestaurantRepository
{
    create: ( restaurant: ResturantDocument ) => Promise<ResturantDocument | null>
    findByEmail: ( email: string ) => Promise<ResturantDocument | null>
    findById: ( id: Types.ObjectId ) => Promise<ResturantDocument | null>

}